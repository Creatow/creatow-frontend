import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

function RaffleCard(props) {
  return (
    <>
      <ReactCardFlip isFlipped={props.isFlipped} containerClassName="">
        <CardFront
          setSelectedCard={props.setSelectedCard}
          cardNo={props.cardNo}
          disabled={props.disabled}
        />
        <CardBack elixirValue={props.elixirValue} />
      </ReactCardFlip>
    </>
  );
}

export default RaffleCard;
