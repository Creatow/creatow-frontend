import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import axios from "axios";
import elixirIcon from "../../assets/navbar/elixirIcon.svg";
import profilePlaceholder from "../../assets/navbar/profilePlaceholder.png";
import chevronDown from "../../assets/navbar/chevronDown.svg";
import { useBlockchain } from "../blockchainProvider";

const NavAccDropdown = ({ handleSignOut }) => {
  return (
    <div className="hidden lg:flex w-fit text-[#9A8FFF] bg-[#151334] border border-[#2B225B] rounded-lg gap-3 p-2">
      <div className="bg-[#150A32] flex justify-center items-center gap-1 rounded-md px-3">
        <p className="text-sm leading-tight font-semibold">500</p>
        <img src={elixirIcon} alt="" className="w-4 aspect-square" />
      </div>
      <div className="w-[1px] min-h-[27px] h-full bg-[#9A8FFF]"></div>
      <div className="relative group">
        <button className="flex justify-center items-center gap-2">
          <img
            src={profilePlaceholder}
            alt=""
            className="rounded-full w-7 aspect-square"
          />
          <p className="text-sm font-semibold tracking-[0.1px]">lofikiss</p>
          <img
            src={chevronDown}
            alt=""
            className="rounded-full w-3 aspect-square"
          />
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-[#151334] border border-[#2B225B] rounded-lg shadow-lg hidden group-hover:block">
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2B225B]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

const ConditionalNavbar = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const { connected, account, signMessage, disconnect } = useWallet();
  const {dropNFT} = useBlockchain();

  useEffect(() => {
    checkAuthStatus();
  }, [connected]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      setIsSignedUp(true);
    } else {
      setIsSignedUp(false);
    }
  };

  const handleSignUp = async () => {
    if (!connected || !account) {
      console.error("Wallet not connected");
      return;
    }
    try {
      const nonce = Math.random().toString(36).substring(2, 15);
      const message = `Sign up for our app: ${nonce}`;
      const signedMessage = await signMessage({
        message: message,
        nonce: nonce,
      });
      const response = await axios.post(
        `http://localhost:3001/api/v1/auth/signup`,
        {
          walletAddress: account.address,
          publicKey: account.publicKey,
          signature: signedMessage.signature,
          message: signedMessage.fullMessage,
        }
      );
      if (response.data.token) {
        localStorage.setItem("jwt_token", response.data.token);
        setIsSignedUp(true);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt_token");
    setIsSignedUp(false);
    disconnect();
  };

  if (!connected) {
    return <WalletSelector />;
  }

  if (connected && !isSignedUp) {
    return (
      <>
      <button className="text-white" onClick={() => dropNFT()}>
        DropNFT
      </button>
      <button
        onClick={handleSignUp}
        className="text-white bg-[#151334] border border-[#2B225B] rounded-lg px-4 py-2"
      >
        Sign Up
      </button>
      </>
    );
  }

  return <NavAccDropdown handleSignOut={handleSignOut} />;
};

export default ConditionalNavbar;
