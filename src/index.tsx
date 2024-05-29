import { ChessBoard } from './components/Board/Board';

window.addEventListener('DOMContentLoaded', () => {
  const renderer = new ChessBoard('chessboard', 400, 'white');
  renderer.renderBoard();
});
