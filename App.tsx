import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  MessageSquare, 
  X, 
  Send, 
  Globe, 
  LogOut,
  User,
  Plus,
  LayoutTemplate
} from 'lucide-react';
import { NAV_ITEMS, TRANSLATIONS } from './constants';
import { Language } from './types';
import { IdeasView, ScriptsView, ShopView, LearnView } from './components/FeatureViews';
import { chatWithAi } from './services/geminiService';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState<Language>('pt');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auto-scroll chat
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    
    // Simulate thinking
    const context = `User is currently on tab: ${activeTab}`;
    const aiMsg = await chatWithAi(userMsg, context);
    setChatMessages(prev => [...prev, { role: 'ai', text: aiMsg }]);
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('https://picsum.photos/1920/1080?blur=5')] bg-cover bg-center">
        <div className="absolute inset-0 bg-rms-dark/90 backdrop-blur-sm"></div>
        <div className="relative z-10 bg-rms-panel border border-purple-500/30 p-8 rounded-2xl max-w-md w-full shadow-2xl shadow-purple-900/20 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg mx-auto mb-6 flex items-center justify-center rotate-3 hover:rotate-6 transition">
            <span className="text-3xl font-bold text-white">R</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Roblox Master Studio</h1>
          <p className="text-gray-400 mb-8">{TRANSLATIONS['hero.subtitle'][lang]}</p>
          
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-white text-black font-bold py-3 rounded-lg mb-4 hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
             {TRANSLATIONS['login.roblox'][lang]}
          </button>
          
          <button 
            onClick={toggleLang}
            className="text-sm text-gray-500 hover:text-white flex items-center justify-center gap-1 mx-auto"
          >
            <Globe size={14} /> {lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN LAYOUT ---
  return (
    <div className="flex h-screen overflow-hidden bg-rms-dark text-white selection:bg-rms-accent selection:text-black">
      
      {/* SIDEBAR */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-rms-panel border-r border-purple-900/30 flex flex-col transition-all duration-300 z-20`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">RMS</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg text-gray-400">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-2">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-cyan-400 border-l-2 border-cyan-400' 
                      : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {isSidebarOpen && <span className="text-sm font-medium">{TRANSLATIONS[item.labelKey][lang]}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-purple-900/30">
          <button onClick={toggleLang} className="w-full flex items-center gap-3 px-3 py-3 text-gray-400 hover:text-white">
            <Globe size={20} />
            {isSidebarOpen && <span className="text-sm">{lang.toUpperCase()}</span>}
          </button>
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg mt-2">
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {/* HEADER */}
        <header className="h-16 border-b border-purple-900/30 flex items-center justify-between px-6 bg-rms-dark/50 backdrop-blur-md">
          <h1 className="text-xl font-bold text-gray-200">
            {TRANSLATIONS[NAV_ITEMS.find(n => n.id === activeTab)?.labelKey || 'nav.home'][lang]}
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-gray-300">System Online</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-rms-panel flex items-center justify-center">
                 <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT VIEWPORT */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {activeTab === 'home' && (
             <div className="p-8 max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-2xl p-10 mb-8 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
                  <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">{TRANSLATIONS['hero.title'][lang]}</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{TRANSLATIONS['hero.subtitle'][lang]}</p>
                    <div className="flex justify-center gap-4">
                      <button onClick={() => setActiveTab('ideas')} className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-bold transition transform hover:scale-105">
                        {TRANSLATIONS['hero.cta'][lang]}
                      </button>
                      <button onClick={() => setActiveTab('learn')} className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg font-bold border border-gray-600 transition">
                        Tutorials
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Dashboard Project Cards */}
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-rms-panel p-4 rounded-xl border border-gray-800 hover:border-rms-purple transition cursor-pointer group">
                      <div className="h-32 bg-slate-800 rounded-lg mb-4 overflow-hidden relative">
                        <img src={`https://picsum.photos/400/200?random=${i+10}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" alt="Project" />
                      </div>
                      <h3 className="font-bold text-lg">Untitled Project {i}</h3>
                      <p className="text-xs text-gray-500">Last edited 2h ago</p>
                    </div>
                  ))}
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white transition cursor-pointer h-full min-h-[220px]">
                    <Plus size={40} className="mb-2" />
                    <span>New Project</span>
                  </div>
                </div>
             </div>
          )}

          {activeTab === 'ideas' && <IdeasView lang={lang} />}
          {activeTab === 'scripts' && <ScriptsView lang={lang} />}
          {activeTab === 'shop' && <ShopView lang={lang} />}
          {activeTab === 'learn' && <LearnView lang={lang} />}
          
          {/* Placeholder for other tabs */}
          {['maps', 'models', 'gui', 'gameplay', 'settings'].includes(activeTab) && (
            <div className="flex items-center justify-center h-full text-gray-500">
               <div className="text-center">
                 <div className="bg-slate-800 p-6 rounded-full inline-block mb-4">
                   <LayoutTemplate size={48} className="opacity-50" />
                 </div>
                 <h2 className="text-xl font-bold mb-2">Module Under Construction</h2>
                 <p>The {activeTab} tools are coming in the next update.</p>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* CHATBOT WIDGET */}
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end`}>
        {isChatOpen && (
          <div className="bg-rms-panel border border-purple-500/30 w-80 h-96 rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden animate-fade-in-up">
            <div className="bg-purple-900/30 p-3 border-b border-purple-900/30 flex justify-between items-center">
              <span className="font-bold text-sm text-cyan-400">RMS AI Assistant</span>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900/50">
              {chatMessages.length === 0 && (
                 <p className="text-xs text-center text-gray-500 mt-10">Ask me anything about scripting or building!</p>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2 rounded-lg text-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-slate-700 text-gray-200 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 bg-rms-panel border-t border-purple-900/30 flex gap-2">
              <input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder={TRANSLATIONS['chat.placeholder'][lang]}
                className="flex-1 bg-slate-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
              />
              <button onClick={handleChatSend} className="bg-rms-purple hover:bg-purple-600 p-2 rounded-lg transition">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-full shadow-lg shadow-purple-900/50 hover:scale-110 transition duration-300"
        >
          {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </div>
  );
};

export default App;