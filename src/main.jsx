import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Collections from "/pages/Collections.jsx";
import Creators from "../pages/Creators.jsx";
import Vault from "../pages/Vault.jsx";
import Profile from "../pages/Profile.jsx";
import Collection from "../pages/Collection.jsx";
import CreatorProfile from "../pages/CreatorProfile.jsx";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { Network } from "lucide-react";
import Footer from "./components/Footer/Footer.jsx";

const wallets = [new PetraWallet()];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/collections",
    element: <Collections />,
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
    path: "/:creatorUsername",
    element: <CreatorProfile/>

  },
  {
    path: "/:creatorUsername/:collectionID",
    element: <Collection/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      optInWallets={["Petra"]}
      dappConfig={{ network: Network.DEVNET }}
      onError={(error) => console.error(error)}
    >
      <RouterProvider router={router} />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);
