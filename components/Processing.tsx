import React, { useEffect, useState } from 'react';

const Processing: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Slower, more realistic progress simulation
    // Reaches ~90% in about 15-20 seconds
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 95) {
          // Slow down significantly at the end
          return Math.min(oldProgress + 0.2, 99);
        }
        
        // Random increment between 0 and 3
        const diff = Math.random() * 3; 
        return Math.min(oldProgress + diff, 95); 
      });
    }, 400); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 max-w-lg mx-auto text-center animate-fade-in">
      
      <div className="relative w-24 h-24 mb-8">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
        {/* Spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-700 font-mono">
            {Math.round(progress)}%
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Analyzing Report</h2>
      <p className="text-slate-500 mb-10 text-lg">Our AI is reading your values and generating insights...</p>

      {/* Steps visualization */}
      <div className="w-full space-y-4">
        <div className={`flex items-center gap-4 transition-all duration-500 ${progress > 5 ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${progress > 5 ? 'bg-teal-500' : 'bg-slate-200'}`}>1</div>
            <span className="text-slate-700 font-medium">Scanning document</span>
        </div>
        <div className={`flex items-center gap-4 transition-all duration-500 ${progress > 30 ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${progress > 30 ? 'bg-teal-500' : 'bg-slate-200'}`}>2</div>
            <span className="text-slate-700 font-medium">Parallel processing (Vitals & Insights)</span>
        </div>
        <div className={`flex items-center gap-4 transition-all duration-500 ${progress > 85 ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${progress > 85 ? 'bg-teal-500' : 'bg-slate-200'}`}>3</div>
            <span className="text-slate-700 font-medium">Finalizing analysis</span>
        </div>
      </div>

    </div>
  );
};

export default Processing;