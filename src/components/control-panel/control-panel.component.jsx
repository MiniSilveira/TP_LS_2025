import React from "react";
import './control-panel.css';

export default function ControlPanel({ points, pointsTop, timer }) {
  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha o Jogo</h3>
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Jogo:</label>
          <select id="btLevel">
            <option value="0">Seleccione...</option>
            <option value="1">Remoto 1x1</option>
            <option value="2">Contra o Computador</option>
          </select>
        </fieldset>
        <button type="button" id="btPlay" onClick={() => console.log("Iniciar jogo")}>
          Iniciar Jogo
        </button>
      </form>

      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Clique em Iniciar o Jogo!
        </p>
        <dl className="list-item left gameStarted">
          <dt>Tempo de Jogo:</dt>
          <dd id="gameTime">{timer}s</dd>
        </dl>
        <dl className="list-item right gameStarted">
          <dt>Pontuação TOP:</dt>
          <dd id="pointsTop">{pointsTop}</dd>
        </dl>
        <dl className="list-item left gameStarted">
          <dt>Pontuação Atual:</dt>
          <dd id="points">{points}</dd>
        </dl>
        <div id="top10" className="right">
          <button id="btTop">Ver TOP 10</button>
        </div>
      </div>
    </section>
  );
}
