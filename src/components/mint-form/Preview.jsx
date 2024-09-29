import React from "react";
import NFTImage from "../../assets/modal/nftImage.png";
import creatorPfp from "../../assets/modal/creatorPfp.png";
import calendarIcon from "../../assets/modal/calendar.svg";
import personIcon from "../../assets/modal/person.svg";

function Preview({ nftImage, nftName, description, category, date, time }) {
  return (
    <>
      <h3 className="text-[24px] lg:text-[32px] font-readex-pro">
        Mint NFT <span className="text-[#817F99]">(Preview)</span>
      </h3>
      <div className="text-white font-readex-pro space-y-6 bg-[#141227] lg:p-8 rounded-xl lg:rounded-2xl lg:mt-6">
        <div className="hidden lg:flex flex-col lg:flex-row lg:gap-8 !overflow-y-scroll">
          {/* Big NFT image */}
          <img
            src={nftImage}
            alt=""
            className="hidden lg:block w-[520px] h-fit aspect-square rounded-lg my-auto"
          />

          {/* Right content - Desktop */}
          <div className="w-full space-y-3">
            {/* ULTIMATE Tag */}
            <div className="w-fit h-[32px] bg-card-tag rounded-lg p-[2px]">
              <div className="w-full h-full bg-black text-white rounded-lg flex justify-center items-center text-[14px] font-semibold px-3">
                {category}
              </div>
            </div>
            {/* NFT Name */}
            <h1 className="text-[40px] font-medium leading-8">{nftName}</h1>
            <div className="flex items-center gap-3">
              {/* Creator name */}
              <div className="flex gap-3">
                <img
                  src={creatorPfp}
                  alt=""
                  className="w-[27px] aspect-square"
                />
                <p className="font-bold">Demarco</p>
              </div>
              {/* Date */}
              <div className="flex gap-1">
                <img src={calendarIcon} alt="" />
                <p className="text-[#94A3B8] text-[12px]">{date}</p>
              </div>
              {/* People */}
              <div className="flex gap-1">
                <img src={personIcon} alt="" />
                <p className="text-[#94A3B8] text-[12px]">1</p>
              </div>
            </div>

            {/* About */}
            <div className="w-full border border-[#d0aaff30] rounded-lg space-y-3 p-5">
              <h3 className="font-medium">About</h3>
              <p className="text-[#94A3B8] text-sm leading-8">{description}</p>
              <p className="text-[#94A3B8] text-[10px] leading-5 mt-3">
                Last updated: {date}
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Mobile */}
        <div className="lg:hidden flex flex-col lg:flex-row gap-8 !overflow-y-scroll">
          {/* Right content */}
          <div className="w-full space-y-3 p-4">
            <div className="w-full space-y-3 bg-gradient-to-b from-[#211f4c] to-[#7921f6] p-3 rounded-lg">
              {/* NFT Name */}
              <h1 className="text-[22px] font-medium leading-8">{nftName}</h1>
              <div className="flex items-center gap-3">
                {/* Creator name */}
                <div className="flex gap-3">
                  <img
                    src={creatorPfp}
                    alt=""
                    className="w-[27px] aspect-square"
                  />
                  <p className="font-bold">Demarco</p>
                </div>
                {/* Date */}
                <div className="flex gap-1">
                  <img src={calendarIcon} alt="" />
                  <p className="text-[#94A3B8] text-[12px]">{date}</p>
                </div>
                {/* People */}
                <div className="flex gap-1">
                  <img src={personIcon} alt="" />
                  <p className="text-[#94A3B8] text-[12px]">1</p>
                </div>
              </div>

              {/* Big NFT image */}
              <img
                src={nftImage}
                alt=""
                className="!w-[320px] h-fit aspect-square rounded-lg mx-auto"
              />
            </div>

            <div className="space-y-3">
              {/* About */}
              <div className="w-full border border-[#d0aaff30] rounded-lg space-y-3 p-5">
                <h3 className="font-medium">About</h3>
                <p className="text-[#94A3B8] text-sm leading-8">
                  {description}
                </p>
                <p className="text-[#94A3B8] text-[10px] leading-5 mt-3">
                  Last updated: {date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;
