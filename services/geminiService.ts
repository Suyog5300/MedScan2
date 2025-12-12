import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MedicalAnalysis, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// PART 1: CORE DATA (Fast Extraction)
const PROMPT_CORE = `
You are MedScan. Extract data from this medical report image/PDF.

CONTEXT:
User Profile: {USER_PROFILE_JSON}

TASK:
1. Identify Report Type & Date.
2. Determine Overall Status.
3. Extract "Attention Items" (Abnormal/High/Low). Keep 'explanation' and 'analogy' extremely concise (max 15 words).
4. Extract "Good Items" (Normal). Keep 'simple_explanation' concise (max 10 words).
5. Generate a 1-line summary and an emoji.

IMPORTANT: Output purely valid JSON. Be extremely concise to save processing time.
`;

// PART 2: DEEP INSIGHTS (Reasoning & Creativity)
const PROMPT_INSIGHTS = `
You are MedScan. Analyze this medical report for deep insights.

CONTEXT:
User Profile: {USER_PROFILE_JSON}
Language: {USER_LANGUAGE}

TASK:
1. **Risks**: Identify up to 3 key health risks. Be concise.
2. **Medicines & Management**: 
   - Extract prescription medicines if any.
   - Create a simple schedule (Actionable steps).
   - **CRITICAL**: \`schedule\` must NOT be empty.
3. **Body Map**: Map findings to relevant organs. Only include organs with specific findings.
4. **Voice Script**: Natural summary in {USER_LANGUAGE}. Keep it under 30 seconds (concise).
5. **Questions & Tips**: 3 key questions and 3 tips.

IMPORTANT: Output purely valid JSON. Be extremely concise to save processing time.
`;

export const analyzeReport = async (base64Data: string, mimeType: string, userProfile: UserProfile): Promise<MedicalAnalysis> => {
  try {
    const profileStr = JSON.stringify(userProfile);
    const language = userProfile.language || 'English';

    // Configuration for Part 1 (Core)
    const prompt1 = PROMPT_CORE.replace('{USER_PROFILE_JSON}', profileStr);
    const schema1: Schema = {
      type: Type.OBJECT,
      properties: {
        report_type: { type: Type.STRING },
        report_date: { type: Type.STRING },
        overall_status: { type: Type.STRING, enum: ["good", "attention_needed", "consult_doctor"] },
        summary_emoji: { type: Type.STRING },
        one_line_summary: { type: Type.STRING },
        attention_items: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              parameter: { type: Type.STRING },
              your_value: { type: Type.STRING },
              normal_range: { type: Type.STRING },
              status: { type: Type.STRING, enum: ["slightly_high", "high", "slightly_low", "low", "abnormal", "critical"] },
              simple_name: { type: Type.STRING },
              analogy: { type: Type.STRING },
              explanation: { type: Type.STRING },
              why_it_matters: { type: Type.STRING },
              possible_causes: { type: Type.ARRAY, items: { type: Type.STRING } },
              what_to_do: { type: Type.ARRAY, items: { type: Type.STRING } },
              urgency: { type: Type.STRING, enum: ["monitor", "soon", "urgent"] },
            },
          },
        },
        good_items: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              parameter: { type: Type.STRING },
              your_value: { type: Type.STRING },
              normal_range: { type: Type.STRING },
              simple_explanation: { type: Type.STRING },
              analogy: { type: Type.STRING },
            },
          },
        },
      },
    };

    // Configuration for Part 2 (Insights)
    const prompt2 = PROMPT_INSIGHTS
        .replace('{USER_PROFILE_JSON}', profileStr)
        .replace('{USER_LANGUAGE}', language);
    
    const schema2: Schema = {
      type: Type.OBJECT,
      properties: {
        spoken_summary_script: { type: Type.STRING },
        risks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              condition: { type: Type.STRING },
              risk_level: { type: Type.STRING, enum: ["low", "moderate", "high"] },
              probability: { type: Type.STRING },
              contributing_factors: { type: Type.ARRAY, items: { type: Type.STRING } },
              prevention_plan: {
                type: Type.OBJECT,
                properties: {
                  immediate: { type: Type.ARRAY, items: { type: Type.STRING } },
                  lifestyle: { type: Type.ARRAY, items: { type: Type.STRING } },
                }
              }
            }
          }
        },
        organ_map: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              organ: { type: Type.STRING, enum: ["brain", "heart", "lungs", "liver", "kidneys", "pancreas", "thyroid", "stomach", "intestine"] },
              status: { type: Type.STRING, enum: ["good", "monitor", "attention", "critical"] },
              explanation: { type: Type.STRING },
              findings: { type: Type.ARRAY, items: { type: Type.STRING } },
              dietary_advice: {
                type: Type.OBJECT,
                properties: {
                  eat: { type: Type.ARRAY, items: { type: Type.STRING } },
                  avoid: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        },
        medicines_found: {
          type: Type.ARRAY,
          items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                dosage: { type: Type.STRING },
                timing: { type: Type.STRING },
                purpose: { type: Type.STRING },
                instructions: { type: Type.STRING }
              }
          }
        },
        medicine_analysis: {
          type: Type.OBJECT,
          properties: {
            interactions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ["mild", "moderate", "severe"] }
                }
              }
            },
            schedule: {
              type: Type.OBJECT,
              properties: {
                morning: { type: Type.ARRAY, items: { type: Type.STRING } },
                afternoon: { type: Type.ARRAY, items: { type: Type.STRING } },
                evening: { type: Type.ARRAY, items: { type: Type.STRING } },
                bedtime: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            supplements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              }
            }
          }
        },
        doctor_questions: { type: Type.ARRAY, items: { type: Type.STRING } },
        health_tips: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              icon: { type: Type.STRING },
              title: { type: Type.STRING },
              tip: { type: Type.STRING },
            },
          },
        },
        next_steps: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    };

    // Execute requests in PARALLEL to reduce latency
    const [result1, result2] = await Promise.all([
        ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ inlineData: { mimeType, data: base64Data } }, { text: prompt1 }] },
            config: { responseMimeType: "application/json", responseSchema: schema1 }
        }),
        ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ inlineData: { mimeType, data: base64Data } }, { text: prompt2 }] },
            config: { responseMimeType: "application/json", responseSchema: schema2 }
        })
    ]);

    const json1 = JSON.parse(result1.text || "{}");
    const json2 = JSON.parse(result2.text || "{}");

    // Merge results
    return { ...json1, ...json2 } as MedicalAnalysis;

  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

export const getChatResponse = async (history: {role: string, parts: {text: string}[]}[], userMessage: string, context: MedicalAnalysis) => {
    const contextString = JSON.stringify(context);
    const systemInstruction = `
      You are MedScan, a professional medical AI assistant.
      The user is asking questions about a specific medical report you analyzed.
      
      REPORT CONTEXT:
      ${contextString}

      Tone: Professional, empathetic, clear, and concise. 
      Avoid emojis unless appropriate for structure.
      Do not give definitive medical diagnoses. Always suggest consulting a professional for specific advice.
    `;

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
}