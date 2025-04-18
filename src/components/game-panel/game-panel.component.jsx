import React, { useEffect } from "react";
import "./game-panel.css";

export default function GamePanel({ points, setPoints, pointsTop, setPointsTop }) {
  const CELULAS = Array(42).fill(null);

  useEffect(() => {
    const celulas = document.querySelectorAll('.celula');
    if (celulas[0]) celulas[0].classList.add('vermelho');
    if (celulas[1]) celulas[1].classList.add('amarelo');
  }, []);

  const handleCellClick = (index) => {
    // Simular jogada válida
    const newPoints = points + 10;
    setPoints(newPoints);
    if (newPoints > pointsTop) {
      setPointsTop(newPoints);
    }
  };

  return (
    <section id="panel-game">
      <h3 className="sr-only">Tabuleiro do 4 em linha</h3>
      <div id="game">
        {CELULAS.map((_, index) => (
          <div
            key={index}
            className="celula"
            onClick={() => handleCellClick(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}