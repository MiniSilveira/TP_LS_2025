import "./assets/styles/App.css";
import { Header, Footer , ControlPanel, GamePanel } from "./components";
import { useState } from "react";

export default function App() {
  const [points, setPoints] = useState(0);
  const [pointsTop, setPointsTop] = useState(0);

  return (
    <div id="container">
      <Header />
      <main>
        <ControlPanel points={points} pointsTop={pointsTop} />
        <GamePanel 
          points={points} 
          setPoints={setPoints} 
          setPointsTop={setPointsTop} 
        />
      </main>
      <Footer />
    </div>
  );
}

