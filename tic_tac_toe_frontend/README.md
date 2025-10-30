# Tic Tac Toe — Ocean Professional

A modern, ocean-themed Tic Tac Toe game built with React. Supports Player vs Player and Player vs Computer modes with a simple, strong heuristic AI.

## Features

- Player vs Player and Player vs Computer modes
- Simple AI: win > block > center > corners > sides
- Responsive 3x3 board with accessible buttons
- Game status (current player, winner, draw)
- Move history with time-travel
- Restart/New Game controls
- Ocean Professional theme:
  - Primary: #2563EB (blue)
  - Secondary: #F59E0B (amber)
  - Error: #EF4444
  - Background: #f9fafb
  - Surface: #ffffff
  - Text: #111827
  - Rounded corners, subtle shadows, gradients, smooth transitions

## Getting Started

- npm start
- Open http://localhost:3000

## Structure

- src/styles/theme.css — theme variables and components styling
- src/hooks/useTicTacToe.js — game state and AI
- src/components/Board.js — board grid
- src/components/Square.js — single square
- src/components/Controls.js — mode and player controls
- src/App.js — composition and layout

No backend or environment variables required.
