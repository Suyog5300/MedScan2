
import { UserProfile, HealthHistory, MedicalAnalysis, ReportHistoryItem } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'medscan_profile',
  HISTORY: 'medscan_history',
};

export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
};

export const getHealthHistory = (): HealthHistory => {
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return data ? JSON.parse(data) : { reports: [] };
};

export const saveReportToHistory = (analysis: MedicalAnalysis): void => {
  const history = getHealthHistory();
  
  const allParams = [
    ...analysis.attention_items.map(i => ({ name: i.simple_name, value: i.your_value, status: i.status })),
    ...analysis.good_items.map(i => ({ name: i.parameter, value: i.your_value, status: 'normal' }))
  ];

  const newReport: ReportHistoryItem = {
    id: Date.now().toString(),
    date: analysis.report_date || new Date().toISOString(),
    reportType: analysis.report_type,
    parameters: allParams
  };

  history.reports.push(newReport);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};

// Seed some fake history for demo purposes if empty
export const seedDemoHistory = () => {
    if (getHealthHistory().reports.length > 0) return;
    
    const demoHistory: HealthHistory = {
        reports: [
            {
                id: 'demo_1',
                date: '2025-06-15T10:00:00Z',
                reportType: 'Blood Test',
                parameters: [
                    { name: 'Blood Sugar Level', value: '145', status: 'high' },
                    { name: 'Hemoglobin', value: '13.5', status: 'normal' },
                    { name: 'Total Cholesterol', value: '210', status: 'slightly_high' }
                ]
            },
            {
                id: 'demo_2',
                date: '2025-09-20T10:00:00Z',
                reportType: 'Blood Test',
                parameters: [
                    { name: 'Blood Sugar Level', value: '132', status: 'slightly_high' },
                    { name: 'Hemoglobin', value: '13.8', status: 'normal' },
                    { name: 'Total Cholesterol', value: '190', status: 'normal' }
                ]
            }
        ]
    };
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(demoHistory));
}
