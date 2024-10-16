import React from "react";
import creatorItems from "../../constants/creatorConstants";
import personIcon from "../../assets/modal/person.svg";

function CreatorCard(props) {
  return (
    <a className="w-fit text-white font-medium font-readex-pro flex items-center gap-2" href={props.href}>
      <p className="text-sm text-[#94A3B8]">{props.cardNo}</p>
      <img
        src={props.imageURL}
        alt=""
        className="max-w-14 w-1/2 aspect-square ml-1 rounded-full"
      />
      <div>
        <p className="text-sm leading-5 tracking-[0.1px]">
          {props.creatorName}
        </p>
        <div className="w-fit flex justify-center items-center gap-1">
          <img src={personIcon} alt="" />
          <p className="text-[#94A3B8] text-[12px] leading-4 tracking-[0.5px]">
            {props.amount}
          </p>
        </div>
      </div>
    </a>
  );
}

export default CreatorCard;
