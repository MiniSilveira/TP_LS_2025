import React, { useState } from "react";
import "./game-panel.css";
import GameOverModal from "../game-over-modal/game-over-modal.component";

export default function GamePanel({
  currentPlayer,
  setCurrentPlayer,
  pointsP1,
  pointsP2,
  setPointsP1,
  setPointsP2,
  pointsTop,
  setPointsTop,
  isGameOver,        // ✅ props
  setIsGameOver      // ✅ props
}) {
  const COLS = 7;
  const ROWS = 6;

  const [board, setBoard] = useState(
    Array(COLS).fill(null).map(() => Array(ROWS).fill(null))
  );

  const [winner, setWinner] = useState(null);

  const checkWin = (board, col, row, player) => {
    const directions = [
      { dc: 1, dr: 0 },
      { dc: 0, dr: 1 },
      { dc: 1, dr: 1 },
      { dc: 1, dr: -1 }
    ];
    const inBounds = (c, r) =>
      c >= 0 && c < board.length && r >= 0 && r < board[0].length;

    for (let { dc, dr } of directions) {
      let count = 1;
      for (let dir of [-1, 1]) {
        let i = 1;
        while (
          inBounds(col + dc * i * dir, row + dr * i * dir) &&
          board[col + dc * i * dir][row + dr * i * dir] === player
        ) {
          count++;
          i++;
        }
      }
      if (count >= 4) return true;
    }

    return false;
  };

  const handleColumnClick = (col) => {
    if (isGameOver) return; // Bloqueia jogadas

    const colData = board[col];
    const emptyRow = colData.findIndex(cell => cell === null);
    if (emptyRow === -1) return;

    const newBoard = board.map((colArr, i) =>
      i === col ? [...colArr] : colArr
    );
    newBoard[col][emptyRow] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard, col, emptyRow, currentPlayer)) {
      setWinner(currentPlayer);
      setIsGameOver(true);
      return;
    }

    const pointsToAdd = 10;
    if (currentPlayer === "P1") {
      const newPoints = pointsP1 + pointsToAdd;
      setPointsP1(newPoints);
      if (newPoints > pointsTop) setPointsTop(newPoints);
      setCurrentPlayer("P2");
    } else {
      const newPoints = pointsP2 + pointsToAdd;
      setPointsP2(newPoints);
      if (newPoints > pointsTop) setPointsTop(newPoints);
      setCurrentPlayer("P1");
    }
  };

  const renderCells = () => {
    const cells = [];
    for (let row = ROWS - 1; row >= 0; row--) {
      for (let col = 0; col < COLS; col++) {
        const value = board[col][row];
        let className = "celula";
        if (value === "P1") className += " vermelho";
        if (value === "P2") className += " amarelo";

        cells.push(
          <div
            key={`${col}-${row}`}
            className={className}
            onClick={() => handleColumnClick(col)}
          />
        );
      }
    }
    return cells;
  };

  const resetGame = () => {
    setBoard(Array(COLS).fill(null).map(() => Array(ROWS).fill(null)));
    setIsGameOver(false);
    setWinner(null);
    setPointsP1(0);
    setPointsP2(0);
    setCurrentPlayer("P1");
  };

  return (
    <section id="panel-game">
      <h3 className="sr-only">Tabuleiro do 4 em linha</h3>
      <div id="game">
        {renderCells()}
      </div>
      <GameOverModal
        isOpen={isGameOver}
        points={winner === "P1" ? pointsP1 : pointsP2}
        onClose={resetGame}
      />
    </section>
  );
}