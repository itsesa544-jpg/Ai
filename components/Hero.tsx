import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, Image as ImageIcon, Zap } from 'lucide-react';

interface HeroProps {
  onStartChat: () => void;
  onStartImage: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartChat, onStartImage }) => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-slate-900">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-300">Powered by Gemini 2.5</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white space-y-2">
          <span className="block">Unlock Your</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Creative Potential
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-slate-400">
          Experience the next generation of AI. Chat with intelligent agents, generate stunning visuals, and explore the limits of imagination with Astra.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={onStartChat}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-slate-900"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Chatting
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onStartImage}
            className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-300 transition-all duration-200 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 focus:ring-offset-slate-900"
          >
            <ImageIcon className="w-5 h-5 mr-2" />
            Generate Images
          </button>
        </div>

        {/* Feature Grid Mini */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="glass-panel p-6 rounded-2xl hover:bg-slate-800/50 transition-colors">
            <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-slate-400 text-sm">Powered by Gemini Flash for sub-second responses.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl hover:bg-slate-800/50 transition-colors">
            <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Creative Genius</h3>
            <p className="text-slate-400 text-sm">Generate poems, code, and ideas effortlessly.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl hover:bg-slate-800/50 transition-colors">
            <div className="h-10 w-10 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4 text-pink-400">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Visual Art</h3>
            <p className="text-slate-400 text-sm">Turn text into high-quality images instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};