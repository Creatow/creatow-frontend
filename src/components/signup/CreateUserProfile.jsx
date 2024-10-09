import React, { useEffect } from "react";
import avatar1 from "../../assets/signup/Avatar1.svg";

function CreateUserProfile({ TOSAgree, username, avatar, updateFields }) {
  useEffect(() => {
    updateFields({ TOSAgree: true });
  }, []);

  // Dummy avatar images
  const AVATARS = [
    {
      id: "qwe",
      name: "avatar1",
    },
    {
      id: "wer",
      name: "avatar2",
    },
    {
      id: "tyr",
      name: "avatar3",
    },
    {
      id: "sdf",
      name: "avatar4",
    },
    {
      id: "fgh",
      name: "avatar5",
    },
    {
      id: "xcv",
      name: "avatar6",
    },
    {
      id: "ghj",
      name: "avatar7",
    },
    {
      id: "asd",
      name: "avatar8",
    },
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-[32px] font-bold font-readex-pro pb-5 border-b border-[#474558]">
        Create your Profile
      </h2>

      <div className="space-y-5 pt-5">
        {/* Username */}
        <div className="flex flex-col text-sm gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={(e) => updateFields({ username: e.target.value })}
            placeholder="Name"
            id="username"
            className="py-2 px-4 bg-transparent border border-[#474558] rounded-lg"
            value={username}
          />
        </div>

        {/* Avatar selector */}
        <div className="text-sm space-y-5">
          <div className="space-y-1">
            <p>Avatar</p>
            <p className="text-[#D0AAFF]">
              You will be able to turn a collectible into your profile picture
              later!
            </p>
          </div>

          {/* Avatar radios */}
          <div className="grid grid-cols-4 gap-5">
            {AVATARS.map((item) => {
              return (
                <label className="cursor-pointer" key={item.id}>
                  <input
                    onChange={(e) => updateFields({ avatar: e.target.value })}
                    type="radio"
                    name="avatar"
                    className="peer hidden"
                    value={item.name}
                    checked={avatar === item.name}
                  />
                  <div className="aspect-square flex items-center justify-center rounded-lg border border-[#474558] peer-checked:border-white">
                    <img
                      src={avatar1}
                      alt="avatar-icon"
                      width={48}
                      height={48}
                    />
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUserProfile;
