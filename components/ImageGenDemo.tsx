import React, { useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Sparkles, Loader2, Download } from 'lucide-react';
import { generateImage } from '../services/geminiService';
import { APIStatus } from '../types';

interface ImageGenDemoProps {
  onBack: () => void;
}

export const ImageGenDemo: React.FC<ImageGenDemoProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<APIStatus>(APIStatus.IDLE);

  const handleGenerate = async () => {
    if (!prompt.trim() || status === APIStatus.LOADING) return;

    setStatus(APIStatus.LOADING);
    setGeneratedImage(null);

    try {
      const imageData = await generateImage(prompt);
      setGeneratedImage(imageData);
      setStatus(APIStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(APIStatus.ERROR);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto p-4 md:p-6 w-full">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="p-2 mr-4 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white">এআই ইমেজ স্টুডিও</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              আপনার কল্পনার বর্ণনা দিন
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="সূর্যাস্তে উড়ন্ত গাড়ি সহ একটি ফিউচারিস্টিক শহর, সাইবারপাঙ্ক স্টাইল..."
              className="w-full h-32 bg-slate-900/50 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-slate-600 resize-none mb-4 placeholder-slate-500"
            />
            
            <button
              onClick={handleGenerate}
              disabled={status === APIStatus.LOADING || !prompt.trim()}
              className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
            >
              {status === APIStatus.LOADING ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  তৈরি হচ্ছে...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  আর্ট তৈরি করুন
                </>
              )}
            </button>
            {status === APIStatus.ERROR && (
               <p className="text-red-400 text-sm mt-3 text-center">ছবি তৈরি করতে ব্যর্থ হয়েছে। অন্য প্রম্পট চেষ্টা করুন।</p>
            )}
          </div>

          <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">ভালো ফলাফলের জন্য টিপস</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span> আলোর কথা নির্দিষ্ট করে বলুন (যেমন, "সিনেম্যাটিক লাইটিং")
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span> আর্ট স্টাইল উল্লেখ করুন (যেমন, "অয়েল পেইন্টিং", "ডিজিটাল আর্ট")
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span> মুড বা পরিবেশ বর্ণনা করুন (যেমন, "রহস্যময়", "আনন্দদায়ক")
              </li>
            </ul>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex items-center justify-center">
          <div className="w-full aspect-square relative rounded-2xl overflow-hidden border-2 border-dashed border-slate-700 bg-slate-800/30 flex items-center justify-center group">
            {generatedImage ? (
              <>
                <img 
                  src={generatedImage} 
                  alt="Generated AI Art" 
                  className="w-full h-full object-cover animate-fade-in"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <a 
                     href={generatedImage} 
                     download={`astra-generated-${Date.now()}.png`}
                     className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold flex items-center hover:scale-105 transition-transform"
                   >
                     <Download className="w-5 h-5 mr-2" />
                     ছবি ডাউনলোড করুন
                   </a>
                </div>
              </>
            ) : status === APIStatus.LOADING ? (
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
                </div>
                <p className="text-slate-400 mt-4 animate-pulse">আপনার মাস্টারপিস তৈরি হচ্ছে...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500">
                <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                <p>আপনার সৃষ্টি এখানে দেখা যাবে</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};