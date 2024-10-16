import React from "react";
import calendarIcon from "../../assets/carousel/calendarGray.svg";
import personIcon from "../../assets/carousel/personGray.svg";

function CarouselSlide({ collectionName, creatorUserName, creatorPfp, nftUrl, publishedDate, collectorsCount }) {
  return (
    <div className="w-fit flex flex-col items-center lg:flex-row-reverse lg:items-end lg:justify-center lg:gap-10 text-white p-4 space-y-4 mx-auto">
      <div className="w-full space-y-4">
        <h4 className="w-fit text-[22px] lg:text-4xl font-semibold">{collectionName}</h4>
        <div className="w-fit flex items-center gap-3">
          <a className="w-fit flex items-center gap-3" href={`/${creatorUserName}`}>
            <img src={creatorPfp} alt="" className="w-7 aspect-square rounded-full" />
            <p className="text-sm lg:text-base font-semibold">{creatorUserName}</p>
          </a>
          <div className="w-fit flex items-center gap-1">
            <img src={calendarIcon} alt="" />
            <p className="text-[12px] text-[#a19fb8]">{new Date(publishedDate).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-1">
            <img src={personIcon} alt="" />
            <p className="text-[12px] text-[#a19fb8]">{collectorsCount}</p>
          </div>
        </div>
      </div>
      <img src={nftUrl} alt={collectionName} className="w-full aspect-square max-w-[375px] rounded-lg" />
    </div>
  );
}

export default CarouselSlide;
