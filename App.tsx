
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Upload from './components/Upload';
import Processing from './components/Processing';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import UserProfileForm from './components/UserProfile';
import { MedicalAnalysis, UserProfile } from './types';
import { analyzeReport } from './services/geminiService';
import { saveReportToHistory, getUserProfile, saveUserProfile } from './services/storageService';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'upload' | 'profile' | 'processing' | 'dashboard'>('home');
  const [analysisData, setAnalysisData] = useState<MedicalAnalysis | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<{data: string, type: string} | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check if user has a profile saved
    const savedProfile = getUserProfile();
    if (savedProfile) setUserProfile(savedProfile);
  }, []);

  const handleStart = () => setScreen('upload');

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setCurrentFile({ data: base64Data, type: file.type });
        
        // If no profile, go to profile creation, else straight to processing
        if (!userProfile) {
            setScreen('profile');
        } else {
            processReport(base64Data, file.type, userProfile);
        }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileComplete = (profile: UserProfile) => {
      saveUserProfile(profile);
      setUserProfile(profile);
      if (currentFile) {
          processReport(currentFile.data, currentFile.type, profile);
      }
  };

  const processReport = async (base64Data: string, mimeType: string, profile: UserProfile) => {
      setScreen('processing');
      setError(null);
      try {
        const data = await analyzeReport(base64Data, mimeType, profile);
        saveReportToHistory(data); // Save for trends
        setAnalysisData(data);
        setScreen('dashboard');
      } catch (err) {
        console.error(err);
        setError("Unable to process this file. Please ensure it is a clear image or standard PDF.");
        setScreen('upload');
      }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setCurrentFile(null);
    setScreen('home');
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50">
      {/* Navbar */}
      <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                <Activity size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">MedScan</span>
        </div>
        {userProfile && (
            <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full hidden sm:block">
                Hi, {userProfile.name || 'User'}
            </div>
        )}
      </nav>

      <main className="container mx-auto py-8">
        {screen === 'home' && <Hero onStart={handleStart} />}
        
        {screen === 'upload' && (
            <div className="animate-fade-in">
                {error && (
                    <div className="max-w-md mx-auto mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg border border-red-100 text-center text-sm font-medium flex items-center justify-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}
                <Upload onFileSelect={handleFileSelect} />
            </div>
        )}

        {screen === 'profile' && <UserProfileForm onComplete={handleProfileComplete} initialData={userProfile} />}
        
        {screen === 'processing' && <Processing />}
        
        {screen === 'dashboard' && analysisData && (
            <Dashboard 
                data={analysisData} 
                onReset={handleReset} 
                openChat={() => setIsChatOpen(true)}
            />
        )}
      </main>

      {analysisData && (
          <Chat 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)} 
            reportContext={analysisData}
          />
      )}
    </div>
  );
};

export default App;
