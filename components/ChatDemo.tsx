import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, ArrowLeft } from 'lucide-react';
import { generateTextResponse } from '../services/geminiService';
import { ChatMessage, APIStatus } from '../types';

interface ChatDemoProps {
  onBack: () => void;
}

export const ChatDemo: React.FC<ChatDemoProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm Astra. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [status, setStatus] = useState<APIStatus>(APIStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === APIStatus.LOADING) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setStatus(APIStatus.LOADING);

    try {
      const responseText = await generateTextResponse(input, messages);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setStatus(APIStatus.SUCCESS);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }]);
      setStatus(APIStatus.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto p-4 md:p-6 w-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="p-2 mr-4 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white">Chat with Astra</h2>
      </div>

      <div className="flex-1 overflow-y-auto glass-panel rounded-2xl p-4 md:p-6 mb-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-700/50 text-slate-100 rounded-tl-none border border-slate-600'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <span className="text-xs opacity-50 mt-2 block">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {status === APIStatus.LOADING && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] gap-3">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                 <Bot className="w-5 h-5 text-white" />
               </div>
               <div className="p-4 rounded-2xl bg-slate-700/50 rounded-tl-none border border-slate-600 flex items-center">
                 <Loader2 className="w-5 h-5 text-slate-400 animate-spin mr-2" />
                 <span className="text-slate-400 text-sm">Thinking...</span>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="w-full bg-slate-800 text-white rounded-xl pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700 placeholder-slate-500"
        />
        <button
          onClick={handleSend}
          disabled={status === APIStatus.LOADING || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};