import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Collectibles from "/pages/Collectibles.jsx";
import Creators from "../pages/Creators.jsx";
import Vault from "../pages/Vault.jsx";
import Profile from "../pages/Profile.jsx";
import NFT from "../pages/NFT.jsx";
import CreatorProfile from "../pages/CreatorProfile.jsx";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { BlockchainProvider } from "./components/blockchainProvider.jsx";

const wallets = [new PetraWallet()];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/collectibles",
    element: <Collectibles />,
  },
  {
    path: "/creators",
    element: <Creators />,
  },
  {
    path: "/vault",
    element: <Vault />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/creator-profile",
    element: <CreatorProfile />,
  },
  {
    path: "/creator/nft/:nftID",
    element: <NFT />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      optInWallets={["Petra"]}
      onError={(error) => console.error(error)}
    >
      <BlockchainProvider>
        <RouterProvider router={router} />
      </BlockchainProvider>
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);
