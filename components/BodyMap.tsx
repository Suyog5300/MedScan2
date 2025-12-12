
import React, { useState, useEffect } from 'react';
import { OrganStatus } from '../types';
import { Info, Activity, Zap, Search, Apple, Ban, ChevronRight } from 'lucide-react';

interface BodyMapProps {
  organData: OrganStatus[];
}

const BodyMap: React.FC<BodyMapProps> = ({ organData }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedOrgan, setSelectedOrgan] = useState<OrganStatus | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Region mapping: Visual Part -> Logical Organs
  const regionMap: Record<string, string[]> = {
    head: ['brain', 'thyroid', 'eyes'],
    chest: ['heart', 'lungs'],
    stomach: ['stomach', 'liver', 'pancreas', 'kidneys', 'intestine', 'intestines'],
    arm: ['muscles', 'bones'],
    legs: ['muscles', 'bones'],
    hands: ['joints'],
    shoulder: ['joints', 'muscles']
  };

  // Check if any organ in a region has an issue
  const getRegionStatus = (region: string) => {
    const relevantOrgans = regionMap[region] || [];
    const statuses = organData
        .filter(o => relevantOrgans.includes(o.organ.toLowerCase()))
        .map(o => o.status);
    
    if (statuses.includes('critical')) return 'critical';
    if (statuses.includes('attention')) return 'attention';
    if (statuses.includes('monitor')) return 'monitor';
    if (statuses.length > 0) return 'good';
    return 'neutral';
  };

  const getFillColor = (region: string, isHovered: boolean, isSelected: boolean) => {
    const status = getRegionStatus(region);
    
    // Base colors based on status
    let baseColor = '#57c9d5'; // Default Teal
    if (status === 'critical') baseColor = '#EF4444';
    if (status === 'attention') baseColor = '#F97316';
    if (status === 'monitor') baseColor = '#F59E0B';
    if (status === 'good') baseColor = '#10B981';

    // Interaction states
    if (isSelected) return '#0F172A'; // Dark Slate for selected
    if (isHovered) return '#ff7d16'; // Orange hover as requested
    
    return baseColor;
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    // Auto-select the first relevant organ in that region if data exists
    const relevantOrgans = regionMap[region] || [];
    const firstOrganData = organData.find(o => relevantOrgans.includes(o.organ.toLowerCase()));
    setSelectedOrgan(firstOrganData || null);
  };

  const organIcons: Record<string, string> = {
    brain: '🧠', heart: '❤️', lungs: '🫁', liver: '🫘', kidneys: '💜',
    stomach: '🟤', thyroid: '🦋', pancreas: '🟡', intestine: '🟠', intestines: '🟠',
  };

  // Helper to render the dietary lists safely
  const renderList = (items?: string[]) => {
    if (!items || items.length === 0) return <span className="text-slate-400 italic text-xs">None specified</span>;
    return (
        <ul className="space-y-1 mt-1">
            {items.map((item, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                    {item}
                </li>
            ))}
        </ul>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch animate-fade-in">
      
      {/* === LEFT: ANATOMY VISUAL === */}
      <div className="flex-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="absolute top-6 left-6 z-10">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity size={16} className="text-primary-500" />
                Anatomical Map
            </h3>
            <p className="text-xs text-slate-500 mt-1">Select body regions to explore</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-slate-100 text-xs font-medium z-10">
           {['Good', 'Monitor', 'Attention', 'Critical'].map((status) => {
               const colors: Record<string, string> = { 'Good': 'bg-emerald-500', 'Monitor': 'bg-amber-500', 'Attention': 'bg-orange-500', 'Critical': 'bg-red-500' };
               return (
                   <div key={status} className="flex items-center gap-2">
                       <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${colors[status]}`}></span>
                       <span className="text-slate-600">{status}</span>
                   </div>
               )
           })}
        </div>

        {/* --- CUSTOM SVG ANATOMY --- */}
        <div className="relative w-[300px] h-[580px]">
            {/* HEAD */}
            <svg 
                className="absolute transition-all duration-300 cursor-pointer drop-shadow-md hover:drop-shadow-xl z-20"
                style={{ top: '0px', left: '50%', marginLeft: '-28.5px' }}
                width="56.594" height="95.031" viewBox="0 0 56.594 95.031"
                onClick={() => handleRegionClick('head')}
                onMouseEnter={() => setHoveredRegion('head')}
                onMouseLeave={() => setHoveredRegion(null)}
            >
                <path d="M15.92 68.5l8.8 12.546 3.97 13.984-9.254-7.38-4.622-15.848zm27.1 0l-8.8 12.546-3.976 13.988 9.254-7.38 4.622-15.848zm6.11-27.775l.108-11.775-21.16-14.742L8.123 26.133 8.09 40.19l-3.24.215 1.462 9.732 5.208 1.81 2.36 11.63 9.72 11.018 10.856-.324 9.56-10.37 1.918-11.952 5.207-1.81 1.342-9.517zm-43.085-1.84l-.257-13.82L28.226 11.9l23.618 15.755-.216 10.37 4.976-17.085L42.556 2.376 25.49 0 10.803 3.673.002 24.415z" 
                    fill={getFillColor('head', hoveredRegion === 'head', selectedRegion === 'head')} 
                />
            </svg>

            {/* SHOULDER */}
            <svg 
                className="absolute transition-all duration-300 cursor-pointer drop-shadow-md hover:drop-shadow-xl z-10"
                style={{ top: '69px', left: '50%', marginLeft: '-53.5px' }}
                width="109.532" height="46.594" viewBox="0 0 109.532 46.594"
                onClick={() => handleRegionClick('shoulder')}
                onMouseEnter={() => setHoveredRegion('shoulder')}
                onMouseLeave={() => setHoveredRegion(null)}
            >
                <path d="M38.244-.004l1.98 9.232-11.653 2.857-7.474-2.637zm33.032 0l-1.98 9.232 11.653 2.857 7.474-2.637zm21.238 10.54l4.044-2.187 12.656 14 .07 5.33S92.76 10.66 92.515 10.535zm-1.285.58c-.008.28 17.762 18.922 17.762 18.922l.537 16.557-6.157-10.55L91.5 30.988 83.148 15.6zm-74.224-.58L12.962 8.35l-12.656 14-.062 5.325s16.52-17.015 16.764-17.14zm1.285.58C18.3 11.396.528 30.038.528 30.038L-.01 46.595l6.157-10.55 11.87-5.056L26.374 15.6z"
                     fill={getFillColor('shoulder', hoveredRegion === 'shoulder', selectedRegion === 'shoulder')}
                />
            </svg>

            {/* ARM */}
            <svg 
                className="absolute transition-all duration-300 cursor-pointer drop-shadow-md hover:drop-shadow-xl"
                style={{ top: '112px', left: '50%', marginLeft: '-78px' }}
                width="156.344" height="119.25" viewBox="0 0 156.344 119.25"
                onClick={() => handleRegionClick('arm')}
                onMouseEnter={() => setHoveredRegion('arm')}
                onMouseLeave={() => setHoveredRegion(null)}
            >
                <path d="M21.12 56.5a1.678 1.678 0 0 1-.427.33l.935 8.224 12.977-13.89 1.2-8.958A168.2 168.2 0 0 0 21.12 56.5zm1.387 12.522l-18.07 48.91 5.757 1.333 19.125-39.44 3.518-22.047zm-5.278-18.96l2.638 18.74-17.2 46.023L.01 113.05l6.644-35.518zm118.015 6.44a1.678 1.678 0 0 0 .426.33l-.934 8.222-12.977-13.89-1.2-8.958A168.2 168.2 0 0 1 135.24 56.5zm-1.39 12.52l18.073 48.91-5.758 1.333-19.132-39.44-3.52-22.05zm5.28-18.96l-2.64 18.74 17.2 46.023 2.658-1.775-6.643-35.518zm-103.1-12.323a1.78 1.78 0 0 1 .407-.24l3.666-27.345L33.07.015l-7.258 10.58-6.16 37.04.566 4.973a151.447 151.447 0 0 1 15.808-14.87zm84.3 0a1.824 1.824 0 0 0-.407-.24l-3.666-27.345L123.3.015l7.258 10.58 6.16 37.04-.566 4.973a151.447 151.447 0 0 0-15.822-14.87zM22.288 8.832l-3.3 35.276-2.2-26.238zm111.79 0l3.3 35.276 2.2-26.238z"
                    fill={getFillColor('arm', hoveredRegion === 'arm', selectedRegion === 'arm')}
                />
            </svg>

            {/* CHEST */}
            <svg 
                className="absolute transition-all duration-300 cursor-pointer drop-shadow-md hover:drop-shadow-xl z-20"
                style={{ top: '88px', left: '50%', marginLeft: '-43.5px' }}
                width="86.594" height="45.063" viewBox="0 0 86.594 45.063"
                onClick={() => handleRegionClick('chest')}
                onMouseEnter={() => setHoveredRegion('chest')}
                onMouseLeave={() => setHoveredRegion(null)}
            >
                <path d="M19.32 0l-9.225 16.488-10.1 5.056 6.15 4.836 4.832 14.07 11.2 4.616 17.85-8.828-4.452-34.7zm47.934 0l9.225 16.488 10.1 5.056-6.15 4.836-4.833 14.07-11.2 4.616-17.844-8.828 4.45-34.7z"
                    fill={getFillColor('chest', hoveredRegion === 'chest', selectedRegion === 'chest')}
                />
            </svg>

            {/* STOMACH */}
            <svg 
                className="absolute transition-all duration-300 cursor-pointer drop-shadow-md hover:drop-shadow-xl z-20"
                style={{ top: '130px', left: '50%', marginLeft: '-37.5px' }}
                width="75.25" height="107.594" viewBox="0 0 75.25 107.594"
                onClick={() => handleRegionClick('stomach')}
                onMouseEnter={() => setHoveredRegion('stomach')}
                onMouseLeave={() => setHoveredRegion(null)}
            >
                <path d="M19.25 7.49l16.6-7.5-.5 12.16-14.943 7.662zm-10.322 8.9l6.9 3.848-.8-9.116zm5.617-8.732L1.32 2.15 6.3 15.6zm-8.17 9.267l9.015 5.514 1.54 11.028-8.795-5.735zm15.53 5.89l.332 8.662 12.286-2.665.664-11.826zm14.61 84.783L33.28 76.062l-.08-20.53-11.654-5.736-1.32 37.5zM22.735 35.64L22.57 46.3l11.787 3.166.166-16.657zm-14.16-5.255L16.49 35.9l1.1 11.25-8.8-7.06zm8.79 22.74l-9.673-7.28-.84 9.78L-.006 68.29l10.564 14.594 5.5.883 1.98-20.735zM56 7.488l-16.6-7.5.5 12.16 14.942 7.66zm10.32 8.9l-6.9 3.847.8-9.116zm-5.617-8.733L73.93 2.148l-4.98 13.447zm8.17 9.267l-9.015 5.514-1.54 11.03 8.8-5.736zm-15.53 5.89l-.332 8.662-12.285-2.665-.664-11.827zm-14.61 84.783l3.234-31.536.082-20.532 11.65-5.735 1.32 37.5zm13.78-71.957l.166 10.66-11.786 3.168-.166-16.657zm14.16-5.256l-7.915 5.514-1.1 11.25 8.794-7.06zm-8.79 22.743l9.673-7.28.84 9.78 6.862 12.66-10.564 14.597-5.5.883-1.975-20.74z"
                     fill={getFillColor('stomach', hoveredRegion === 'stomach', selectedRegion === 'stomach')}
                />
            </svg>

            {/* LEGS */}
            <svg 
                className="absolute transition-all duration-300 cursor-pointer drop-shadow-md hover:drop-shadow-xl z-20"
                style={{ top: '205px', left: '50%', marginLeft: '-46.5px' }}
                width="93.626" height="286.625" viewBox="0 0 93.626 286.625"
                onClick={() => handleRegionClick('legs')}
                onMouseEnter={() => setHoveredRegion('legs')}
                onMouseLeave={() => setHoveredRegion(null)}
            >
                <path d="M17.143 138.643l-.664 5.99 4.647 5.77 1.55 9.1 3.1 1.33 2.655-13.755 1.77-4.88-1.55-3.107zm20.582.444l-3.32 9.318-7.082 13.755 1.77 12.647 5.09-14.2 4.205-7.982zm-26.557-12.645l5.09 27.29-3.32-1.777-2.656 8.875zm22.795 42.374l-1.55 4.88-3.32 20.634-.442 27.51 4.65 26.847-.223-34.39 4.87-13.754.663-15.087zM23.34 181.24l1.106 41.267 8.853 33.28-9.628-4.55-16.045-57.8 5.533-36.384zm15.934 80.536l-.664 18.415-1.55 6.435h-4.647l-1.327-4.437-1.55-.222.332 4.437-5.864-1.778-1.55-.887-6.64-1.442-.22-5.214 6.418-10.87 4.426-5.548 10.844-4.437zM13.63 3.076v22.476l15.71 31.073 9.923 30.85L38.23 66.1zm25.49 30.248l.118-.148-.793-2.024L21.9 12.992l-1.242-.44L31.642 40.93zM32.865 44.09l6.812 17.6 2.274-21.596-1.344-3.43zM6.395 61.91l.827 25.34 12.816 35.257-3.928 10.136L3.5 88.133zM30.96 74.69l.345.826 6.47 15.48-4.177 38.342-6.594-3.526 5.715-35.7zm45.5 63.953l.663 5.99-4.647 5.77-1.55 9.1-3.1 1.33-2.655-13.755-1.77-4.88 1.55-3.107zm-20.582.444l3.32 9.318 7.08 13.755-1.77 12.647-5.09-14.2-4.2-7.987zm3.762 29.73l1.55 4.88 3.32 20.633.442 27.51-4.648 26.847.22-34.39-4.867-13.754-.67-15.087zm10.623 12.424l-1.107 41.267-8.852 33.28 9.627-4.55 16.046-57.8-5.533-36.384zM54.33 261.777l.663 18.415 1.546 6.435h4.648l1.328-4.437 1.55-.222-.333 4.437 5.863-1.778 1.55-.887 6.638-1.442.222-5.214-6.418-10.868-4.426-5.547-10.844-4.437zm25.643-258.7v22.476L64.26 56.625l-9.923 30.85L55.37 66.1zM54.48 33.326l-.118-.15.793-2.023L71.7 12.993l1.24-.44L61.96 40.93zm6.255 10.764l-6.812 17.6-2.274-21.595 1.344-3.43zm26.47 17.82l-.827 25.342-12.816 35.256 3.927 10.136 12.61-44.51zM62.64 74.693l-.346.825-6.47 15.48 4.178 38.342 6.594-3.527-5.715-35.7zm19.792 51.75l-5.09 27.29 3.32-1.776 2.655 8.875zM9.495-.007l.827 21.373-7.028 42.308-3.306-34.155zm2.068 27.323L26.24 59.707l3.307 26-6.2 36.58L9.91 85.046l-.827-38.342zM84.103-.01l-.826 21.375 7.03 42.308 3.306-34.155zm-2.066 27.325L67.36 59.707l-3.308 26 6.2 36.58 13.436-37.24.827-38.34z"
                     fill={getFillColor('legs', hoveredRegion === 'legs', selectedRegion === 'legs')}
                />
            </svg>

            {/* HANDS */}
            <svg 
                className="absolute transition-all duration-300 cursor-pointer drop-shadow-md hover:drop-shadow-xl"
                style={{ top: '224px', left: '50%', marginLeft: '-102.5px' }}
                width="205" height="38.938" viewBox="0 0 205 38.938"
                onClick={() => handleRegionClick('hands')}
                onMouseEnter={() => setHoveredRegion('hands')}
                onMouseLeave={() => setHoveredRegion(null)}
            >
                <path d="M21.255-.002l2.88 6.9 8.412 1.335.664 12.458-4.427 17.8-2.878-.22 2.8-11.847-2.99-.084-4.676 12.6-3.544-.446 4.4-12.736-3.072-.584-5.978 13.543-4.428-.445 6.088-14.1-2.1-1.25-7.528 12.012-3.764-.445L12.4 12.9l-1.107-1.78L.665 15.57 0 13.124l8.635-7.786zm162.49 0l-2.88 6.9-8.412 1.335-.664 12.458 4.427 17.8 2.878-.22-2.8-11.847 2.99-.084 4.676 12.6 3.544-.446-4.4-12.736 3.072-.584 5.978 13.543 4.428-.445-6.088-14.1 2.1-1.25 7.528 12.012 3.764-.445L192.6 12.9l1.107-1.78 10.628 4.45.665-2.447-8.635-7.786z"
                     fill={getFillColor('hands', hoveredRegion === 'hands', selectedRegion === 'hands')}
                />
            </svg>
        </div>
      </div>

      {/* === RIGHT: INFO PANEL === */}
      <div className="w-full lg:w-[400px] shrink-0 flex flex-col">
        {selectedRegion ? (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg h-full animate-fade-in flex flex-col relative overflow-hidden">
            
            {/* Header / Organ Selector */}
            <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Region: {selectedRegion}</h3>
                
                {/* Organ Tabs if multiple in region */}
                <div className="flex flex-wrap gap-2">
                    {regionMap[selectedRegion]?.map(organName => {
                         // Only show button if we have data for this organ
                         const data = organData.find(o => o.organ.toLowerCase() === organName);
                         if (!data) return null;
                         
                         return (
                             <button
                                key={organName}
                                onClick={() => setSelectedOrgan(data)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                    selectedOrgan?.organ.toLowerCase() === organName
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                                }`}
                             >
                                 {organIcons[organName] || '⚪'} {organName.charAt(0).toUpperCase() + organName.slice(1)}
                             </button>
                         )
                    })}
                </div>
                
                {(!regionMap[selectedRegion] || !regionMap[selectedRegion].some(org => organData.find(o => o.organ.toLowerCase() === org))) && (
                    <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-500 italic text-center">
                        No specific internal organ data for this region in the report.
                    </div>
                )}
            </div>

            {selectedOrgan ? (
                <>
                    {/* Selected Organ Status */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-slate-900 capitalize">
                            {selectedOrgan.organ}
                        </h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            selectedOrgan.status === 'good' ? 'bg-emerald-100 text-emerald-700' :
                            selectedOrgan.status === 'monitor' ? 'bg-amber-100 text-amber-700' :
                            selectedOrgan.status === 'attention' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {selectedOrgan.status}
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        {/* Explanation */}
                        <div>
                             <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                                <Activity size={16} className="text-primary-500" />
                                Analysis
                             </h4>
                             <p className="text-slate-600 text-sm leading-relaxed">
                                 {selectedOrgan.explanation}
                             </p>
                        </div>

                        {/* Findings */}
                        {selectedOrgan.findings.length > 0 && (
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <h4 className="font-bold text-slate-800 text-sm mb-2">Key Findings</h4>
                                <ul className="space-y-1">
                                    {selectedOrgan.findings.map((f, i) => (
                                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* DIETARY ADVICE */}
                        {(selectedOrgan.dietary_advice?.eat?.length > 0 || selectedOrgan.dietary_advice?.avoid?.length > 0) && (
                             <div className="grid grid-cols-2 gap-4">
                                 <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
                                     <h4 className="font-bold text-emerald-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                                         <Apple size={14} /> Eat
                                     </h4>
                                     {renderList(selectedOrgan.dietary_advice?.eat)}
                                 </div>
                                 <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100">
                                     <h4 className="font-bold text-rose-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                                         <Ban size={14} /> Avoid
                                     </h4>
                                     {renderList(selectedOrgan.dietary_advice?.avoid)}
                                 </div>
                             </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 opacity-60">
                    <Search size={48} className="mb-4" />
                    <p className="text-sm">Select an organ above to see details</p>
                </div>
            )}

          </div>
        ) : (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                 <Zap size={24} className="text-primary-300" />
            </div>
            <p className="text-slate-600 font-bold text-lg mb-2">Interactive Insights</p>
            <p className="text-sm max-w-[240px] leading-relaxed">
              Click on the body map regions (Head, Chest, Stomach, etc.) to view detailed organ analysis and dietary recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyMap;