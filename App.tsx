import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { ChatDemo } from './components/ChatDemo';
import { ImageGenDemo } from './components/ImageGenDemo';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-purple-500/30">
      {/* Navbar - Sticky */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => setCurrentView('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                অ্যাস্ট্রা এআই
              </span>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentView('chat')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'chat' 
                    ? 'bg-slate-800 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                চ্যাট
              </button>
              <button 
                onClick={() => setCurrentView('image')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'image' 
                    ? 'bg-slate-800 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                ছবি
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        {currentView === 'home' && (
          <Hero 
            onStartChat={() => setCurrentView('chat')} 
            onStartImage={() => setCurrentView('image')} 
          />
        )}
        
        {currentView === 'chat' && (
          <div className="animate-fade-in pt-6">
            <ChatDemo onBack={() => setCurrentView('home')} />
          </div>
        )}

        {currentView === 'image' && (
          <div className="animate-fade-in pt-6">
            <ImageGenDemo onBack={() => setCurrentView('home')} />
          </div>
        )}
      </main>

      {/* Footer */}
      {currentView === 'home' && (
        <footer className="bg-slate-900 border-t border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} অ্যাস্ট্রা এআই। গুগল জেমিনি দ্বারা চালিত।</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;