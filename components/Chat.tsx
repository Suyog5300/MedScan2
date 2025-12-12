import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, MedicalAnalysis } from '../types';
import { getChatResponse } from '../services/geminiService';
import { Send, X, Bot, User, Loader2 } from 'lucide-react';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  reportContext: MedicalAnalysis;
}

const Chat: React.FC<ChatProps> = ({ isOpen, onClose, reportContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello. I have analyzed your report. What specific details would you like me to clarify?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const responseText = await getChatResponse(history, userMsg.text, reportContext);
        
        setMessages(prev => [...prev, {
            role: 'model',
            text: responseText,
            timestamp: Date.now()
        }]);
    } catch (e) {
        setMessages(prev => [...prev, {
            role: 'model',
            text: "I encountered a connection error. Please try again.",
            timestamp: Date.now()
        }]);
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose}></div>
        
        {/* Chat Drawer */}
        <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform animate-slide-in flex flex-col">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">MedScan Assistant</h3>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-primary-600 text-white'}`}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div 
                            className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-white text-slate-800 border border-slate-200 rounded-tr-none' 
                                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                            <Loader2 className="animate-spin text-primary-600" size={20} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="relative">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a follow-up question..."
                        className="w-full bg-slate-100 border-none rounded-xl pl-4 pr-12 py-4 text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none text-slate-800 placeholder:text-slate-400"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    </>
  );
};

export default Chat;