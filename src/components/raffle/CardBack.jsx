import React from "react";
import elixirIcon from "../../assets/raffle/elixrIconBig.svg";

function CardBack(props) {
  return (
    <button className="w-[125px] h-[185px] bg-raffle-card shadow-raffle-card backdrop-blur-[20px] bg-[#5B2FD0] bg-opacity-25 border-[#D0AAFF] border-opacity-35 border rounded-md p-2">
      <div className="w-full h-full text-[32px] leading-[38px] text-[#9A8FFF] flex justify-center items-center gap-1 border border-black border-opacity-25 rounded-md">
        <p>{props.elixirValue}</p>
        <img src={elixirIcon} alt="elixir-icon" width={24} height={24} />
      </div>
    </button>
  );
}

export default CardBack;
