import "./assets/styles/App.css";
import { Header, Footer, ControlPanel, GamePanel } from "./components";
import { useState, useEffect } from "react";

export default function App() {
  const [pointsP1, setPointsP1] = useState(0);
  const [pointsP2, setPointsP2] = useState(0);
  const [pointsTop, setPointsTop] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(10); // ⏱️ 10s por jogada
  

  // 🕒 Efeito: inicia contagem decrescente a cada jogada
  useEffect(() => {
    if (isGameOver) return; // para o tempo se o jogo acabou
  
    setTimer(10);
  
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          setCurrentPlayer(cp => (cp === "P1" ? "P2" : "P1"));
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [currentPlayer, isGameOver]); 

  return (
    <div id="container" className="game-layout">
      <div className="side-panel">
        <div className="player-panel">
          <h2>P1</h2>
          <p>Pontos: {pointsP1}</p>
        </div>
      </div>

      <main>
        <Header />
        <ControlPanel 
          points={currentPlayer === "P1" ? pointsP1 : pointsP2}
          pointsTop={pointsTop}
          timer={timer} // passa tempo
        />
        <GamePanel
  currentPlayer={currentPlayer}
  setCurrentPlayer={setCurrentPlayer}
  pointsP1={pointsP1}
  pointsP2={pointsP2}
  setPointsP1={setPointsP1}
  setPointsP2={setPointsP2}
  pointsTop={pointsTop}
  setPointsTop={setPointsTop}
  isGameOver={isGameOver}
  setIsGameOver={setIsGameOver}
/>
        <Footer />
      </main>

      <div className="side-panel">
        <div className="player-panel">
          <h2>P2</h2>
          <p>Pontos: {pointsP2}</p>
        </div>
      </div>
    </div>
  );
}


