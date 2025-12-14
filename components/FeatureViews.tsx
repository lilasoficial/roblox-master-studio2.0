import React, { useState } from 'react';
import { Play, Copy, Wand2, ShoppingBag, BookOpen } from 'lucide-react';
import { generateRobloxIdea, generateLuaScript } from '../services/geminiService';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface ViewProps {
  lang: Language;
}

// --- IDEA GENERATOR ---
export const IdeasView: React.FC<ViewProps> = ({ lang }) => {
  const [genre, setGenre] = useState('RPG');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const idea = await generateRobloxIdea(genre, lang);
    setResult(idea);
    setLoading(false);
  };

  const genres = ['RPG', 'Tycoon', 'Obby', 'Survival', 'FPS', 'Simulator'];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-rms-accent">{TRANSLATIONS['idea.title'][lang]}</h2>
      
      <div className="bg-rms-panel p-6 rounded-xl border border-purple-900/50 mb-6">
        <label className="block mb-2 text-gray-300">{TRANSLATIONS['idea.desc'][lang]}</label>
        <div className="flex gap-4 flex-wrap mb-4">
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-4 py-2 rounded-full transition-all ${genre === g ? 'bg-rms-purple text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {g}
            </button>
          ))}
        </div>
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-rms-purple px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <Wand2 className="animate-spin" /> : <Wand2 />}
          {loading ? TRANSLATIONS['status.loading'][lang] : TRANSLATIONS['idea.btn'][lang]}
        </button>
      </div>

      {result && (
        <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-rms-accent animate-fade-in">
          <pre className="whitespace-pre-wrap font-sans text-gray-200 leading-relaxed">{result}</pre>
        </div>
      )}
    </div>
  );
};

// --- SCRIPT EDITOR ---
export const ScriptsView: React.FC<ViewProps> = ({ lang }) => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('-- Generated code will appear here');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const script = await generateLuaScript(prompt, lang);
    setCode(script);
    setLoading(false);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-rms-accent">{TRANSLATIONS['script.title'][lang]}</h2>
      
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div className="lg:w-1/3 bg-rms-panel p-4 rounded-xl flex flex-col">
          <textarea
            className="w-full h-32 bg-slate-900 border border-purple-900 rounded-lg p-3 text-white focus:outline-none focus:border-rms-accent mb-4 resize-none"
            placeholder={TRANSLATIONS['script.placeholder'][lang]}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-rms-purple py-3 rounded-lg font-bold hover:bg-purple-600 transition disabled:opacity-50"
          >
             {loading ? TRANSLATIONS['status.loading'][lang] : TRANSLATIONS['script.generate'][lang]}
          </button>

          <div className="mt-6">
            <h3 className="text-gray-400 text-sm uppercase font-bold mb-3">Snippets</h3>
            {['Kill Brick', 'Leaderstats', 'DataStore Save'].map((s, i) => (
              <button key={i} onClick={() => setPrompt(`Create a ${s} script`)} className="block w-full text-left p-2 hover:bg-slate-800 rounded text-cyan-200 text-sm">
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-2/3 bg-[#0d0d0d] p-4 rounded-xl border border-gray-800 font-mono relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-800">
            <span className="text-xs text-gray-500">script.lua</span>
            <button onClick={() => navigator.clipboard.writeText(code)} className="text-gray-500 hover:text-white"><Copy size={16}/></button>
          </div>
          <textarea 
            className="w-full h-full bg-transparent text-green-400 focus:outline-none resize-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

// --- SHOP MOCK ---
export const ShopView: React.FC<ViewProps> = ({ lang }) => {
  const items = [
    { id: 1, name: 'Cyberpunk City Map', price: 15, img: 'https://picsum.photos/300/200?random=1' },
    { id: 2, name: 'FPS Gun System', price: 10, img: 'https://picsum.photos/300/200?random=2' },
    { id: 3, name: 'RPG UI Kit', price: 5, img: 'https://picsum.photos/300/200?random=3' },
    { id: 4, name: 'Monster Pack', price: 8, img: 'https://picsum.photos/300/200?random=4' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-rms-accent">{TRANSLATIONS['shop.title'][lang]}</h2>
        <div className="bg-slate-800 px-4 py-2 rounded-full text-yellow-400 font-bold flex items-center gap-2">
          <span>$ 1,250 Credits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-rms-panel rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300 border border-transparent hover:border-rms-purple group">
            <div className="relative">
              <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
              <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-bold text-white">
                Premium
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xl text-yellow-400 font-mono">${item.price}</span>
                <button className="bg-rms-accent text-black px-3 py-1 rounded-lg text-sm font-bold hover:bg-white flex items-center gap-1">
                  <ShoppingBag size={14} /> {TRANSLATIONS['shop.buy'][lang]}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- LEARNING VIEW ---
export const LearnView: React.FC<ViewProps> = ({ lang }) => (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6 text-rms-accent">{TRANSLATIONS['nav.learn'][lang]}</h2>
    <div className="grid gap-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-rms-panel p-6 rounded-xl flex items-center gap-4 hover:bg-slate-800 cursor-pointer transition">
          <div className="bg-purple-900/50 p-4 rounded-full text-rms-accent">
            <Play size={24} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Roblox Lua Course: Chapter {i}</h3>
            <p className="text-gray-400">Master variables, loops, and functions in 10 minutes.</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);