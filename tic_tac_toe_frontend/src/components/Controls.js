import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Controls panel
 * - Select game mode (PvP / PvC)
 * - Select player mark (X or O) when in PvC
 * - Restart button (also available in header)
 */
export default function Controls({
  mode,
  setMode,
  playerMark,
  setPlayerMark,
  xIsNext,
  restart,
}) {
  const isPVC = mode === 'PVC';

  return (
    <div>
      <div className="row">
        <strong>Game Mode</strong>
        <div className="segment" role="tablist" aria-label="Game mode">
          <button
            role="tab"
            aria-selected={mode === 'PVP'}
            className={mode === 'PVP' ? 'active' : ''}
            onClick={() => setMode('PVP')}
          >
            Player vs Player
          </button>
          <button
            role="tab"
            aria-selected={mode === 'PVC'}
            className={mode === 'PVC' ? 'active' : ''}
            onClick={() => setMode('PVC')}
          >
            Player vs Computer
          </button>
        </div>
      </div>

      <div className="row" aria-disabled={!isPVC}>
        <strong>Your Mark</strong>
        <div className="segment" aria-label="Choose your mark">
          <button
            className={playerMark === 'X' ? 'active' : ''}
            disabled={!isPVC}
            onClick={() => setPlayerMark('X')}
          >
            X (goes first)
          </button>
          <button
            className={playerMark === 'O' ? 'active' : ''}
            disabled={!isPVC}
            onClick={() => setPlayerMark('O')}
          >
            O
          </button>
        </div>
        {isPVC && (
          <div className="status" role="status" aria-live="polite">
            You are <strong>{playerMark}</strong>. {xIsNext ? 'X' : 'O'} to move.
          </div>
        )}
      </div>

      <div className="row">
        <strong>Actions</strong>
        <div className="controls">
          <button className="btn primary" onClick={restart} aria-label="New game">
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
