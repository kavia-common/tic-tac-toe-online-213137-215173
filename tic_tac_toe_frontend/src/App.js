import React from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import { useTicTacToe } from './hooks/useTicTacToe';

// PUBLIC_INTERFACE
export default function App() {
  /** Root Game container with Ocean Professional layout */
  const {
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
  } = useTicTacToe();

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div className="title">
            Tic Tac Toe
            <span className="badge">Ocean Professional</span>
          </div>
          <div className="controls">
            <button className="btn ghost" onClick={restart} aria-label="Restart game">↻ Restart</button>
          </div>
        </div>
        <div className="layout">
          <section className="board-wrap" aria-label="Game board">
            <div
              className="status"
              role="status"
              aria-live="polite"
            >
              <span className={winner ? 'ok' : 'warn'}>{status}</span>
            </div>
            <Board
              squares={board}
              onClick={onSquareClick}
              winningLine={winningLine}
            />
          </section>
          <aside className="panel" aria-label="Controls and move history">
            <Controls
              mode={mode}
              setMode={setMode}
              playerMark={playerMark}
              setPlayerMark={setPlayerMark}
              xIsNext={xIsNext}
              restart={restart}
            />
            <div className="row">
              <strong>Move History</strong>
              <ul className="history" aria-label="Move history">
                {history.map((_, move) => {
                  const label = move ? `Go to move #${move}` : 'Go to game start';
                  return (
                    <li key={move}>
                      <span>{move ? `Move ${move}` : 'Start'}</span>
                      <button onClick={() => jumpTo(move)} aria-label={label}>{label}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
