import React from 'react';
import Square from './Square';
import { Player } from '../types';

interface BoardProps {
  squares: Player[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
  isAiTurn: boolean;
  gameActive: boolean;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine, isAiTurn, gameActive }) => {
  return (
    <div className="relative z-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 glass-panel rounded-2xl shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
        {squares.map((square, i) => (
            <Square
            key={i}
            value={square}
            onClick={() => onClick(i)}
            isWinningSquare={winningLine?.includes(i) ?? false}
            disabled={!gameActive || (square !== null) || isAiTurn}
            />
        ))}
        </div>
        {/* Glow effect behind board */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--neon-p1)] to-[var(--neon-p2)] rounded-[2rem] blur-3xl -z-10 opacity-30 animate-pulse"></div>
    </div>
  );
};

export default Board;