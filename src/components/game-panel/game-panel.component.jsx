import React, { useState, useEffect } from "react";
import "./game-panel.css";

export default function GamePanel({
  board,
  setBoard,
  currentPlayer,
  setCurrentPlayer,
  pointsP1,
  pointsP2,
  setPointsP1,
  setPointsP2,
  pointsTop,
  setPointsTop,
  setIsGameOver,
  setWinner,
  isVsCPU,
  isGameOver,
  specialCells // <- novo prop
}) {
  const COLS = board.length;
  const ROWS = board[0].length;

  const [hoveredCol, setHoveredCol] = useState(null);
  const [lastMove, setLastMove] = useState(null);

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
    if (isGameOver) return;

    const colData = board[col];
    const emptyRow = colData.findIndex(cell => cell === null);
    if (emptyRow === -1) return;

    const newBoard = board.map((colArr, i) =>
      i === col ? [...colArr] : colArr
    );
    newBoard[col][emptyRow] = currentPlayer;
    setBoard(newBoard);
    setLastMove({ col, row: emptyRow });

    const isSpecialCell = specialCells.some(([c, r]) => c === col && r === emptyRow);

    if (checkWin(newBoard, col, emptyRow, currentPlayer)) {
      setWinner(currentPlayer);
      setIsGameOver(true);
      return;
    }

    const isFull = newBoard.every(col => col.every(cell => cell !== null));
    if (isFull) {
      setWinner(null);
      setIsGameOver(true);
      return;
    }

    const pointsToAdd = 10;
    if (currentPlayer === "P1") {
      const newPoints = pointsP1 + pointsToAdd;
      setPointsP1(newPoints);
      if (newPoints > pointsTop) setPointsTop(newPoints);
      if (!isSpecialCell) setCurrentPlayer("P2");
    } else {
      const newPoints = pointsP2 + pointsToAdd;
      setPointsP2(newPoints);
      if (newPoints > pointsTop) setPointsTop(newPoints);
      if (!isSpecialCell) setCurrentPlayer("P1");
    }
  };

  const renderCells = () => {
    const cells = [];
    for (let row = ROWS - 1; row >= 0; row--) {
      for (let col = 0; col < COLS; col++) {
        const value = board[col][row];
        let className = "celula";

        const isLast = lastMove?.col === col && lastMove?.row === row;
        const style = isLast
          ? { "--altura": `${(ROWS - 1 - row) * 70}px` }
          : {};

        if (value === "P1") {
          className += " vermelho";
          if (isLast) className += " animar";
        }

        if (value === "P2") {
          className += " amarelo";
          if (isLast) className += " animar";
        }

        const isSpecial = specialCells.some(([c, r]) => c === col && r === row);
        if (isSpecial) className += " especial";

        cells.push(
          <div
            key={`${col}-${row}`}
            className={className}
            style={style}
            onClick={() => handleColumnClick(col)}
            onMouseEnter={() => setHoveredCol(col)}
            onMouseLeave={() => setHoveredCol(null)}
          />
        );
      }
    }
    return cells;
  };

  useEffect(() => {
    if (isVsCPU && currentPlayer === "P2" && !isGameOver) {
      const timeout = setTimeout(() => {
        makeRandomCPUPlay();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, isVsCPU, isGameOver]);

  const makeRandomCPUPlay = () => {
    const availableCols = board
      .map((col, i) => (col.includes(null) ? i : null))
      .filter((i) => i !== null);

    if (availableCols.length === 0) return;

    const randomCol = availableCols[Math.floor(Math.random() * availableCols.length)];
    handleColumnClick(randomCol);
  };

  return (
    <section id="panel-game">
      <h3 className="sr-only">Tabuleiro do 4 em linha</h3>

      <div className="game-wrapper">
        <div className="hover-preview">
          {hoveredCol !== null && (
            <div
              className={`preview-piece ${currentPlayer === "P1" ? "vermelho" : "amarelo"}`}
              style={{ left: `${hoveredCol * 70 + 25}px` }}
            />
          )}
        </div>

        <div id="game">
          {renderCells()}
        </div>
      </div>
    </section>
  );
}