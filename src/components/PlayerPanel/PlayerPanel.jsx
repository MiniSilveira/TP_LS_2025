import React from "react";
import "./PlayerPanel.css";

export default function PlayerPanel({ name, points, isActive }) {
  return (
    <div className={`player-panel ${isActive ? "active" : ""}`}>
      <h2>{name}</h2>
      <p>Pontos: {points}</p>
    </div>
  );
}