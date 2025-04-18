import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ players, currentPlayer }) => {
  return (
    <div className="scoreboard">
      {players.map((player, index) => (
        <div
          key={index}
          className={`player ${currentPlayer === index ? 'active' : ''}`}
        >
          <span className="name">{player.name}</span>
          <span className="score">{player.score}</span>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;