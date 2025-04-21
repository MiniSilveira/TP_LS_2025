import "./assets/styles/App.css";
import { Header, Footer, ControlPanel, GamePanel } from "./components";
import PlayerPanel from "./components/PlayerPanel/PlayerPanel";
import PlayerSetupModal from "./components/PlayerSetupModal/PlayerSetupModal";
import GameOverModal from "./components/game-over-modal/game-over-modal.component";
import { useState, useEffect } from "react";

export default function App() {
  const COLS = 7;
  const ROWS = 6;

  const createEmptyBoard = () =>
    Array(COLS)
      .fill(null)
      .map(() => Array(ROWS).fill(null));

  const [board, setBoard] = useState(createEmptyBoard());
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

  // Timer apenas após o jogo começar
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

  const handleStartGame = ({ P1, P2, currentPlayer, isVsCPU }) => {
    setPlayer1Name(P1);
    setPlayer2Name(P2);
    setCurrentPlayer(currentPlayer);
    setIsVsCPU(isVsCPU); 
    setShowSetupModal(false);
    setIsGameStarted(true);
  };
  const resetGame = () => {
    setPointsP1(0);
    setPointsP2(0);
    setBoard(createEmptyBoard());
    setCurrentPlayer("temp"); // força trigger no useEffect
    setTimeout(() => setCurrentPlayer("P1"), 0);
    setIsGameOver(false);
    setWinner(null);
    setIsGameStarted(true); // reinicia o jogo após fim
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
        />

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
        />

<GameOverModal
  isOpen={isGameOver}
  points={winner === "P1" ? pointsP1 : winner === "P2" ? pointsP2 : null}
  winner={winner}
  onClose={resetGame}
/>

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