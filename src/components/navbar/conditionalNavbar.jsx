import React, { useEffect, useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import axios from 'axios';
import elixirIcon from "../../assets/navbar/elixirIcon.svg";
import copyIcon from "../../assets/navbar/copyIcon.svg";
import vaultIcon from "../../assets/navbar/vaultIcon.svg";
import signOutIcon from "../../assets/navbar/SignOut.svg";
import profileIcon from "../../assets/navbar/profileIcon.svg";
import profilePlaceholder from "../../assets/navbar/profilePlaceholder.png";
import chevronDown from "../../assets/navbar/chevronDown.svg";
import Game from '../raffle/Game';

const NavAccDropdown = ({ handleSignOut, elixirClaimActive, setElixirClaimActive }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showClaimElixir, setShowElixir] = useState(false)
  const [showGame, setShowGame] = useState(false)

  function handleElixirClaimGame() {
    setElixirClaimActive(false)
    setShowGame(true)
  }
  
  return (
    <>
      <div className="hidden relative lg:flex w-fit text-[#9A8FFF] bg-[#151334] border border-[#2B225B] rounded-lg gap-3 p-2">
        <div onBlur={() => setShowElixir(false)} onClick={() => setShowElixir(!showClaimElixir)} className="bg-[#150A32] flex justify-center items-center gap-1 rounded-md px-3 cursor-pointer">
          <p className="text-sm leading-tight font-semibold">500</p>
          <img src={elixirIcon} alt="" className="w-4 aspect-square" />
        </div>
        <div className="w-[1px] min-h-[27px] h-full bg-[#9A8FFF]"></div>
        <div className="">
          <button onBlur={() => setIsOpen(false)} onClick={() => {setIsOpen(!isOpen); setShowElixir(false)}} className="flex justify-center items-center gap-2">
            <img src={profilePlaceholder} alt="" className="rounded-full w-7 aspect-square" />
            <p className="text-sm font-semibold tracking-[0.1px]">lofikiss</p>
            <img src={chevronDown} alt="" className={(isOpen ? "rotate-180" : "") + " rounded-full w-3 aspect-square transition-all duration-300"} />
          </button>
          <div className={(isOpen ? "block" : "hidden") + " absolute right-0 mt-2 w-full bg-[#151334] border border-[#2B225B] rounded-lg shadow-lg p-2"}>
            <button className="flex gap-3 items-center w-full text-left px-4 py-2 text-sm text-[#8C8A94] hover:bg-[#2B225B] hover:text-[#A988EE] font-semibold">
              <img src={profileIcon} alt="copy-address-icon" width={20} height={20}  />
              <p>Profile</p>            
            </button>
            <button className="flex gap-3 items-center w-full text-left px-4 py-2 text-sm text-[#8C8A94] hover:bg-[#2B225B] hover:text-[#A988EE] font-semibold">
              <img src={vaultIcon} alt="vault-icon" width={20} height={20} />
              <p>Vault</p>
            </button>
            <button className="flex gap-3 items-center w-full text-left px-4 py-2 text-sm text-[#8C8A94] hover:bg-[#2B225B] hover:text-[#A988EE] font-semibold">
              <img src={copyIcon} alt="copy-address-icon" width={20} height={20}  />
              <p>Copy Address</p>
            </button>
            <button onClick={handleSignOut} className="flex gap-3 items-center w-full text-left mt-5 px-4 py-3 text-sm text-[#8C8A94] border-t border-[#D0AAFF] border-opacity-20 hover:bg-[#2B225B] hover:text-[#A988EE] font-semibold">
              <img src={signOutIcon} alt="copy-address-icon" width={20} height={20}  />
              <p>Disconnect</p>
            </button>
          </div>

          {/* Claim elixir button */}
          <div className={(showClaimElixir ? "block" : "hidden") + " absolute right-0 mt-2 w-full bg-[#151334] border border-[#2B225B] rounded-lg shadow-lg p-2 space-y-2"}>
            <div className='w-full flex justify-between bg-[#1F193D] text-white text-sm font-medium p-3 rounded-[4px]'>
              <p>Current Balance</p>
              <div className='flex items-center gap-1'>
                <p className='text-[#9A8FFF]'>5</p>
                <img src={elixirIcon} alt="elixir-icon" width={14} height={14} />
              </div>
            </div>
            {!elixirClaimActive && (
              <p className='text-[12px] text-[#FFEAEA] bg-[#6D445C] font-medium text-center rounded-[4px] px-2 py-1'>Next Claim available 3H 59M 31S</p>
            )}
            <button onClick={handleElixirClaimGame} disabled={!elixirClaimActive}
              className='w-full font-bold text-black bg-[#D0AAFF] py-3 px-4 rounded-lg disabled:bg-opacity-30 disabled:cursor-not-allowed'>
              Claim Elixir
            </button>
          </div>
        </div>
      </div>
      {showGame && <Game setShowGame={setShowGame}/>}
    </>
      
  );
};

const ConditionalNavbar = (props) => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const { connected, account, signMessage, disconnect } = useWallet();

  useEffect(() => {
    checkAuthStatus();
  }, [connected]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('jwt_token');
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
        nonce: nonce
      });
      const response = await axios.post(`http://localhost:3001/api/v1/auth/signup`, {
        walletAddress: account.address,
        publicKey: account.publicKey,
        signature: signedMessage.signature,
        message: signedMessage.fullMessage
      });
      if (response.data.token) {
        localStorage.setItem('jwt_token', response.data.token);
        setIsSignedUp(true);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt_token');
    setIsSignedUp(false);
    disconnect();
  };

  // if (!connected) {
  //   return <WalletSelector />;
  // }

  // if (connected && !isSignedUp) {
  //   return (
  //     <button onClick={handleSignUp} className="text-white bg-[#151334] border border-[#2B225B] rounded-lg px-4 py-2">
  //       Sign Up
  //     </button>
  //   );
  // }

  return <NavAccDropdown handleSignOut={handleSignOut} elixirClaimActive={props.elixirClaimActive} setElixirClaimActive={props.setElixirClaimActive} />;
};

export default ConditionalNavbar;
