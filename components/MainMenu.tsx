import React, { useState } from 'react';
import { GameMode } from '../types';

interface MainMenuProps {
  onStartGame: (mode: GameMode, p1Name: string, p2Name: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');

  const handleStart = () => {
    if (selectedMode) {
      // If AI mode, we force the name to Bot if the user didn't customize it
      const finalP2Name = selectedMode === 'PvAI' ? 'Bot' : p2Name;
      onStartGame(selectedMode, p1Name, finalP2Name);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg z-20 animate-in fade-in zoom-in duration-500">
      
      {/* Selection Cards */}
      {!selectedMode ? (
        <div className="flex flex-col gap-6 w-full">
          <button 
            onClick={() => setSelectedMode('PvP')}
            className="group relative p-8 glass-panel rounded-2xl hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-[var(--neon-p1)] text-left"
          >
            <div className="absolute top-4 right-4 text-[var(--neon-p1)] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-[var(--neon-p1)]">Vs Person</h2>
            <p className="text-slate-400 text-sm">Play locally with a friend.</p>
          </button>

          <button 
            onClick={() => setSelectedMode('PvAI')}
            className="group relative p-8 glass-panel rounded-2xl hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-[var(--neon-p2)] text-left"
          >
            <div className="absolute top-4 right-4 text-[var(--neon-p2)] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="12" x="3" y="10" rx="2"/><circle cx="12" cy="16" r="2"/><path d="M12 6V2"/><path d="M5 6v4"/><path d="M19 6v4"/></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-[var(--neon-p2)]">Vs Bot</h2>
            <p className="text-slate-400 text-sm">Challenge the AI Bot.</p>
          </button>
        </div>
      ) : (
        /* Name Input Screen */
        <div className="w-full glass-panel p-8 rounded-2xl border border-white/10">
          <div className="flex items-center mb-6">
            <button 
                onClick={() => setSelectedMode(null)} 
                className="text-slate-400 hover:text-white mr-4 transition-colors"
            >
                ← Back
            </button>
            <h2 className="text-xl font-bold text-white">
                Setup {selectedMode === 'PvP' ? 'PvP' : 'PvAI'}
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--neon-p1)] mb-2 font-bold">Player X Name (You)</label>
              <input 
                type="text" 
                value={p1Name}
                onChange={(e) => setP1Name(e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--neon-p1)] transition-colors"
                placeholder="Enter Name"
              />
            </div>

            {selectedMode === 'PvP' && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--neon-p2)] mb-2 font-bold">Player O Name</label>
                <input 
                  type="text" 
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--neon-p2)] transition-colors"
                  placeholder="Enter Name"
                />
              </div>
            )}

            <button 
                onClick={handleStart}
                className="w-full py-4 mt-4 bg-white text-black font-bold text-lg rounded-lg hover:scale-105 active:scale-95 transition-transform shadow-[4px_4px_0px_var(--neon-p1),-4px_-4px_0px_var(--neon-p2)]"
            >
                START GAME
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;