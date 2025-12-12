
import React, { useState } from 'react';
import { MedicalAnalysis } from '../types';
import Gauge from './Gauge';
import { CheckCircle2, Info, ChevronDown, HeartPulse, BrainCircuit, ArrowRight, ChevronUp } from 'lucide-react';
import VoicePlayer from './VoicePlayer';

interface ResultsProps {
  data: MedicalAnalysis;
}

const Results: React.FC<ResultsProps> = ({ data }) => {
  const [expandGood, setExpandGood] = useState(false);

  const getStatusColor = (urgency: string) => {
    switch (urgency) {
        case 'urgent': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', icon: 'text-rose-500', badge: 'bg-rose-100 text-rose-800' };
        case 'soon': return { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', icon: 'text-amber-500', badge: 'bg-amber-100 text-amber-800' };
        default: return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', icon: 'text-blue-500', badge: 'bg-blue-100 text-blue-800' };
    }
  };

  return (
    <div className="animate-fade-in font-sans">
      
      {/* 1. Header & Summary Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full ${data.overall_status === 'good' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
        <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0 ${data.overall_status === 'good' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                {data.summary_emoji}
            </div>
            <div className="flex-1 w-full">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{data.one_line_summary}</h2>
                <div className="flex flex-col xl:flex-row xl:items-end gap-4 justify-between">
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-2xl">
                        {data.spoken_summary_script.slice(0, 150)}...
                    </p>
                    <VoicePlayer script={data.spoken_summary_script} />
                </div>
            </div>
        </div>
      </div>

      {/* 2. Detailed Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
            
            {/* Attention Items Section */}
            {data.attention_items.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        Items Requiring Attention
                    </h3>

                    {data.attention_items.map((item, idx) => {
                        const style = getStatusColor(item.urgency);
                        return (
                            <div key={idx} className={`bg-white rounded-3xl border-2 ${style.border} overflow-hidden shadow-sm transition-all hover:shadow-md`}>
                                {/* Card Header */}
                                <div className={`px-6 py-5 ${style.bg} border-b ${style.border} flex flex-col sm:flex-row justify-between items-start gap-4`}>
                                    <div className="flex-1 min-w-0 pr-2">
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                                            <h4 className="text-xl font-bold text-slate-900 leading-tight">{item.simple_name}</h4>
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${style.badge} flex-shrink-0`}>
                                                {item.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 font-mono text-xs opacity-80 break-words">{item.parameter}</p>
                                    </div>
                                    <div className="text-right shrink-0 bg-white/60 px-4 py-2 rounded-xl border border-white/60 w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end">
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide sm:mb-1">Your Value</div>
                                        <div className="text-xl font-bold text-slate-900 leading-tight">{item.your_value}</div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8">
                                    {/* Gauge Visualization */}
                                    <div className="mb-12 px-2 mt-2">
                                        <Gauge status={item.status} value={item.your_value} range={item.normal_range} />
                                    </div>

                                    {/* The Simple Version Box */}
                                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 relative border border-slate-100">
                                        <div className="absolute -top-3 left-6 bg-white px-3 py-0.5 rounded-full border border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                                            <BrainCircuit size={14} className="text-primary-500" />
                                            The Simple Version
                                        </div>
                                        <p className="text-lg font-medium text-slate-700 italic mb-4 mt-2">"{item.analogy}"</p>
                                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-4">
                                            <span className="font-bold text-slate-900 shrink-0">What it means:</span> 
                                            <span>{item.explanation}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h5 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                                                <Info size={16} className="text-slate-400" />
                                                Why might this be happening?
                                            </h5>
                                            <ul className="space-y-2">
                                                {item.possible_causes.map((cause, i) => (
                                                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0"></span>
                                                        {cause}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={`p-5 rounded-2xl ${style.bg} bg-opacity-50 border border-white/50`}>
                                            <h5 className={`font-bold ${style.text} text-sm mb-3 flex items-center gap-2`}>
                                                <HeartPulse size={16} />
                                                What you can do
                                            </h5>
                                            <ul className="space-y-2">
                                                {item.what_to_do.map((action, i) => (
                                                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                                        <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${style.icon}`} />
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Normal Items Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <button 
                    onClick={() => setExpandGood(!expandGood)}
                    className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-slate-900 text-lg">Normal Results</h3>
                            <p className="text-sm text-slate-500">{data.good_items.length} measurements look healthy</p>
                        </div>
                    </div>
                    {expandGood ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                </button>
                
                {expandGood && (
                    <div className="divide-y divide-slate-100">
                        {data.good_items.map((item, idx) => (
                            <div key={idx} className="p-6 transition-colors hover:bg-slate-50">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-base">{item.parameter}</h4>
                                        <p className="text-sm text-slate-500">{item.simple_explanation}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <span className="block font-bold text-slate-900">{item.your_value}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Value</span>
                                        </div>
                                        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>
                                        <div className="text-right hidden sm:block">
                                            <span className="block font-medium text-slate-500 text-sm">{item.normal_range}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Range</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 inline-block bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-lg font-medium">
                                    💡 {item.analogy}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
                    <HeartPulse className="text-rose-400" />
                    Personalized Tips
                </h3>
                <div className="space-y-6 relative z-10">
                    {data.health_tips.map((tip, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0 backdrop-blur-sm border border-white/10">
                                {tip.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-indigo-100 text-sm uppercase tracking-wider mb-1">{tip.title}</h4>
                                <p className="text-slate-300 text-sm leading-relaxed font-medium">{tip.tip}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Questions for your Doctor</h3>
                <div className="space-y-3">
                    {data.doctor_questions.map((q, i) => (
                        <button key={i} className="w-full text-left p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group">
                            <div className="flex items-start justify-between gap-3">
                                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{q}</span>
                                <ArrowRight size={16} className="text-slate-300 group-hover:text-primary-500 transition-colors mt-0.5 shrink-0" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
