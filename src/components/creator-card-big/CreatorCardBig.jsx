import React from "react";
import fireIcon from "../../assets/creators/fireIcon.svg";
import { Link } from "react-router-dom";

function CreatorCardBig({ name, username, creatorIcon, artwork1, artwork2, artwork3, collectionCount }) {
  return (
    <div className="text-white bg-[#1f163d] w-full max-w-[410px] flex flex-col justify-center items-center rounded-xl overflow-hidden">
      {/* artwork */}
      <div className="w-full px-2 pt-2">
        <div className="flex gap-2 rounded-md overflow-hidden h-[100px] w-full">
        {artwork1 && <img src={artwork1} alt="" className="w-full bg-cover"/>}
        {artwork2 && <img src={artwork2} alt="" className="w-full bg-cover"/>}
        {artwork3 && <img src={artwork3} alt="" className="w-full bg-cover"/>}
        </div>
      </div>
      {/* Logo and content */}
      <div className="mt-[-60px] w-full flex flex-col justify-center items-center gap-4 px-6 pb-6">
        {creatorIcon && (
          <img
            src={creatorIcon}
            alt=""
            className="w-[120px] aspect-square object-cover rounded-full"
          />
        )}
        <h2 className="text-[20px] leading-6 font-bold">{name || 'Unknown Creator'}</h2>
        {username && <p className="text-sm text-gray-400">@{username}</p>}
        {/* Tags */}
        <div className="flex gap-3 text-sm font-medium">
          <div className="flex justify-center items-center gap-2 bg-[#4E47F5] rounded-lg p-2">
            <img src={fireIcon} alt="" />
            <p>Hot</p>
          </div>
          <div className="bg-[#141227] rounded-lg px-3 py-2">
            {collectionCount || 0} Collections
          </div>
        </div>
      <Link to={`/${username}`} className="w-full cursor-pointer">
        <button className="w-full text-[#9A8FFF] border border-[#9A8FFF] rounded-3xl font-medium py-2">
          View Profile &#8594;
        </button>
    </Link>
      </div>
    </div>
  );
}

export default CreatorCardBig;
