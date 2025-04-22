import "./assets/styles/App.css";
import { Header, Footer, ControlPanel, GamePanel } from "./components";
import PlayerPanel from "./components/PlayerPanel/PlayerPanel";
import PlayerSetupModal from "./components/PlayerSetupModal/PlayerSetupModal";
import GameOverModal from "./components/game-over-modal/game-over-modal.component";
import Top10Modal from "./components/Top10Modal/Top10Modal";
import { useState, useEffect } from "react";
import proxPeca from "./components/proxPeca/proxPeca";

export default function App() {
  const COLS = 7;
  const ROWS = 6;

  const createEmptyBoard = () =>
    Array(COLS)
      .fill(null)
      .map(() => Array(ROWS).fill(null));

  const generateSpecialCells = () => {
    const positions = new Set();
    while (positions.size < 5) {
      const col = Math.floor(Math.random() * COLS);
      const row = Math.floor(Math.random() * ROWS);
      positions.add(`${col},${row}`);
    }
    return [...positions].map(p => p.split(',').map(Number));
  };

  const [board, setBoard] = useState(createEmptyBoard());
  const [specialCells, setSpecialCells] = useState([]);

  const [isVsCPU, setIsVsCPU] = useState(false);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [showSetupModal, setShowSetupModal] = useState(true);

  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [pointsP1, setPointsP1] = useState(0);
  const [pointsP2, setPointsP2] = useState(0);
  const [pointsTop, setPointsTop] = useState(0);

  const [timer, setTimer] = useState(10);

  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const [showTop10, setShowTop10] = useState(false);

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    setTimer(10);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setCurrentPlayer((cp) => (cp === "P1" ? "P2" : "P1"));
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayer, isGameStarted, isGameOver]);

  // Guardar pontuação no TOP 10
  useEffect(() => {
    if (isGameOver && winner) {
      const playerName = winner === "P1" ? player1Name : player2Name;
      const score = winner === "P1" ? pointsP1 : pointsP2;

      const top = JSON.parse(localStorage.getItem("top10") || "[]");

      top.push({ name: playerName, score });
      top.sort((a, b) => b.score - a.score);

      const top10 = top.slice(0, 10);
      localStorage.setItem("top10", JSON.stringify(top10));
    }
  }, [isGameOver]);

  const handleStartGame = ({ P1, P2, currentPlayer, isVsCPU }) => {
    setPlayer1Name(P1);
    setPlayer2Name(P2);
    setCurrentPlayer(currentPlayer);
    setIsVsCPU(isVsCPU);
    setSpecialCells(generateSpecialCells());
    setShowSetupModal(false);
    setIsGameStarted(true);
  };

  const resetGame = () => {
    setPointsP1(0);
    setPointsP2(0);
    setBoard(createEmptyBoard());
    setCurrentPlayer("temp");
    setTimeout(() => setCurrentPlayer("P1"), 0);
    setIsGameOver(false);
    setWinner(null);
    setIsGameStarted(true);
    setSpecialCells(generateSpecialCells());
  };

  return (
    <div id="container" className="game-layout">
      <PlayerSetupModal isOpen={showSetupModal} onStart={handleStartGame} />

      <div className="side-panel">
        <PlayerPanel
          name={player1Name}
          points={pointsP1}
          isActive={currentPlayer === "P1"}
        />
      </div>

      <main>
        <Header />

        <ControlPanel
          points={currentPlayer === "P1" ? pointsP1 : pointsP2}
          pointsTop={pointsTop}
          timer={timer}
          currentPlayerName={currentPlayer === "P1" ? player1Name : player2Name}
          setIsVsCPU={setIsVsCPU}
          setShowTop10={setShowTop10}
        />
        <proxPeca currentPlayer={currentPlayer} />

        <GamePanel
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          pointsP1={pointsP1}
          pointsP2={pointsP2}
          setPointsP1={setPointsP1}
          setPointsP2={setPointsP2}
          pointsTop={pointsTop}
          setPointsTop={setPointsTop}
          setIsGameOver={setIsGameOver}
          setWinner={setWinner}
          isVsCPU={isVsCPU}
          isGameOver={isGameOver}
          specialCells={specialCells}
        />

        <GameOverModal
          isOpen={isGameOver}
          points={winner === "P1" ? pointsP1 : winner === "P2" ? pointsP2 : null}
          winner={winner}
          onClose={resetGame}
        />

        <Top10Modal isOpen={showTop10} onClose={() => setShowTop10(false)} />

        <Footer />
      </main>

      <div className="side-panel">
        <PlayerPanel
          name={player2Name}
          points={pointsP2}
          isActive={currentPlayer === "P2"}
        />
      </div>
    </div>
  );
}