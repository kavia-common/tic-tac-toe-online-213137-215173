import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square button representing one cell.
 */
export default function Square({ value, onClick, highlight }) {
  const markClass = value === 'X' ? 'x' : value === 'O' ? 'o' : '';
  const winClass = highlight ? 'win' : '';
  return (
    <button
      type="button"
      className={`square ${markClass} ${winClass}`}
      role="gridcell"
      aria-label={`Square ${value ? value : 'empty'}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
