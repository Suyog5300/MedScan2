
import React from 'react';
import { 
  ArrowRight, UploadCloud, Activity, ShieldCheck, Zap, 
  BrainCircuit, LayoutDashboard, Lock, FileText, ChevronRight
} from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col w-full animate-fade-in bg-slate-50">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10 max-w-2xl mx-auto lg:mx-0">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Medical Grade Analysis
               </div>
               
               <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.15]">
                 Understand your health <br/>
                 <span className="text-primary-600">without the confusion.</span>
               </h1>
               
               <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                 Upload any medical report (PDF or Image). Our AI extracts the data, explains the jargon, and maps it to your body—instantly and securely.
               </p>

               <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={onStart}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-base py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Analyze Report Now
                    <ArrowRight size={18} />
                  </button>
                  <p className="text-xs text-slate-500 font-medium">
                    No sign-up required • 100% Private
                  </p>
               </div>
            </div>

            {/* Right Visual (High-Fidelity UI Mockup) */}
            <div className="flex-1 w-full max-w-[650px] lg:max-w-none relative">
               {/* This card mimics the actual Results.tsx design EXACTLY */}
               <div className="relative z-10 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-slide-up">
                   
                   {/* Mockup Header */}
                   <div className="bg-white p-6 border-b border-slate-100 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl">⚠️</div>
                          <div>
                              <div className="font-bold text-slate-900 text-lg">Detailed Analysis</div>
                              <div className="text-sm text-slate-500">Lipid Profile • Oct 14, 2024</div>
                          </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Activity size={16} className="text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">MedScan AI</span>
                      </div>
                   </div>

                   {/* Mockup Content */}
                   <div className="p-6 bg-slate-50/50 space-y-4">
                       {/* Attention Item Card */}
                       <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
                           <div className="px-5 py-4 bg-rose-50 border-b border-rose-100 flex justify-between items-center">
                               <div>
                                   <div className="flex items-center gap-2">
                                       <h4 className="font-bold text-slate-900">Total Cholesterol</h4>
                                       <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">High</span>
                                   </div>
                               </div>
                               <div className="text-right">
                                   <span className="block font-bold text-slate-900">240 mg/dL</span>
                                   <span className="text-[10px] text-slate-400 uppercase font-bold">Your Value</span>
                               </div>
                           </div>
                           <div className="p-5">
                               {/* Simplified Gauge */}
                               <div className="h-2 w-full bg-slate-100 rounded-full mb-4 relative overflow-hidden">
                                   <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-slate-200"></div>
                                   <div className="absolute left-[80%] top-0 bottom-0 w-1 bg-rose-500 z-10"></div>
                               </div>
                               <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative">
                                    <div className="absolute -top-3 left-4 bg-white px-2 py-0.5 rounded-full border border-slate-100 text-[10px] font-bold text-primary-600 uppercase tracking-wider flex items-center gap-1">
                                        <BrainCircuit size={12} /> Simple Explanation
                                    </div>
                                    <p className="text-sm text-slate-700 italic mt-1">
                                        "Think of it like too many delivery trucks clogging up your highway arteries, which can slow down traffic."
                                    </p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               
               {/* Decorative Backdrop */}
               <div className="absolute top-10 -right-10 w-full h-full bg-gradient-to-br from-primary-100 to-teal-50 rounded-3xl -z-10 opacity-50 transform rotate-3"></div>
            </div>

          </div>
        </div>
      </div>

      {/* --- HOW IT WORKS (Replaces Stats) --- */}
      <div className="bg-white py-20 border-y border-slate-200">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900">How MedScan Works</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

                  {[
                      { icon: UploadCloud, title: "1. Upload", desc: "Take a photo or upload a PDF of your medical report." },
                      { icon: BrainCircuit, title: "2. Analyze", desc: "Our AI extracts values and identifies health risks instantly." },
                      { icon: ShieldCheck, title: "3. Understand", desc: "Get a secure, body-mapped breakdown of your health." }
                  ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center text-center bg-white">
                          <div className="w-24 h-24 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center justify-center mb-6 text-primary-600">
                              <step.icon size={32} strokeWidth={1.5} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                          <p className="text-slate-500 max-w-xs leading-relaxed">{step.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* --- FEATURES 1: BODY MAP (Exact Replica) --- */}
      <div className="py-24 container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                  <div className="inline-block p-3 bg-blue-50 text-blue-600 rounded-2xl mb-6">
                      <LayoutDashboard size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Visualize your health.</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                      Don't just read numbers. We transform your data into an interactive anatomical map, highlighting exactly which organs need attention.
                  </p>
                  <ul className="space-y-4">
                      {['Interactive organ visualization', 'Color-coded status indicators', 'Specific dietary advice'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <ChevronRight size={14} />
                              </div>
                              {item}
                          </li>
                      ))}
                  </ul>
              </div>
              
              {/* Visual: Styled to look EXACTLY like BodyMap.tsx */}
              <div className="flex-1 w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 flex items-center justify-center min-h-[500px] relative overflow-hidden">
                   <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                   
                   {/* Simplified Static Body Map for Landing Page - Uses same paths as app */}
                   <div className="relative w-[200px] h-[400px]">
                        {/* Head - Green */}
                        <svg className="absolute top-0 left-1/2 -ml-[19px] drop-shadow-md" width="38" height="64" viewBox="0 0 56.594 95.031">
                            <path d="M15.92 68.5l8.8 12.546 3.97 13.984-9.254-7.38-4.622-15.848zm27.1 0l-8.8 12.546-3.976 13.988 9.254-7.38 4.622-15.848zm6.11-27.775l.108-11.775-21.16-14.742L8.123 26.133 8.09 40.19l-3.24.215 1.462 9.732 5.208 1.81 2.36 11.63 9.72 11.018 10.856-.324 9.56-10.37 1.918-11.952 5.207-1.81 1.342-9.517zm-43.085-1.84l-.257-13.82L28.226 11.9l23.618 15.755-.216 10.37 4.976-17.085L42.556 2.376 25.49 0 10.803 3.673.002 24.415z" fill="#10B981" />
                        </svg>
                        {/* Chest - Orange (Alert) */}
                        <svg className="absolute top-[60px] left-1/2 -ml-[29px] drop-shadow-md animate-pulse" width="58" height="30" viewBox="0 0 86.594 45.063">
                            <path d="M19.32 0l-9.225 16.488-10.1 5.056 6.15 4.836 4.832 14.07 11.2 4.616 17.85-8.828-4.452-34.7zm47.934 0l9.225 16.488 10.1 5.056-6.15 4.836-4.833 14.07-11.2 4.616-17.844-8.828 4.45-34.7z" fill="#F97316" />
                        </svg>
                        {/* Stomach - Green */}
                        <svg className="absolute top-[88px] left-1/2 -ml-[25px] drop-shadow-md" width="50" height="72" viewBox="0 0 75.25 107.594">
                            <path d="M19.25 7.49l16.6-7.5-.5 12.16-14.943 7.662zm-10.322 8.9l6.9 3.848-.8-9.116zm5.617-8.732L1.32 2.15 6.3 15.6zm-8.17 9.267l9.015 5.514 1.54 11.028-8.795-5.735zm15.53 5.89l.332 8.662 12.286-2.665.664-11.826zm14.61 84.783L33.28 76.062l-.08-20.53-11.654-5.736-1.32 37.5zM22.735 35.64L22.57 46.3l11.787 3.166.166-16.657zm-14.16-5.255L16.49 35.9l1.1 11.25-8.8-7.06zm8.79 22.74l-9.673-7.28-.84 9.78L-.006 68.29l10.564 14.594 5.5.883 1.98-20.735zM56 7.488l-16.6-7.5.5 12.16 14.942 7.66zm10.32 8.9l-6.9 3.847.8-9.116zm-5.617-8.733L73.93 2.148l-4.98 13.447zm8.17 9.267l-9.015 5.514-1.54 11.03 8.8-5.736zm-15.53 5.89l-.332 8.662-12.285-2.665-.664-11.827zm-14.61 84.783l3.234-31.536.082-20.532 11.65-5.735 1.32 37.5zm13.78-71.957l.166 10.66-11.786 3.168-.166-16.657zm14.16-5.256l-7.915 5.514-1.1 11.25 8.794-7.06zm-8.79 22.743l9.673-7.28.84 9.78 6.862 12.66-10.564 14.597-5.5.883-1.975-20.74z" fill="#10B981" />
                        </svg>
                   </div>
                   
                   {/* Floating Tooltip Mock */}
                   <div className="absolute top-24 right-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100 max-w-[160px] animate-fade-in">
                       <div className="text-xs font-bold text-slate-400 uppercase mb-1">Chest</div>
                       <div className="text-sm font-bold text-slate-900">Possible Infection</div>
                       <div className="mt-2 w-2 h-2 rounded-full bg-orange-500"></div>
                   </div>
              </div>
          </div>
      </div>

      {/* --- FEATURES 2: PRIVACY & SECURITY --- */}
      <div className="bg-white py-24">
          <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                   {/* Abstract background */}
                   <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                   <div className="relative z-10">
                       <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-8">
                           <Lock size={32} className="text-teal-400" />
                       </div>
                       <h2 className="text-3xl md:text-5xl font-bold mb-6">Your data is yours. Period.</h2>
                       <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                           MedScan processes your files in real-time memory. We do not store, sell, or train models on your personal medical reports. Once you close the tab, it's gone.
                       </p>
                       <div className="flex flex-wrap justify-center gap-4">
                           <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700 text-sm font-bold text-slate-300">
                               <ShieldCheck size={16} /> 256-bit Encryption
                           </div>
                           <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700 text-sm font-bold text-slate-300">
                               <Zap size={16} /> Anonymous Processing
                           </div>
                       </div>
                   </div>
              </div>
          </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="py-24 text-center">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to decode your health?</h2>
              <p className="text-slate-600 mb-10 text-lg">Join thousands of users making sense of their medical data.</p>
              <button 
                onClick={onStart}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 px-12 rounded-full shadow-xl shadow-primary-200 transition-all hover:-translate-y-1"
              >
                  Analyze My Report Free
              </button>
          </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                  <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                      <Activity size={20} />
                  </div>
                  <span className="text-lg font-bold text-slate-900">MedScan</span>
              </div>
              
              <div className="flex gap-8 text-sm font-medium text-slate-500">
                  <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
              </div>

              <div className="text-sm text-slate-400">
                  © 2025 MedScan AI. All rights reserved.
              </div>
          </div>
      </footer>

    </div>
  );
};

export default Hero;
