import { useState, useEffect, useCallback } from 'react';
import PuzzleTile from './PuzzleTile';
import imageUrls from './image_puzzle';
import Leaderboard from './Leaderboard';
import { usePopper } from 'react-popper';
interface LeaderboardEntry {
    name: string;
    moves: number;
}
function PuzzleBoard() {
  const [board, setBoard] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [emptyIndex, setEmptyIndex] = useState<number>(8);
  const [moves, setMoves] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const SIZE = 3;
  const popper = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  const moveTile = useCallback((tileIndex: number)  => {
    if (isSolved) return;

    const newBoard = [...board];
    newBoard[emptyIndex] = newBoard[tileIndex];
    newBoard[tileIndex] = 0;

    setBoard(newBoard);
    setEmptyIndex(tileIndex);
    setMoves(prevMoves => prevMoves + 1);
  }, [board, emptyIndex, isSolved]);

  const shuffleBoard = () => {
    let shuffledBoard = [...board];
    for (let i = shuffledBoard.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledBoard[i], shuffledBoard[j]] = [shuffledBoard[j], shuffledBoard[i]];
    }
    setBoard(shuffledBoard);
    setEmptyIndex(shuffledBoard.indexOf(0));
    setMoves(0);
    setIsSolved(false);
  };

  const isBoardSolved = useCallback(() => {
    const solvedBoard = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    return board.every((value, index) => value === solvedBoard[index]);
  }, [board]);

  useEffect(() => {
    shuffleBoard();
  }, []);

  useEffect(() => {
    setIsSolved(isBoardSolved());
  }, [board, isBoardSolved]);

  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('leaderboardData');
    if (savedLeaderboard) {
      setLeaderboardData(JSON.parse(savedLeaderboard));
    }
  }, []);

  const clearLeaderboard = () => {
    setLeaderboardData([]); 
    localStorage.removeItem('leaderboardData'); 
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSolved) {
      const updatedLeaderboard = [...leaderboardData, { name: playerName, moves }];
      setLeaderboardData(updatedLeaderboard);
      localStorage.setItem('leaderboardData', JSON.stringify(updatedLeaderboard));
      setPlayerName('');
      setIsFormVisible(true); 
      setIsSolved(false); 
    }
  };

  const quickWin = () => {
    setBoard([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    setEmptyIndex(8);
    setMoves(moves);
    setIsSolved(true);
  };
  const toggleLeaderboard = () => {
    setShowLeaderboard(prev => !prev);
  };
  return (
<div>
        <a href="#" onClick={toggleLeaderboard} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {showLeaderboard ? "Скрыть таблицу лидеров" : "Показать таблицу лидеров"}
        </a>
        
        <div>
            <button onClick={shuffleBoard}>Перемешать пазл</button>
            <button onClick={quickWin}>Быстрый выигрыш</button>
        </div>

        {!showLeaderboard ? (
            <>
                <div className="puzzle-board" style={{ display: 'grid', gridTemplateColumns: `repeat(${SIZE}, 1fr)`, width: '150px' }}>
                    {board.map((value, index) => (
                        <PuzzleTile
                            key={index}
                            index={index}
                            emptyIndex={emptyIndex}
                            moveTile={moveTile}
                            size={SIZE}
                            isSolved={isSolved}
                            imageUrl={value === 0 ? '' : imageUrls[value - 1]}
                        />
                    ))}
                </div>
                <p>Шаги: {moves}</p>
                {isSolved && (
                    <div>
                        <p>Вы решили пазл за {moves} шагов!</p>
                        {isFormVisible && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    placeholder="Введите ваше имя"
                                    required
                                />
                                <button type="submit">Добавить в таблицу</button>
                            </form>
                        )}
                    </div>
                )}
            </>
        ) : (
            <Leaderboard data={leaderboardData} onClear={clearLeaderboard} />
        )}
    </div>
  );
}

export default PuzzleBoard;