import React, { useRef, useEffect } from "react";
import "./game-over-modal.css";

function GameOverModal({ isOpen, points = 0, winner = "", onClose }) {
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog id="modal-gameOver" ref={ref} onClose={onClose}>
      <div className="estilos">
        <header>
          <span className="closeModal" onClick={onClose}>
            &times;
          </span>
          <div>Jogo Terminado</div>
        </header>
        <div className="info" id="messageGameOver">
          <p>🎉 <strong>{winner}</strong> venceu o jogo!</p>
          <p>Pontuação: {points}</p>
        </div>
        <footer>
          <button onClick={onClose}>Jogar Novamente</button>
          <p>
            <em>© Linguagens Script @ DEIS - ISEC</em>
          </p>
        </footer>
      </div>
    </dialog>
  );
}

export default GameOverModal;