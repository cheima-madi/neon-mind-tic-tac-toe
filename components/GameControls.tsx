import React from 'react';

interface GameControlsProps {
  resetGame: () => void;
  resetScores: () => void;
  onExit: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ resetGame, resetScores, onExit }) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-8 w-full max-w-md px-4">
      {/* Action Buttons */}
      <div className="flex gap-4 w-full">
         <button 
            onClick={resetScores}
            className="flex-1 py-3 text-xs text-slate-500 font-bold hover:text-white transition-colors uppercase tracking-widest glass-panel border-transparent hover:border-white/20 rounded-lg"
        >
            Reset Scores
        </button>
        <button 
            onClick={onExit}
            className="flex-1 py-3 text-xs text-red-400/70 font-bold hover:text-red-400 transition-colors uppercase tracking-widest glass-panel border-transparent hover:border-red-500/20 rounded-lg"
        >
            Exit to Menu
        </button>
      </div>
    </div>
  );
};

export default GameControls;