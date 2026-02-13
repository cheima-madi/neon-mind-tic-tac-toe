import React, { useState, useEffect, useCallback } from 'react';
import { Player, GameMode, ScoreState } from './types';
import { WINNING_COMBINATIONS, INITIAL_BOARD } from './constants';
import { getAiMove } from './services/geminiService';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import MainMenu from './components/MainMenu';
import Logo from './components/Logo';

const App: React.FC = () => {
  // Game Flow State
  const [view, setView] = useState<'MENU' | 'GAME'>('MENU');
  
  // Player Config
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');
  const [gameMode, setGameMode] = useState<GameMode>('PvP');

  // Board State
  const [board, setBoard] = useState<Player[]>(INITIAL_BOARD);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState<ScoreState>({ X: 0, O: 0, Draws: 0 });
  
  // AI State
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiComment, setAiComment] = useState<string>("");

  const currentPlayer = isXNext ? 'X' : 'O';

  // Reset Game Logic
  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setAiComment("");
  }, []);

  const resetScores = () => {
    setScores({ X: 0, O: 0, Draws: 0 });
    resetGame();
  };

  // Start Game Handler
  const handleStartGame = (mode: GameMode, name1: string, name2: string) => {
    setGameMode(mode);
    setP1Name(name1 || 'Player 1');
    setP2Name(name2 || (mode === 'PvAI' ? 'Bot' : 'Player 2'));
    resetGame();
    setScores({ X: 0, O: 0, Draws: 0 }); // Reset scores on new session
    setView('GAME');
  };

  const handleExit = () => {
    setView('MENU');
    resetGame();
  };

  // Check for win/draw
  const calculateWinner = useCallback((squares: Player[]) => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }, []);

  const handleWin = useCallback((winner: Player, line: number[]) => {
    setWinner(winner);
    setWinningLine(line);
    setScores(prev => ({ ...prev, [winner!]: prev[winner!] + 1 }));
  }, []);

  const handleDraw = useCallback(() => {
    setWinner('Draw');
    setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
  }, []);

  // Handle click
  const handleSquareClick = async (i: number) => {
    if (board[i] || winner || isAiThinking) return;

    // Player Move
    const newBoard = [...board];
    newBoard[i] = currentPlayer;
    setBoard(newBoard);

    // Check Win/Draw immediately after player move
    const result = calculateWinner(newBoard);
    if (result) {
      handleWin(result.winner, result.line);
    } else if (!newBoard.includes(null)) {
      handleDraw();
    } else {
        // Switch turn
        setIsXNext(!isXNext);
        setAiComment(""); // Clear previous comment on new turn
    }
  };

  // Auto-Restart Effect
  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        resetGame();
      }, 2500); // 2.5 seconds delay before next round
      return () => clearTimeout(timer);
    }
  }, [winner, resetGame]);

  // AI Logic Effect
  useEffect(() => {
    const runAiTurn = async () => {
      if (view === 'GAME' && gameMode === 'PvAI' && !isXNext && !winner && board.includes(null)) {
        setIsAiThinking(true);
        
        try {
          const { move, comment } = await getAiMove(board);
          
          setAiComment(comment);
          
          setBoard(prev => {
            const newBoard = [...prev];
            // Safety check if space is still empty
            if (newBoard[move] === null) {
                newBoard[move] = 'O';
            }
            return newBoard;
          });
          setIsXNext(true); 
        } catch (error) {
          console.error("AI Error", error);
          setIsXNext(true);
        } finally {
          setIsAiThinking(false);
        }
      }
    };

    runAiTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isXNext, gameMode, winner, view]);

  // Effect to check win condition after board update (critical for AI turn)
  useEffect(() => {
    if (board.every(cell => cell === null)) return;

    const result = calculateWinner(board);
    if (result && !winner) {
        handleWin(result.winner, result.line);
    } else if (!board.includes(null) && !winner) {
        handleDraw();
    }
  }, [board, calculateWinner, winner, handleWin, handleDraw]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#050214] overflow-hidden relative font-[Outfit]">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--neon-p1)] rounded-full blur-[150px] opacity-15"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--neon-p2)] rounded-full blur-[150px] opacity-15"></div>
      </div>

      <header className="mb-4 z-10 text-center relative w-full flex flex-col items-center">
        <Logo />
        {view === 'GAME' && (
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-semibold tracking-widest uppercase mt-2">
            <span>{gameMode === 'PvP' ? 'Human vs Human' : 'Human vs Bot'}</span>
          </div>
        )}
      </header>

      {view === 'MENU' ? (
        <MainMenu onStartGame={handleStartGame} />
      ) : (
        <div className="z-10 w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            
            {/* Winner Pop-up Card (Centered, not full screen) */}
            {winner && (
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/90 border border-white/20 p-8 rounded-2xl shadow-2xl transform scale-100 animate-in zoom-in duration-300 pointer-events-auto text-center max-w-sm w-full mx-4 glass-panel backdrop-blur-xl">
                        <h2 
                            className={`text-4xl font-black tracking-tighter mb-4 ${winner === 'Draw' ? 'text-white' : (winner === 'X' ? 'text-[var(--neon-p1)]' : 'text-[var(--neon-p2)]')}`}
                        >
                            {winner === 'Draw' ? "DRAW!" : "WINNER!"}
                        </h2>
                        
                        {winner !== 'Draw' && (
                            <div className="flex flex-col items-center mb-6">
                                <div className="text-2xl font-bold text-white mb-1">
                                    {winner === 'X' ? p1Name : p2Name}
                                </div>
                                <div className="text-xs uppercase tracking-widest text-white/50">won this round</div>
                            </div>
                        )}

                        <div className="flex items-center justify-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                            Starting next round...
                        </div>
                    </div>
                </div>
            )}

            <ScoreBoard 
            scores={scores} 
            currentPlayer={currentPlayer} 
            p1Name={p1Name}
            p2Name={p2Name}
            isAiThinking={isAiThinking}
            />

            {/* AI Commentary Bubble */}
            <div className={`h-16 w-full max-w-md mb-4 flex items-center justify-center transition-opacity duration-300 ${aiComment ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-slate-900/90 border border-[var(--neon-p2)] text-white px-4 py-3 rounded-tr-xl rounded-tl-xl rounded-bl-xl text-sm italic shadow-[4px_4px_0px_var(--neon-p1)] max-w-[90%] relative">
                    <span className="text-[var(--neon-p2)] font-bold not-italic mr-2">Bot:</span>
                    "{aiComment}"
                </div>
            </div>

            <Board 
            squares={board} 
            onClick={handleSquareClick}
            winningLine={winningLine}
            isAiTurn={isAiThinking && gameMode === 'PvAI'}
            gameActive={!winner}
            />

            <GameControls 
            resetGame={resetGame} 
            resetScores={resetScores}
            onExit={handleExit}
            />
        </div>
      )}
    </div>
  );
};

export default App;