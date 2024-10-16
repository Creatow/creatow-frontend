import React, { useMemo, useCallback } from "react";
import PropTypes from 'prop-types';
import profilePfp from "../../../assets/profile/profilepfp.png";
import dotsIcon from "../../../assets/profile/dotsIcon.svg";
import pencilIcon2 from "../../../assets/profile/pencilIcon2.svg";
import walletIcon from "../../../assets/profile/walletIcon.svg";
import copyIcon from "../../../assets/profile/copyIcon.svg";
import plusIcon from "../../../assets/profile/FolderPlus.svg";
import sparkIcon from "../../../assets/profile/sparkIcon.svg";

function DashProfileCard({
  name,
  username,
  profilePicture,
  walletAddress,
  joinedDate,
  isCreator,
  sparksEarned,
  subscribersCount,
  collectorsCount,
  viewsCount,
  subscriptionsCount,
  collectiblesCount,
  sparksCount,
  onEditProfile,
  onSubscribe,
  onSpark,
  owner
}) {
  const formattedJoinedDate = useMemo(() => {
    const date = new Date(joinedDate);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }, [joinedDate]);

  const handleCopyWalletAddress = useCallback(() => {
    navigator.clipboard.writeText(walletAddress);
    // You might want to add a toast notification here
  }, [walletAddress]);

  const statsItems = useMemo(() => {
    if (isCreator) {
      return [
        { label: "Total Sparks Earned", value: sparksEarned },
        { label: "Total Subscribers", value: subscribersCount },
        { label: "Total Collectors", value: collectorsCount },
        { label: "Total Views", value: viewsCount }
      ];
    } else {
      return [
        { label: "Subscription", value: subscriptionsCount },
        { label: "Collectibles", value: collectiblesCount },
        { label: "Sparks", value: sparksCount }
      ];
    }
  }, [isCreator, sparksEarned, subscribersCount, collectorsCount, viewsCount, subscriptionsCount, collectiblesCount, sparksCount]);

  return (
    <div className="w-fit h-fit bg-[#151329] text-white p-6 space-y-5 rounded-2xl mt-[-350px] lg:mt-[-80px]">
      <img
        src={profilePicture || profilePfp}
        alt={`${name}'s profile`}
        className="max-w-[254px] aspect-square rounded-md"
      />

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="font-readex-pro text-2xl font-extrabold leading-6">
            {name}
          </p>
          {owner && (
            <button aria-label="More options">
              <img src={dotsIcon} alt="" />
            </button>
          )}
        </div>
        <p className="text-sm opacity-65">Joined {formattedJoinedDate}</p>
      </div>

      <div className="bg-[#201a41] flex justify-between items-center rounded-md p-2">
        <div className="flex gap-2">
          <img src={walletIcon} alt="Wallet" />
          <p className="max-w-[120px] text-sm text-[#9A8FFF] truncate">
            {walletAddress}
          </p>
        </div>
        <button onClick={handleCopyWalletAddress} aria-label="Copy wallet address">
          <img src={copyIcon} alt="Copy" />
        </button>
      </div>

      <div className="pb-8">
        {statsItems.map((item, index) => (
          <div key={item.label} className={`flex justify-between py-3 ${index !== statsItems.length - 1 ? 'border-b border-[#1e1c31]' : ''}`}>
            <p>{item.label}</p>
            <p className="font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {owner && isCreator ? (
          <button
            onClick={onEditProfile}
            className="w-full border border-[#D0AAFF] text-[#D0AAFF] font-medium rounded-lg px-6 py-3"
          >
            <div className="flex justify-center items-center gap-2">
              <img src={pencilIcon2} alt="" width={20} height={20} />
              <p className="font-semibold">Edit your Profile</p>
            </div>
          </button>
        ) : !owner && (
          <>
            <button
              onClick={onSubscribe}
              className="w-full bg-[#D0AAFF] text-black font-medium rounded-lg px-6 py-3"
            >
              <div className="flex justify-center items-center gap-2">
                <img src={plusIcon} alt="" width={20} height={20} className="pt-1" />
                <p className="font-semibold">Subscribe</p>
              </div>
            </button>
            <button
              onClick={onSpark}
              className="w-full border border-[#D0AAFF] text-[#D0AAFF] font-medium rounded-lg px-6 py-3"
            >
              <div className="flex justify-center items-center gap-2">
                <img src={sparkIcon} alt="" width={20} height={20} className="pt-1" />
                <p className="font-semibold">Spark</p>
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

DashProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePicture: PropTypes.string,
  walletAddress: PropTypes.string.isRequired,
  joinedDate: PropTypes.string.isRequired,
  isCreator: PropTypes.bool.isRequired,
  sparksEarned: PropTypes.number,
  subscribersCount: PropTypes.number,
  collectorsCount: PropTypes.number,
  viewsCount: PropTypes.number,
  subscriptionsCount: PropTypes.number,
  collectiblesCount: PropTypes.number,
  sparksCount: PropTypes.number,
  onEditProfile: PropTypes.func,
  onSubscribe: PropTypes.func,
  onSpark: PropTypes.func,
  owner: PropTypes.bool.isRequired
};

export default DashProfileCard;
