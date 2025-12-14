import React from 'react';
import { ArrowRight } from 'lucide-react';

interface IntroProps {
  onEnter: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up px-4 text-center">
        <h1 className="text-9xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tighter drop-shadow-2xl">
          হ্যালো
        </h1>
        <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-lg font-light">
          ভবিষ্যতের এআই অভিজ্ঞতায় আপনাকে স্বাগতম
        </p>
        
        <button
          onClick={onEnter}
          className="group relative inline-flex items-center px-12 py-5 text-lg font-bold text-white transition-all duration-300 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:border-slate-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900"
        >
          প্রবেশ করুন
          <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
};