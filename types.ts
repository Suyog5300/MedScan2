
export interface AttentionItem {
  parameter: string;
  your_value: string;
  normal_range: string;
  status: 'slightly_high' | 'high' | 'slightly_low' | 'low' | 'abnormal' | 'critical';
  simple_name: string;
  analogy: string;
  explanation: string;
  why_it_matters: string;
  possible_causes: string[];
  what_to_do: string[];
  urgency: 'monitor' | 'soon' | 'urgent';
}

export interface GoodItem {
  parameter: string;
  your_value: string;
  normal_range: string;
  simple_explanation: string;
  analogy: string;
}

export interface HealthTip {
  icon: string;
  title: string;
  tip: string;
}

export interface RiskAssessment {
  condition: string;
  risk_level: 'low' | 'moderate' | 'high';
  probability: string;
  contributing_factors: string[];
  prevention_plan: {
    immediate: string[];
    lifestyle: string[];
  };
}

export interface Medicine {
  name: string;
  dosage: string;
  timing: string;
  purpose: string;
  instructions: string;
}

export interface MedicineAnalysis {
  interactions: {
    description: string;
    severity: 'mild' | 'moderate' | 'severe';
  }[];
  schedule: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    bedtime: string[];
  };
  supplements: {
    name: string;
    reason: string;
  }[];
}

export interface OrganStatus {
  organ: 'brain' | 'heart' | 'lungs' | 'liver' | 'kidneys' | 'pancreas' | 'thyroid' | 'stomach' | 'intestine';
  status: 'good' | 'monitor' | 'attention' | 'critical';
  explanation: string;
  findings: string[];
  dietary_advice?: {
    eat: string[];
    avoid: string[];
  };
}

export interface MedicalAnalysis {
  report_type: string;
  report_date?: string;
  overall_status: 'good' | 'attention_needed' | 'consult_doctor';
  summary_emoji: string;
  one_line_summary: string;
  spoken_summary_script: string;
  attention_items: AttentionItem[];
  good_items: GoodItem[];
  doctor_questions: string[];
  health_tips: HealthTip[];
  risks: RiskAssessment[];
  medicines_found: Medicine[];
  medicine_analysis: MedicineAnalysis;
  organ_map: OrganStatus[];
  next_steps: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  conditions: string[];
  familyHistory: string[];
  language: string;
}

export interface ReportHistoryItem {
  id: string;
  date: string;
  reportType: string;
  parameters: { name: string; value: string; status: string }[];
}

export interface HealthHistory {
  reports: ReportHistoryItem[];
}