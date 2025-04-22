import React from "react";
import "./Top10Modal.css";

export default function Top10Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const top10 = JSON.parse(localStorage.getItem("top10") || "[]");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>TOP 10 Jogadores</h2>
        <ul>
          {top10.length === 0 && <li>Nenhum resultado ainda.</li>}
          {top10.map((entry, index) => (
            <li key={index}>
              {index + 1}. {entry.name} - {entry.score} pontos
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}