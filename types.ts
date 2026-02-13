export type Player = 'X' | 'O' | null;

export type GameMode = 'PvP' | 'PvAI';

export interface ScoreState {
  X: number;
  O: number;
  Draws: number;
}

export interface WinningLine {
  line: number[];
  winner: 'X' | 'O';
}

export interface AiMoveResponse {
  move: number;
  comment: string;
}
