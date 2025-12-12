
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { getHealthHistory, seedDemoHistory } from '../services/storageService';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const Trends: React.FC = () => {
  // Ensure we have some data to show for the demo
  seedDemoHistory();
  const history = getHealthHistory();

  // Extract unique parameter names that appear in history
  const paramNames = Array.from(new Set(history.reports.flatMap(r => r.parameters.map(p => p.name))));

  // Pick the top 2 most frequent/important parameters to visualize
  const topParams = paramNames.slice(0, 2);

  const getChartData = (paramName: string) => {
    return history.reports
      .map(report => {
        const param = report.parameters.find(p => p.name === paramName);
        return param ? {
            date: new Date(report.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            value: parseFloat(param.value),
            status: param.status
        } : null;
      })
      .filter(item => item !== null)
      .sort((a, b) => new Date(a!.date).getTime() - new Date(b!.date).getTime());
  };

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="flex justify-between items-end mb-4">
          <div>
              <h2 className="text-2xl font-bold text-slate-900">Health Trends</h2>
              <p className="text-slate-500">Track your vitals over time.</p>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
             {history.reports.length} Reports Analyzed
          </div>
       </div>

       {history.reports.length < 2 ? (
           <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300">
               <p className="text-slate-500 mb-2">Not enough history yet.</p>
               <p className="text-sm text-slate-400">Upload more reports to see trends appear here.</p>
           </div>
       ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topParams.map((param, idx) => {
                  const data = getChartData(param);
                  if (data.length < 2) return null;
                  
                  const latest = data[data.length - 1];
                  const previous = data[data.length - 2];
                  const trend = latest!.value - previous!.value;

                  return (
                      <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                          <div className="flex justify-between items-start mb-6">
                              <div>
                                  <h3 className="font-bold text-slate-900">{param}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                      <span className="text-2xl font-bold text-slate-800">{latest!.value}</span>
                                      {trend > 0 ? (
                                          <span className="flex items-center text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-full">
                                              <ArrowUpRight size={12} /> +{trend.toFixed(1)}
                                          </span>
                                      ) : trend < 0 ? (
                                          <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                                              <ArrowDownRight size={12} /> {trend.toFixed(1)}
                                          </span>
                                      ) : (
                                          <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                                              <Minus size={12} /> Stable
                                          </span>
                                      )}
                                  </div>
                              </div>
                          </div>

                          <div className="h-48 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={data}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} dy={10} />
                                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                                      <Tooltip 
                                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                        itemStyle={{color: '#0F172A', fontWeight: 'bold'}}
                                      />
                                      <Line 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#0EA5E9" 
                                        strokeWidth={3} 
                                        dot={{fill: '#0EA5E9', strokeWidth: 2, r: 4, stroke: '#fff'}} 
                                        activeDot={{r: 6}}
                                      />
                                  </LineChart>
                              </ResponsiveContainer>
                          </div>
                      </div>
                  );
              })}
           </div>
       )}
    </div>
  );
};

export default Trends;
