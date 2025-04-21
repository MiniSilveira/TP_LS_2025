import React, { useState, useRef, useEffect } from "react";
import "./player-setup-modal.css";

export default function PlayerSetupModal({ isOpen, onStart }) {
  const [step, setStep] = useState(1); // Etapa 1 = escolher modo
  const [mode, setMode] = useState(null); // "PVP" ou "CPU"

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [sortedPlayer, setSortedPlayer] = useState(null);
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  const handleModeSelection = (selectedMode) => {
    setMode(selectedMode);
    setStep(2);
  };

  const handleSort = () => {
    if (!name1.trim() || (mode === "PVP" && !name2.trim())) {
      alert("Preenche todos os nomes.");
      return;
    }
  
    if (mode === "PVP" && name1.trim().toLowerCase() === name2.trim().toLowerCase()) {
      alert("Os nomes dos jogadores não podem ser iguais.");
      return;
    }
  
    const result = Math.random() < 0.5 ? "P1" : "P2";
    setSortedPlayer(result);
  };


  const handleStart = () => {
    if (!sortedPlayer) {
      alert("Faz primeiro o sorteio!");
      return;
    }

    const data = {
      P1: name1,
      P2: mode === "PVP" ? name2 : "Computador",
      currentPlayer: sortedPlayer,
      isVsCPU: mode === "CPU"
    };

    onStart(data);
  };

  return (
    <dialog ref={ref} className="player-setup-modal">
      <h2>Início do Jogo</h2>

      {step === 1 && (
        <>
          <p>Escolhe o modo de jogo:</p>
          <button onClick={() => handleModeSelection("PVP")}>1 vs 1</button>
          <button onClick={() => handleModeSelection("CPU")}>Contra o Computador</button>
        </>
      )}

      {step === 2 && (
        <>
          <label>
            Nome do Jogador 1:
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </label>

          {mode === "PVP" && (
            <label>
              Nome do Jogador 2:
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            </label>
          )}

          {!sortedPlayer ? (
            <button onClick={handleSort}>Sortear Jogador Inicial</button>
          ) : (
            <>
              <p>
  🎲 Vai começar:{" "}
  <strong>
    {sortedPlayer === "P1" ? name1 : mode === "PVP" ? name2 : "Computador"}
  </strong>
</p>
<p>
  🧩 Vai jogar com a peça{" "}
  <strong style={{ color: sortedPlayer === "P1" ? "red" : "goldenrod" }}>
    {sortedPlayer === "P1" ? "vermelha 🔴" : "amarela 🟡"}
  </strong>
</p>
<button onClick={handleStart}>Começar Jogo</button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}