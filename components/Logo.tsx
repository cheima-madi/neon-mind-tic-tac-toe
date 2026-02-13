import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center mb-6 hover:scale-105 transition-transform duration-500">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-p1)] to-[var(--neon-p2)] blur-3xl opacity-20 rounded-full"></div>
      
      {/* SVG Icon */}
      <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 mb-2">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {/* Grid Lines - Vertical */}
            <line x1="35" y1="10" x2="35" y2="90" stroke="white" strokeWidth="4" strokeLinecap="round" className="drop-shadow-[0_0_5px_var(--neon-p1)]" />
            <line x1="65" y1="10" x2="65" y2="90" stroke="white" strokeWidth="4" strokeLinecap="round" className="drop-shadow-[0_0_5px_var(--neon-p2)]" />
            
            {/* Grid Lines - Horizontal */}
            <line x1="10" y1="35" x2="90" y2="35" stroke="white" strokeWidth="4" strokeLinecap="round" className="drop-shadow-[0_0_5px_var(--neon-p2)]" />
            <line x1="10" y1="65" x2="90" y2="65" stroke="white" strokeWidth="4" strokeLinecap="round" className="drop-shadow-[0_0_5px_var(--neon-p1)]" />

            {/* X Mark (Top Right) */}
            <path d="M70 20 L90 40 M90 20 L70 40" stroke="var(--neon-p1)" strokeWidth="5" strokeLinecap="round" className="animate-pulse" />
            
            {/* O Mark (Bottom Left) */}
            <circle cx="25" cy="78" r="10" stroke="var(--neon-p2)" strokeWidth="5" className="animate-pulse" style={{animationDelay: '0.5s'}} />
        </svg>
      </div>

      {/* Text Logo */}
      <div className="relative z-10 flex gap-2 font-black text-2xl tracking-[0.2em]">
        <span className="text-white drop-shadow-[2px_2px_0_var(--neon-p1)]">TIC</span>
        <span className="text-[var(--neon-p1)] drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">TAC</span>
        <span className="text-white drop-shadow-[-2px_2px_0_var(--neon-p2)]">TOE</span>
      </div>
    </div>
  );
};

export default Logo;