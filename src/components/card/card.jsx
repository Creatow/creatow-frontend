import React from "react";
import { Link } from "react-router-dom";
import calendarVector from "../../assets/card/calendar.svg";
import personVector from "../../assets/card/person.svg";
import avatar1 from "../../assets/card/avatar1.png";
import avatar2 from "../../assets/card/avatar2.png";
import optionsIcon from "../../assets/card/optionsIcon.svg";
import heartIcon from "../../assets/card/heartIcon.svg";

const Card = ({
  id,
  creatorName,
  imageURL,
  showAvatars,
  collectionName,
  publishedDate,
  collectors,
  likes
}) => {
  return (
    <Link
      to={`/${creatorName}/${id}`}
      className="w-full max-w-[300px] h-[450px] bg-[#27194E] border border-[#d0aaff30] rounded-2xl p-4 flex flex-col cursor-pointer"
    >
      {/* Top avatars & extra options section - conditionally rendered */}
      {showAvatars && (
        <div className="w-full flex justify-between items-center mb-3 flex-shrink-0">
          <div className="relative flex w-[80%] h-[45px]">
            <img src={avatar1} alt="" className="absolute left-0 border-4 border-[#1e293b] rounded-full h-full" />
            <img src={avatar2} alt="" className="absolute left-[20%] border-4 border-[#1e293b] rounded-full h-full" />
            <img src={avatar1} alt="" className="absolute left-[40%] border-4 border-[#1e293b] rounded-full h-full" />
          </div>
          <button className="h-[18px]">
            <img src={optionsIcon} alt="" className="h-full" />
          </button>
        </div>
      )}

      {/* Main image - takes up maximum available space */}
      <div className="w-full flex-grow overflow-hidden rounded-2xl mb-4">
        <img src={imageURL} alt={collectionName} className="w-full h-full object-cover" />
      </div>

      {/* Bottom content - always at the bottom */}
      <div className="w-full flex-shrink-0">
        <div className="space-y-2 mb-4">
          {/* Image tag
          <div className="w-fit h-[32px] bg-card-tag rounded-lg p-[2px]">
            <div className="w-full h-full bg-black text-white rounded-lg flex justify-center items-center text-[14px] font-semibold px-3">
              ULTIMATE
            </div>
          </div>
          */}
          {/* Card & creator name */}
          <div className="space-y-1">
            <p className="text-white font-semibold leading-[24px] line-clamp-1">
              {collectionName}
            </p>
            <p className="text-[#94A3B8] text-[12px] font-semibold leading-[16px] line-clamp-1">
              {creatorName}
            </p>
          </div>
        </div>

        {/* Creation date & collector count */}
        <div className="text-white flex justify-between items-center">
          <div className="flex gap-4">
            <div className="hidden lg:flex items-center gap-1">
              <img src={calendarVector} alt="" className="w-4 h-4" />
              <p className="text-[12px] leading-[10px] whitespace-nowrap">
                {publishedDate}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img src={personVector} alt="" className="w-4 h-4" />
              <p className="text-[12px] leading-[10px]">{collectors}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <img src={heartIcon} alt="" className="w-4 h-4" />
            <p className="text-[12px] leading-[10px]">{likes}</p>
            {/*can make this likes button which can like the collection on click*/}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
