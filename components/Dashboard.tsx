
import React, { useState } from 'react';
import { MedicalAnalysis } from '../types';
import Results from './Results';
import Trends from './Trends';
import BodyMap from './BodyMap';
import Medicines from './Medicines';
import Risks from './Risks';
import { LayoutDashboard, Activity, User, Pill, AlertTriangle, MessageSquare, ChevronRight } from 'lucide-react';

interface DashboardProps {
  data: MedicalAnalysis;
  onReset: () => void;
  openChat: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onReset, openChat }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'body' | 'risks' | 'meds'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'trends', label: 'Trends', icon: Activity },
    { id: 'body', label: 'Body Map', icon: User },
    { id: 'risks', label: 'Risks', icon: AlertTriangle },
    { id: 'meds', label: 'Medicines', icon: Pill },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 animate-fade-in">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
                        activeTab === tab.id 
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                        : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-slate-200'
                    }`}
                >
                    <tab.icon size={18} />
                    {tab.label}
                </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
                 <button 
                    onClick={openChat}
                    className="flex items-center gap-2 bg-primary-50 text-primary-700 hover:bg-primary-100 px-5 py-3 rounded-full font-bold transition-colors"
                >
                    <MessageSquare size={18} />
                    Ask AI
                </button>
                <button onClick={onReset} className="text-slate-400 hover:text-slate-600 font-bold text-sm px-4">
                    New Scan
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[60vh]">
            {activeTab === 'overview' && <Results data={data} />}
            {activeTab === 'trends' && <Trends />}
            {activeTab === 'body' && <BodyMap organData={data.organ_map} />}
            {activeTab === 'risks' && <Risks risks={data.risks} />}
            {activeTab === 'meds' && <Medicines medicines={data.medicines_found} analysis={data.medicine_analysis} />}
        </div>
    </div>
  );
};

export default Dashboard;
