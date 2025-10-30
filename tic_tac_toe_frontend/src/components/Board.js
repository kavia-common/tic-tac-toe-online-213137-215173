import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board component
 * Renders a 3x3 grid of squares.
 */
export default function Board({ squares, onClick, winningLine }) {
  const renderSquare = (i) => {
    const isWin = winningLine?.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={isWin}
      />
    );
  };

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe grid">
      {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
    </div>
  );
}
