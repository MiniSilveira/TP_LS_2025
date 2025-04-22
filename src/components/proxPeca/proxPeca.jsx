import React from "react";
import "./proxPeca.css";

export default function proxPeca({ currentPlayer }) {
  return (
    <div className="zonaproxPeca">
      <div className={`peca ${currentPlayer === "P1" ? "vermelho" : "amarelo"}`}></div>
    </div>
  );
}