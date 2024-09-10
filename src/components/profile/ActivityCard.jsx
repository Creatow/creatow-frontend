import React from "react";
import newSubscriptionIcon from "../../assets/profile/activities/newSubscription.svg";
import elixirIcon from "../../assets/profile/activities/elixirIcon.svg";

function ActivityCard(props) {
  return (
    <div className="w-full border-b border-[#454448] flex justify-between items-center text-white px-4 py-5">
      {/* Activity type - left aligned */}
      <div className="w-fit flex justify-center items-center gap-4">
        <img
          src={newSubscriptionIcon}
          alt=""
          className="bg-[#1f193d] rounded-xl p-2"
        />
        <p className="font-semibold">{props.type}</p>
      </div>

      {/* Details - right aligned */}
      <div className="flex gap-8">
        {/* Date */}
        <p>{props.date}</p>
        {/* Elixir earned */}
        <div className="min-w-[78px] flex gap-1 items-center justify-end">
          <p>+{props.elixir}</p>
          <img src={elixirIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
