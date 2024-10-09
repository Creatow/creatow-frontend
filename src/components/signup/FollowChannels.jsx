import React, { useEffect, useState } from "react";
import dummypfp from "../../assets/signup/dummyPfp.png";
import checkIcon from "../../assets/signup/check-icon.svg";
import addIcon from "../../assets/signup/add-icon.svg";

// Dummy channels
const items = [
  { id: 1, name: "Brownfish", description: "Lorem ipsum dolor sit ame" },
  { id: 2, name: "Brownfish", description: "Ut enim ad minim" },
  { id: 3, name: "Brownfish", description: "Buis nostrud exercitation" },
  { id: 4, name: "Brownfish", description: "Excepteur sint" },
];

function FollowChannels({ followedChannels, updateFields }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [category, setCategory] = useState("recommended");

  const handleSelect = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  useEffect(() => {
    updateFields({ followedChannels: selectedItems });
  }, [selectedItems]);
  return (
    <div className="space-y-2">
      <h2 className="text-[32px] font-bold font-readex-pro">Follow Channels</h2>
      <p className="text-sm text-[#D0AAFF]">
        Explore collectibles by following at least three creators, then press
        Next.
      </p>

      {/* Filter buttons */}
      <div className="flex gap-3 pt-6">
        <button
          type="button"
          onClick={() => {
            setCategory("recommended");
          }}
          className={
            (category == "recommended" ? "!bg-[#D0AAFF] !text-black" : "") +
            " text-sm text-[#D0AAFF] font-medium bg-[#1D173C]] px-3 py-2 rounded-md"
          }
        >
          Recommended
        </button>
        <button
          type="button"
          onClick={() => {
            setCategory("crypto");
          }}
          className={
            (category == "crypto" ? "!bg-[#D0AAFF] !text-black" : "") +
            " text-sm text-[#D0AAFF] font-medium bg-[#1D173C] px-3 py-2 rounded-md"
          }
        >
          Crypto
        </button>
        <button
          type="button"
          onClick={() => {
            setCategory("digital");
          }}
          className={
            (category == "digital" ? "!bg-[#D0AAFF] !text-black" : "") +
            " text-sm text-[#D0AAFF] font-medium bg-[#1D173C] px-3 py-2 rounded-md"
          }
        >
          Digital
        </button>
        <button
          type="button"
          onClick={() => {
            setCategory("art");
          }}
          className={
            (category == "art" ? "!bg-[#D0AAFF] !text-black" : "") +
            " text-sm text-[#D0AAFF] font-medium bg-[#1D173C] px-3 py-2 rounded-md"
          }
        >
          Art
        </button>
      </div>

      {/* Channels */}
      <div className="pt-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={
              (index == 0 ? "border-t-0" : "border-t") +
              " w-full flex items-center justify-between border-[#D0AAFF73] py-4"
            }
          >
            <div className="flex gap-2">
              <img src={dummypfp} alt="channel-icon" width={38} height={38} />
              <div className="text-sm">
                <p>{item.name}</p>
                <p className="text-[#D0AAFF] text-opacity-45">
                  {item.description}
                </p>
              </div>
            </div>

            <div
              onClick={() => handleSelect(item.id)}
              style={{ cursor: "pointer" }}
            >
              {selectedItems.includes(item.id) ? (
                <img src={checkIcon} alt="check-icon" width={32} height={32} />
              ) : (
                <img src={addIcon} alt="add-icon" width={32} height={32} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowChannels;
