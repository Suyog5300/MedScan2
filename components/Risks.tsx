
import React from 'react';
import { RiskAssessment } from '../types';
import { AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

interface RisksProps {
  risks: RiskAssessment[];
}

const Risks: React.FC<RisksProps> = ({ risks }) => {
  if (!risks || risks.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-64 bg-emerald-50 rounded-3xl border border-emerald-100 text-center p-8">
              <ShieldCheck size={48} className="text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-emerald-800">No Immediate Risks Detected</h3>
              <p className="text-emerald-600">Based on your profile and current results, you seem to be on the right track!</p>
          </div>
      );
  }

  return (
    <div className="animate-fade-in space-y-6">
        <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 relative z-10">
                <Activity className="text-indigo-300" />
                Predictive Health Analysis
            </h2>
            <p className="text-indigo-200 relative z-10 max-w-xl">
                Our AI has analyzed your profile trends and current markers to identify potential future risks. 
                Early prevention is key.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {risks.map((risk, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                    <div className={`p-6 w-full md:w-1/3 ${risk.risk_level === 'high' ? 'bg-rose-50' : risk.risk_level === 'moderate' ? 'bg-amber-50' : 'bg-blue-50'} flex flex-col justify-center`}>
                        <div className="flex items-center gap-2 mb-2">
                             {risk.risk_level === 'high' ? <AlertTriangle className="text-rose-500" /> : <Info className="text-amber-500" />}
                             <span className={`text-xs font-bold uppercase tracking-wider ${risk.risk_level === 'high' ? 'text-rose-600' : risk.risk_level === 'moderate' ? 'text-amber-600' : 'text-blue-600'}`}>
                                 {risk.risk_level} Risk
                             </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{risk.condition}</h3>
                        <div className="text-sm font-medium text-slate-600 bg-white/60 p-3 rounded-xl backdrop-blur-sm">
                            Probability: {risk.probability}
                        </div>
                    </div>
                    
                    <div className="p-6 md:p-8 w-full md:w-2/3">
                        <div className="mb-6">
                            <h4 className="font-bold text-slate-900 text-sm mb-2">Contributing Factors</h4>
                            <div className="flex flex-wrap gap-2">
                                {risk.contributing_factors.map((factor, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                                        {factor}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-emerald-700 text-sm mb-2 flex items-center gap-1">
                                    <ShieldCheck size={14} /> Immediate Action
                                </h4>
                                <ul className="space-y-1">
                                    {risk.prevention_plan.immediate.map((step, i) => (
                                        <li key={i} className="text-sm text-slate-600">• {step}</li>
                                    ))}
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-bold text-blue-700 text-sm mb-2">Long-term Lifestyle</h4>
                                <ul className="space-y-1">
                                    {risk.prevention_plan.lifestyle.map((step, i) => (
                                        <li key={i} className="text-sm text-slate-600">• {step}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

// Simple Icon fallback
const Info: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default Risks;
