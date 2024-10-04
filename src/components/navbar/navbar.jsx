import React, { useState } from "react";
import profilePlaceholder from "../../assets/navbar/profilePlaceholder.png";
import elixirIcon from "../../assets/navbar/elixirIcon.svg";
import creatowLogo from "../../assets/navbar/creatowLogo.svg";
import copyIcon from "../../assets/navbar/copyIcon.svg";
import vaultIcon from "../../assets/navbar/vaultIcon.svg";
import signOutIcon from "../../assets/navbar/SignOut.svg";
import exploreIcon from "../../assets/navbar/exploreIcon.svg";
import profileIcon from "../../assets/navbar/profileIcon.svg";
import homeIcon from "../../assets/navbar/homeIcon.svg";
import creatowLogoSmall from "../../assets/navbar/creatowLogoSmall.svg";
import ConditionalNavbar from "./conditionalNavbar";
import Hamburger from "hamburger-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [elixirClaimActive, setElixirClaimActive] = useState(true);

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-[#010314] flex justify-between items-center lg:items-start gap-3 py-2 px-4 md:px-8 lg:h-16">
        {/* Small logo - visible only on mobile */}
        <button className="lg:hidden w-16 overflow-hidden">
          <img
            src={creatowLogoSmall}
            alt="creatow-logo"
            className="w-9 aspect-square mx-auto rounded-full"
          />
        </button>

        {/* Logo and links - visible only on desktop */}
        <div className="hidden lg:flex w-1/3 text-white justify-left items-center gap-8 my-auto">
          <a href="/">
            <img src={creatowLogo} alt="company-logo" />
          </a>
          <a href="">Explore</a>
          <a href="/vault">Vault</a>
        </div>

        {/* Searchbar - always visible */}
        <input
          type="text"
          name=""
          id=""
          placeholder="Collection, item or user"
          className="my-auto lg:w-1/3 w-4/5 max-w-[442px] bg-[#2B225B] bg-search-bar-icon bg-no-repeat bg-[12px_center] rounded-[48px] py-3 px-3 pl-10 text-[#9A8FFF] font-readex-pro text-sm outline-none"
        />

        {/* Hamburger menu - visible only on mobile */}
        <div className="lg:hidden">
          <Hamburger
            toggle={setIsOpen}
            toggled={isOpen}
            color="white"
            size={24}
          />
        </div>

        {/* Elixir count and dropdown - visible only on desktop */}
        <div className="hidden lg:flex w-1/3 justify-end my-auto">
          <ConditionalNavbar elixirClaimActive={elixirClaimActive} setElixirClaimActive={setElixirClaimActive} />
        </div>
      </nav>

      {/* Hamburger menu content */}
      {isOpen && (
        <section className="absolute h-[100dvh] w-full text-white text-sm bg-[#010314] flex basis-full flex-col justify-start items-center p-3">
          {/* elixir count and claim */}
          <div className="w-full bg-[#151334] rounded-lg p-2 space-y-[10px] border border-[#2B225B]">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#130c30] text-[#9A8FFF] font-medium gap-1 px-[11px] py-[7px]">
                <p>5</p>
                <img
                  src={elixirIcon}
                  alt="elixir icon"
                  className="w-[14px] aspect-square"
                />
              </div>
              <div className="h-7 w-[1px] bg-[#9A8FFF]"></div>
              <img
                src={profilePlaceholder}
                alt="profile image"
                className="w-[28px] aspect-square rounded-full"
              />
              <p className="text-[#9A8FFF] font-medium">lofikiss</p>
            </div>
            <div className="flex justify-between bg-[#1F193D] border border-opacity-20 border-[#D0AAFF] p-3 rounded-[4px]">
              <p>Current Balance</p>
              <div className="flex gap-1">
                <p className="text-[#9A8FFF]">5</p>
                <img
                  src={elixirIcon}
                  alt="elixir-icon"
                  width={14}
                  height={14}
                />
              </div>
            </div>
            {!elixirClaimActive && (
              <p className="text-[12px] text-[#FFEAEA] bg-[#6D445C] font-medium text-center rounded-[4px] px-2 py-1">
                Next Claim available 3H 59M 31S
              </p>
            )}
            <button
              disabled={!elixirClaimActive}
              className="w-full px-4 py-3 bg-[#D0AAFF] text-base font-bold text-black rounded-lg disabled:bg-opacity-30"
            >
              Claim Elixir
            </button>
          </div>

          {/* links - pages - utils */}
          <div className="w-full bg-[#151334] rounded-lg overflow-hidden mt-[10px] border border-[#2B225B]">
            <button className="w-full text-left text-[#8C8A94] hover:text-[#A988EE] hover:bg-[#1c1a3a] font-semibold p-3">
              <div className="flex gap-3">
                <img
                  src={profileIcon}
                  alt="profile-icon"
                  width={20}
                  height={20}
                />
                <p>Profile</p>
              </div>
            </button>
            <button className="w-full text-left text-[#8C8A94] hover:text-[#A988EE] hover:bg-[#1c1a3a] font-semibold p-3">
              <div className="flex gap-3">
                <img src={homeIcon} alt="home-icon" width={20} height={20} />
                <p>Home</p>
              </div>
            </button>
            <button className="w-full text-left text-[#8C8A94] hover:text-[#A988EE] hover:bg-[#1c1a3a] font-semibold p-3">
              <div className="flex gap-3">
                <img
                  src={exploreIcon}
                  alt="explore-icon"
                  width={20}
                  height={20}
                />
                <p>Explore</p>
              </div>
            </button>
            <button className="w-full text-left text-[#8C8A94] hover:text-[#A988EE] hover:bg-[#1c1a3a] font-semibold p-3">
              <div className="flex gap-3">
                <img src={vaultIcon} alt="vault-icon" width={20} height={20} />
                <p>Vault</p>
              </div>
            </button>
            <button className="w-full text-left text-[#8C8A94] hover:text-[#A988EE] hover:bg-[#1c1a3a] font-semibold p-3">
              <div className="flex gap-3">
                <img
                  src={copyIcon}
                  alt="copy-address-icon"
                  width={20}
                  height={20}
                />
                <p>Copy Address</p>
              </div>
            </button>
          </div>

          {/* Signout button */}
          <div className="w-full bg-[#151334] rounded-lg overflow-hidden border border-[#2B225B] mt-4">
            <button className="w-full text-left text-[#8C8A94] hover:text-[#A988EE] hover:bg-[#1c1a3a] font-semibold p-3">
              <div className="flex gap-3">
                <img
                  src={signOutIcon}
                  alt="disconnect-icon"
                  width={20}
                  height={20}
                />
                <p>Disconnect</p>
              </div>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Navbar;
