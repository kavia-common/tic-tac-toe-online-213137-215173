import { useEffect, useMemo, useState } from 'react';

const LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diags
];

function calculateWinner(squares) {
  for (const [a,b,c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c] };
    }
  }
  return { winner: null, line: null };
}

function emptyIndices(s) {
  return s.map((v, i) => (v ? null : i)).filter((v) => v !== null);
}

function aiMove(squares, aiMark) {
  // Heuristic: win -> block -> center -> corners -> sides
  const human = aiMark === 'X' ? 'O' : 'X';

  // 1. Win if possible
  for (const i of emptyIndices(squares)) {
    const copy = squares.slice();
    copy[i] = aiMark;
    if (calculateWinner(copy).winner === aiMark) return i;
  }
  // 2. Block human win
  for (const i of emptyIndices(squares)) {
    const copy = squares.slice();
    copy[i] = human;
    if (calculateWinner(copy).winner === human) return i;
  }
  // 3. Take center
  if (!squares[4]) return 4;
  // 4. Corners
  for (const i of [0,2,6,8]) if (!squares[i]) return i;
  // 5. Sides
  for (const i of [1,3,5,7]) if (!squares[i]) return i;
  return null;
}

/**
 * PUBLIC_INTERFACE
 * useTicTacToe
 * Manages Tic Tac Toe game with PvP / PvC support and history.
 */
export function useTicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState('PVC'); // 'PVP' | 'PVC'
  const [playerMark, setPlayerMark] = useState('X'); // human mark when PVC

  const board = history[step];
  const xIsNext = step % 2 === 0;

  const { winner, line: winningLine } = useMemo(() => calculateWinner(board), [board]);

  const currentMark = xIsNext ? 'X' : 'O';

  const draw = !winner && board.every(Boolean);

  const status = winner
    ? `Winner: ${winner}`
    : draw
    ? 'Draw game'
    : `Next player: ${currentMark}`;

  function onSquareClick(i) {
    if (winner || board[i]) return;

    // Disallow human move when it's AI's turn in PVC
    if (mode === 'PVC') {
      const aiMark = playerMark === 'X' ? 'O' : 'X';
      const humanTurn = currentMark === playerMark;
      if (!humanTurn) return;
    }

    const next = board.slice();
    next[i] = currentMark;
    const newHistory = history.slice(0, step + 1).concat([next]);
    setHistory(newHistory);
    setStep(step + 1);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setStep(0);
  }

  function jumpTo(moveIndex) {
    setStep(moveIndex);
  }

  // Trigger AI move when in PVC and it's AI's turn
  useEffect(() => {
    if (mode !== 'PVC') return;
    if (winner) return;

    const aiMark = playerMark === 'X' ? 'O' : 'X';
    const isAITurn = currentMark === aiMark;

    if (isAITurn) {
      const i = aiMove(board, aiMark);
      if (i !== null) {
        const next = board.slice();
        next[i] = aiMark;
        setHistory((h) => h.slice(0, step + 1).concat([next]));
        setStep((s) => s + 1);
      }
    }
  }, [board, currentMark, mode, playerMark, step, winner]);

  // When switching modes or player mark, restart to simplify flow
  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, playerMark]);

  return {
    board,
    xIsNext,
    status,
    winner,
    winningLine,
    onSquareClick,
    restart,
    history,
    jumpTo,
    mode,
    setMode,
    playerMark,
    setPlayerMark,
  };
}
