import React from "react";
import "./card.css"
import {PLACEHOLDER_CARDBACK_PATH} from "../../constants";
import {PLACEHOLDER_CARD_PATH} from "../../constants";



function Card (props){
    return (
        <div className="card flipped" data-logo={props.name}>
            <img src={PLACEHOLDER_CARDBACK_PATH} className="card-back"/>
            <img src={`${PLACEHOLDER_CARD_PATH}${props.name}.png`} className="card-front"/>
        </div>
    )
}


export default Card;