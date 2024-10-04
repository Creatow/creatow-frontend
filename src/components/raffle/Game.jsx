import React, { useState } from "react";
import RaffleCard from "./RaffleCard";
import crossIcon from "../../assets/modal/crossIcon.svg";

// Dummy card data
const gameCardsData = [
  {
    id: "qwe",
    elixirValue: 3,
  },
  {
    id: "ert",
    elixirValue: 4,
  },
  {
    id: "rty",
    elixirValue: 5,
  },
];

function Game(props) {
  const [selectedCard, setSelectedCard] = useState(0);
  return (
    <main className="absolute w-screen h-screen left-0 top-0 flex justify-center items-center backdrop-blur-md">
      <section className="relative w-[570px] h-[400px] flex flex-col items-center justify-center bg-raffle-gradient bg-black rounded-2xl">
        {/* Close button */}
        <button
          onClick={() => props.setShowGame(false)}
          className="absolute right-4 top-4"
        >
          <img src={crossIcon} alt="close-button" width={32} height={32} />
        </button>

        {/* Content */}
        <h2 className="font-readex-pro font-bold text-[32px] text-white">
          {selectedCard != 0 ? "Elixr Claimed!" : "Claim Your Daily Elixr"}
        </h2>
        <p className="text-[#D0AAFF] text-sm mt-2">
          {selectedCard != 0
            ? "Come back in 6 hours!"
            : "Test your luck to claim your pink slip!"}
        </p>

        {/* Cards */}
        <div className="flex gap-2 mt-6">
          {gameCardsData.map((item, index) => {
            return (
              <RaffleCard
                key={item.id}
                isFlipped={selectedCard === index + 1}
                setSelectedCard={setSelectedCard}
                cardNo={index + 1}
                disabled={selectedCard != 0}
                elixirValue={item.elixirValue}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Game;
