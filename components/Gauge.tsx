
import React from 'react';

interface GaugeProps {
  status: 'slightly_high' | 'high' | 'slightly_low' | 'low' | 'abnormal' | 'critical';
  value: string;
  range: string;
}

const Gauge: React.FC<GaugeProps> = ({ status, value, range }) => {
  // Determine position percentage roughly based on status for visualization
  let position = 50; 
  let markerColor = 'bg-teal-500 border-teal-200';
  
  // Logic: 0-33 (Low), 33-66 (Normal), 66-100 (High)
  switch (status) {
    case 'low':
      position = 15;
      markerColor = 'bg-rose-500 border-rose-200';
      break;
    case 'slightly_low':
      position = 28;
      markerColor = 'bg-amber-400 border-amber-200';
      break;
    case 'slightly_high':
      position = 72;
      markerColor = 'bg-amber-400 border-amber-200';
      break;
    case 'high':
    case 'abnormal':
      position = 85;
      markerColor = 'bg-rose-500 border-rose-200';
      break;
    case 'critical':
      position = 95;
      markerColor = 'bg-rose-600 border-rose-300';
      break;
    default:
      position = 50;
  }

  return (
    <div className="w-full mt-12 mb-4 relative">
      
      {/* Current Value Tooltip - Positioned HIGHER ABOVE the bar */}
      <div 
          className="absolute -top-10 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 z-20"
          style={{ left: `${position}%` }}
      >
          <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap mb-1 flex flex-col items-center">
              <span className="text-[10px] text-slate-300 font-normal uppercase tracking-wider">Your Value</span>
              <span>{value}</span>
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-800"></div>
      </div>

      {/* Bar Container */}
      <div className="relative h-4 w-full rounded-full flex overflow-hidden shadow-inner bg-slate-100">
        {/* Low Segment */}
        <div className="flex-1 bg-slate-200/50 border-r border-white"></div>
        {/* Normal Segment (Green Zone) */}
        <div className="flex-[2] bg-emerald-100 border-r border-white relative group">
           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest">Normal Range</span>
           </div>
        </div>
        {/* High Segment */}
        <div className="flex-1 bg-slate-200/50"></div>

        {/* Marker Line */}
        <div 
            className={`absolute top-0 bottom-0 w-1.5 ${markerColor} shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-out z-10 rounded-full scale-y-110`}
            style={{ left: `${position}%` }}
        ></div>
      </div>

      {/* Bottom Labels */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            <span>Low</span>
            <span className="mx-1">•</span>
            <span>Normal</span>
            <span className="mx-1">•</span>
            <span>High</span>
        </div>
        <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
            Standard Range: <span className="font-semibold text-slate-700">{range}</span>
        </div>
      </div>
      
    </div>
  );
};

export default Gauge;
