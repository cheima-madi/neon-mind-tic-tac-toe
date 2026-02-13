import React from 'react';
import { ScoreState, Player } from '../types';

interface ScoreBoardProps {
  scores: ScoreState;
  currentPlayer: Player;
  p1Name: string;
  p2Name: string;
  isAiThinking: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, currentPlayer, p1Name, p2Name, isAiThinking }) => {
  return (
    <div className="flex justify-center gap-4 sm:gap-8 mb-8 w-full max-w-lg px-4">
      {/* Player X Score */}
      <div className={`flex-1 glass-panel rounded-xl p-4 flex flex-col items-center transition-all duration-300 border ${currentPlayer === 'X' ? 'border-[var(--neon-p1)] neon-box-p1 scale-105 z-10' : 'border-transparent opacity-80'}`}>
        <div className="text-[var(--neon-p1)] font-bold text-sm sm:text-lg mb-1 truncate max-w-full text-center">{p1Name}</div>
        <div className="text-4xl font-black text-white" style={{textShadow: '2px 2px 0 var(--neon-p1)'}}>{scores.X}</div>
        <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Player X</div>
      </div>

      {/* VS / Draws */}
      <div className="flex flex-col justify-center items-center text-slate-500">
        <span className="text-xs font-bold uppercase tracking-widest mb-1">Draws</span>
        <span className="text-xl text-white font-bold">{scores.Draws}</span>
      </div>

      {/* Player O Score */}
      <div className={`flex-1 glass-panel rounded-xl p-4 flex flex-col items-center transition-all duration-300 border ${currentPlayer === 'O' ? 'border-[var(--neon-p2)] neon-box-p2 scale-105 z-10' : 'border-transparent opacity-80'}`}>
        <div className="text-[var(--neon-p2)] font-bold text-sm sm:text-lg mb-1 truncate max-w-full text-center">
            {p2Name}
        </div>
        <div className="text-4xl font-black text-white" style={{textShadow: '2px 2px 0 var(--neon-p2)'}}>{scores.O}</div>
        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-wider font-bold h-4">
            {isAiThinking ? (
                <span className="animate-pulse text-[var(--neon-p2)]">Bot Playing...</span>
            ) : (
                'Player O'
            )}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;