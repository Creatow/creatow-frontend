import React from "react";

function CardFront(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={() => props.setSelectedCard(props.cardNo)}
      className={
        "w-[125px] h-[185px] bg-raffle-card shadow-raffle-card backdrop-blur-[20px] bg-[#5B2FD0] bg-opacity-25 border-[#D0AAFF] border-opacity-35 border rounded-md p-2 transition-all duration-300" +
        " disabled:opacity-25"
      }
    >
      <div className="w-full h-full text-[64px] text-[#69509D] font-semibold flex justify-center items-center border border-black border-opacity-25 rounded-md">
        ?
      </div>
    </button>
  );
}

export default CardFront;
