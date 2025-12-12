
import React from 'react';
import { Medicine, MedicineAnalysis } from '../types';
import { Pill, Clock, AlertCircle, Sparkles, Coffee, Sun, Moon } from 'lucide-react';

interface MedicinesProps {
  medicines: Medicine[];
  analysis: MedicineAnalysis;
}

const Medicines: React.FC<MedicinesProps> = ({ medicines, analysis }) => {
  const hasMedicines = medicines.length > 0;
  
  // Calculate if we have any schedule data
  const hasSchedule = analysis.schedule && (
      (analysis.schedule.morning?.length || 0) > 0 ||
      (analysis.schedule.afternoon?.length || 0) > 0 ||
      (analysis.schedule.evening?.length || 0) > 0 ||
      (analysis.schedule.bedtime?.length || 0) > 0
  );

  return (
    <div className="space-y-8 animate-fade-in">
        
        {/* Identified Medicines Section - Only show if meds exist */}
        {hasMedicines && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {medicines.map((med, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                                    <Pill size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{med.name}</h3>
                                    <p className="text-xs text-slate-500 font-mono">{med.dosage}</p>
                                </div>
                            </div>
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-lg">
                                {med.timing}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="font-bold">Purpose:</span> {med.purpose}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-amber-600 font-medium">
                            <AlertCircle size={14} />
                            {med.instructions}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Optimal Schedule - Show if meds OR lifestyle actions exist */}
        {hasSchedule ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Clock size={20} className="text-primary-500" /> 
                        {hasMedicines ? 'Medication Schedule' : 'Recommended Daily Plan'}
                    </h3>
                    {!hasMedicines && (
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                            Lifestyle & Supplements
                        </span>
                    )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Morning */}
                    <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                        <h4 className="font-bold text-orange-400 uppercase text-xs tracking-wider mb-3 flex items-center gap-2">
                            <Coffee size={14} /> Morning
                        </h4>
                        {(analysis.schedule.morning?.length || 0) > 0 ? (
                            <ul className="space-y-2">
                                {analysis.schedule.morning.map((m, i) => (
                                    <li key={i} className="text-sm font-medium text-slate-800 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-300 shrink-0"></span>
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-xs text-slate-400 italic">No actions</p>}
                    </div>

                    {/* Afternoon */}
                    <div className="p-4 rounded-2xl bg-yellow-50/50 border border-yellow-100">
                        <h4 className="font-bold text-yellow-500 uppercase text-xs tracking-wider mb-3 flex items-center gap-2">
                            <Sun size={14} /> Afternoon
                        </h4>
                        {(analysis.schedule.afternoon?.length || 0) > 0 ? (
                            <ul className="space-y-2">
                                {analysis.schedule.afternoon.map((m, i) => (
                                    <li key={i} className="text-sm font-medium text-slate-800 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0"></span>
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-xs text-slate-400 italic">No actions</p>}
                    </div>

                    {/* Evening */}
                    <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                         <h4 className="font-bold text-indigo-400 uppercase text-xs tracking-wider mb-3 flex items-center gap-2">
                            <Moon size={14} /> Evening
                        </h4>
                        {(analysis.schedule.evening?.length || 0) > 0 ? (
                            <ul className="space-y-2">
                                {analysis.schedule.evening.map((m, i) => (
                                    <li key={i} className="text-sm font-medium text-slate-800 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0"></span>
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-xs text-slate-400 italic">No actions</p>}
                    </div>

                    {/* Bedtime */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                         <h4 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-3 flex items-center gap-2">
                            <Sparkles size={14} /> Bedtime
                        </h4>
                        {(analysis.schedule.bedtime?.length || 0) > 0 ? (
                            <ul className="space-y-2">
                                {analysis.schedule.bedtime.map((m, i) => (
                                    <li key={i} className="text-sm font-medium text-slate-800 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-xs text-slate-400 italic">No actions</p>}
                    </div>
                </div>
            </div>
        ) : !hasMedicines && (
            <div className="bg-slate-50 p-6 rounded-3xl text-center border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">No specific schedule actions extracted.</p>
            </div>
        )}

        {/* Supplements & Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Supplements - Always show if data exists, or if no medicines (as a recommendation box) */}
            {analysis.supplements.length > 0 ? (
                <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 h-full">
                    <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <Sparkles size={18} /> Recommended Supplements
                    </h3>
                    <div className="space-y-3">
                        {analysis.supplements.map((supp, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100/50 flex flex-col gap-1">
                                <h4 className="font-bold text-emerald-900 text-sm">{supp.name}</h4>
                                <p className="text-xs text-emerald-600 leading-relaxed">{supp.reason}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : !hasMedicines && (
                <div className="bg-white rounded-3xl p-6 border border-slate-200 flex items-center justify-center text-center h-full">
                    <div>
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Pill size={24} className="text-slate-300" />
                        </div>
                        <h4 className="font-bold text-slate-700">No Prescriptions Found</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
                            The report did not explicitly list any medicines.
                        </p>
                    </div>
                </div>
            )}

            {/* Interactions - Only show if issues found or if meds exist */}
            {analysis.interactions.length > 0 ? (
                <div className="bg-rose-50 rounded-3xl p-6 border border-rose-100 h-full">
                    <h3 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
                        <AlertCircle size={18} /> Interactions Check
                    </h3>
                    <div className="space-y-3">
                         {analysis.interactions.map((inter, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-rose-100/50">
                                <div className="flex justify-between mb-2">
                                     <span className="font-bold text-rose-900 text-sm">Interaction</span>
                                     <span className="text-[10px] font-bold uppercase bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full h-fit">{inter.severity}</span>
                                </div>
                                <p className="text-xs text-rose-700 leading-relaxed">{inter.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : hasMedicines && (
                 <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex items-center justify-center text-center h-full">
                    <div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <AlertCircle size={24} className="text-blue-500" />
                        </div>
                        <h4 className="font-bold text-blue-800">No Interactions</h4>
                        <p className="text-xs text-blue-600 mt-1">
                            Your identified medicines appear safe to take together.
                        </p>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Medicines;
