import React, { useState } from 'react';
import { UploadCloud, FileType, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface UploadProps {
  onFileSelect: (file: File) => void;
}

const Upload: React.FC<UploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        validateAndUpload(e.target.files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (validTypes.includes(file.type)) {
        onFileSelect(file);
    } else {
        alert("Unsupported file format. Please upload JPG, PNG, or PDF.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-slide-up">
       <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Upload Report</h2>
            <p className="text-slate-500">Securely analyze blood work, prescriptions, or imaging reports.</p>
       </div>

       <div 
         className={`w-full h-80 bg-white rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden group ${
            isDragging ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-primary-400 hover:bg-slate-50'
         }`}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
       >
         <input 
            type="file" 
            accept="image/*,application/pdf" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            onChange={handleFileChange}
         />
         
         <div className="z-10 flex flex-col items-center pointer-events-none transition-transform group-hover:scale-105 duration-300">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-primary-600">
                <UploadCloud size={40} strokeWidth={1.5} />
            </div>
            <p className="text-xl font-semibold text-slate-700 mb-2">
                Click to upload or drag & drop
            </p>
            <p className="text-sm text-slate-400 font-medium">
                PDF, JPG, PNG (Max 10MB)
            </p>
         </div>
       </div>

       <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <FileType className="text-primary-600 shrink-0" size={20} />
                <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Universal Format</h4>
                    <p className="text-xs text-slate-500 mt-1">Supports standard lab PDFs and clear photos.</p>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <ImageIcon className="text-primary-600 shrink-0" size={20} />
                <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Image Enhancement</h4>
                    <p className="text-xs text-slate-500 mt-1">AI auto-corrects rotation and lighting.</p>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <CheckCircle2 className="text-primary-600 shrink-0" size={20} />
                <div>
                    <h4 className="font-semibold text-slate-800 text-sm">Privacy Guaranteed</h4>
                    <p className="text-xs text-slate-500 mt-1">Files are processed in memory and never saved.</p>
                </div>
            </div>
       </div>
    </div>
  );
};

export default Upload;