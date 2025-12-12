
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Volume2, Download } from 'lucide-react';

interface VoicePlayerProps {
  script: string;
  language?: string;
}

const VoicePlayer: React.FC<VoicePlayerProps> = ({ script, language = 'en-US' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Clean up text for better speech
    const cleanText = script.replace(/[*#]/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language;
    utterance.rate = 0.9;
    
    // Attempt to pick a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!supported || !script) return null;

  return (
    <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 w-full md:w-auto min-w-[300px]">
       <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center animate-pulse">
               <Volume2 size={20} />
           </div>
           <div>
               <h4 className="font-bold text-sm">Audio Summary</h4>
               <p className="text-xs text-slate-400">Listen in {language}</p>
           </div>
       </div>

       <div className="flex items-center gap-2">
           {!isPlaying ? (
               <button onClick={handlePlay} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                   <Play size={24} fill="white" />
               </button>
           ) : (
               <button onClick={handlePause} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                   <Pause size={24} fill="white" />
               </button>
           )}
           <button onClick={handleStop} className="p-2 hover:bg-white/10 rounded-full transition-colors">
               <Square size={18} fill="white" />
           </button>
       </div>
    </div>
  );
};

export default VoicePlayer;
