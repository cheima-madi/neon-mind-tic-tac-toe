import React from 'react';
import { Player } from '../types';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, disabled }) => {
  // Base classes for the glassmorphism effect
  const baseClasses = "h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center text-4xl sm:text-7xl font-black rounded-xl transition-all duration-300 transform glass-panel cursor-pointer shadow-lg";
  
  // Specific style states
  // We utilize the custom CSS classes defined in index.html for neon effects
  let styleClasses = "hover:bg-white/10 border-white/10";
  let textClasses = "";

  if (value === 'X') {
      textClasses = "neon-text-p1"; // Purple
      styleClasses = isWinningSquare ? "bg-[var(--neon-p1)]/20 neon-box-p1 scale-105" : "border-[var(--neon-p1)]/50";
  } else if (value === 'O') {
      textClasses = "neon-text-p2"; // Lime
      styleClasses = isWinningSquare ? "bg-[var(--neon-p2)]/20 neon-box-p2 scale-105" : "border-[var(--neon-p2)]/50";
  } else if (!disabled) {
      styleClasses = "hover:scale-105 hover:bg-white/5 border-white/10";
  }
    
  const disabledClasses = disabled ? "cursor-default" : "active:scale-95";

  return (
    <button
      className={`${baseClasses} ${styleClasses} ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`transform transition-transform duration-300 ${value ? 'scale-100' : 'scale-0'}`}>
        <span className={textClasses} style={{fontFamily: 'sans-serif'}}>
          {value}
        </span>
      </span>
    </button>
  );
};

export default Square;