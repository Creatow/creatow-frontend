import React from "react";
import "../raffle/raffleCard.css";

function RaffleCard() {

  let card = document.querySelector('.card')
let content = document.querySelector('.content')

card.addEventListener("click", () => {
  content.classList.toggle("flip")
})
  return (
    <div onClick={() => document.querySelector('.content').classList.toggle('flip')} className="card w-[125px] h-[185px] bg-raffle-card shadow-raffle-card bg-[#5B2FD0] bg-opacity-25 border-[#D0AAFF] border-opacity-35 border rounded-md p-2">
      <div className="content w-full h-full">
        {/* Front */}
        <div className="front w-full h-full flex justify-center items-center text-[64px] text-[#69509D] font-bold border border-black border-opacity-25 rounded-md">
          ?
        </div>
        {/* Back */}
        <div className="back w-full h-full flex justify-center items-center text-[64px] text-[#69509D] font-bold border border-black border-opacity-25 rounded-md">
          dsa
        </div>
      </div>
    </div>
  );
}

export default RaffleCard;
