import React from "react";
import "./game-panel.css";
import {CARDS_LOGOS} from "../../constants/index";
import Card from "./../card/card.component";





function GamePanel() {

    const Arr = CARDS_LOGOS.slice(0, 6).map((ele) => (<Card name={ele} />));
    return (
        <section id="game-panel">
            <h3 className="sr-only">Peças do Jogo</h3>
            <div id="game">
          
              {Arr}
            </div>
        </section>
    )
}

export default GamePanel;