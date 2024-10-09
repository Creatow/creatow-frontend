import React, { useEffect } from "react";
import RaffleCard from "../raffle/RaffleCard";
import { useState } from "react";

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

function ElixirClaim({ setHideNext, elixr, updateFields }) {
  const [selectedCard, setSelectedCard] = useState(0);

  //   Hide/show next button based on card flip state
  useEffect(() => {
    if (selectedCard != 0) {
      updateFields({ elixr: gameCardsData[selectedCard].elixirValue });
      setHideNext(false);
    } else setHideNext(true);
  }, [selectedCard]);

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-[32px] font-bold font-readex-pro">
          {selectedCard != 0 ? "Elixr Claimed!" : "How Elixr Work"}
        </h2>
        <p className="text-sm text-[#D0AAFF]">
          {selectedCard != 0
            ? "Come back in 6 hours!"
            : "Test your luck to claim your pink slip!"}
        </p>
      </div>

      {/* Flip cards */}
      <div className="flex gap-2 pt-6">
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
    </div>
  );
}

export default ElixirClaim;
