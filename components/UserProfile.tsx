
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, ChevronRight } from 'lucide-react';

interface UserProfileProps {
  onComplete: (profile: UserProfile) => void;
  initialData?: UserProfile | null;
}

const UserProfileForm: React.FC<UserProfileProps> = ({ onComplete, initialData }) => {
  const [formData, setFormData] = useState<UserProfile>(initialData || {
    name: '',
    age: 30,
    gender: 'Male',
    conditions: [],
    familyHistory: [],
    language: 'English'
  });

  const languages = ['English', 'Hindi', 'Spanish', 'French', 'Tamil', 'Telugu'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-slide-up">
       <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Personalize Your Insights</h2>
          <p className="text-slate-500">Help AI provide more accurate health risks and advice.</p>
       </div>

       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
           <div className="grid grid-cols-2 gap-4">
               <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                   <input 
                      type="number" 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
                   />
               </div>
               <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                   <select 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      value={formData.gender}
                      onChange={e => setFormData({...formData, gender: e.target.value})}
                   >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                   </select>
               </div>
           </div>

           <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Language</label>
                <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    value={formData.language}
                    onChange={e => setFormData({...formData, language: e.target.value})}
                >
                    {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Known Conditions (Optional)</label>
                <input 
                    type="text" 
                    placeholder="e.g. Diabetes, Hypertension"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    onBlur={(e) => setFormData({...formData, conditions: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                Continue to Analysis <ChevronRight size={18} />
            </button>
       </form>
    </div>
  );
};

export default UserProfileForm;
