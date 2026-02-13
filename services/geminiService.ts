import { Player } from "../types";
import { WINNING_COMBINATIONS } from "../constants";

// Since we are switching to local logic for speed, we don't need the API key or GoogleGenAI imports.
// We keep the file name to maintain compatibility with App.tsx imports.

const SCORES = {
  X: -10, // AI (O) wants to maximize, X is enemy
  O: 10,  // AI is O
  TIE: 0
};

// Simple witty comments for the local bot
const COMMENTS = [
  "Calculating infinity...", 
  "Nice move, but I've seen better.", 
  "I see what you're doing there.", 
  "Block!", 
  "You can't beat pure logic.", 
  "Analyzing outcomes...", 
  "Is that your best shot?", 
  "Corner strategy? Classic.", 
  "My algorithms are tingling.",
  "Processing... Victory imminent.",
  "Oops, did I do that?",
  "Too easy.",
  "I'm thinking 3 moves ahead.",
  "Your defeat is statistically probable."
];

export const getAiMove = async (board: Player[]): Promise<{ move: number; comment: string }> => {
  // Simulate a "regular" thinking delay (1s - 1.8s)
  // This feels more natural than instant, but not too slow.
  const delay = 1000 + Math.random() * 800;
  await new Promise(resolve => setTimeout(resolve, delay));

  const bestMove = minimaxRoot(board);
  const comment = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];

  return {
    move: bestMove,
    comment: comment
  };
};

function minimaxRoot(board: Player[]): number {
  const availableMoves = getAvailableMoves(board);
  
  // If first move (empty board), take center or corner for variety/optimality
  if (availableMoves.length === 9) return 4; // Center
  if (availableMoves.length === 8 && board[4] === null) return 4; // Take center if available

  let bestScore = -Infinity;
  let bestMove = -1;

  for (const move of availableMoves) {
    board[move] = 'O';
    const score = minimax(board, 0, false);
    board[move] = null; // Backtrack

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  // If we have a winning move, or blocking move, minimax finds it.
  // If somehow no move found (shouldn't happen), pick random.
  if (bestMove === -1 && availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  return bestMove;
}

function minimax(board: Player[], depth: number, isMaximizing: boolean): number {
  const result = checkWinner(board);
  if (result !== null) {
    return result;
  }

  if (isMaximizing) { // AI Turn (O)
    let bestScore = -Infinity;
    const moves = getAvailableMoves(board);
    for (const move of moves) {
      board[move] = 'O';
      const score = minimax(board, depth + 1, false);
      board[move] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else { // Human Turn (X)
    let bestScore = Infinity;
    const moves = getAvailableMoves(board);
    for (const move of moves) {
      board[move] = 'X';
      const score = minimax(board, depth + 1, true);
      board[move] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

function getAvailableMoves(board: Player[]): number[] {
  return board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null) as number[];
}

function checkWinner(board: Player[]): number | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === 'O' ? SCORES.O : SCORES.X;
    }
  }
  if (!board.includes(null)) {
    return SCORES.TIE;
  }
  return null;
}