# Blockchain Provider Module Documentation

## Overview
The `BlockchainProvider` module is a React context that integrates with the Aptos blockchain using the Aptos SDK, the Aptos Wallet Adapter, and Axios for making HTTP requests to a sponsor server. This module provides essential blockchain functionalities like creating NFT collections, minting NFTs, updating roles, and interacting with smart contracts deployed on the Aptos network.

## Table of Contents
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Context](#context)
  - [BlockchainContext](#blockchaincontext)
  - [BlockchainProvider](#blockchainprovider)
  - [useBlockchain](#useblockchain)
- [Functions](#functions)
  - [buildTransaction](#buildtransaction)
  - [updateCreator](#updatecreator)
  - [updateAdmin](#updateadmin)
  - [acceptCreator](#acceptcreator)
  - [acceptAdmin](#acceptadmin)
  - [sendToSponsorServer](#sendtosponsorserver)
  - [sendToSponsorServerDrop](#sendtosponsorserverdrop)
  - [createCollection](#createcollection)
  - [dropNFT](#dropnft)
- [Usage](#usage)

---

## Installation
Ensure you have the following dependencies installed in your project.

```bash
npm install @aptos-labs/wallet-adapter-react @aptos-labs/ts-sdk axios
```

## Dependencies
- **React**: A JavaScript library for building user interfaces.
- **@aptos-labs/ts-sdk**: Aptos SDK for TypeScript, enabling interaction with the Aptos blockchain.
- **@aptos-labs/wallet-adapter-react**: React adapter for interacting with Aptos-compatible wallets.
- **Axios**: HTTP client for sending requests to a sponsor server.

## Context

### BlockchainContext
This context provides access to blockchain functionalities such as wallet connection, transaction building, and smart contract interactions on the Aptos blockchain. It is implemented using React's `createContext`.

### BlockchainProvider
The `BlockchainProvider` component wraps the application and provides the blockchain functionalities to its children.

#### Props
- `children`: React components that require access to the blockchain context.

#### Methods provided by `BlockchainProvider`
- **connected**: Boolean indicating whether the wallet is connected.
- **account**: The current user's wallet account details.
- **signAndSubmitTransaction**: A function that signs and submits a transaction using the user's wallet.
- **disconnect**: A function to disconnect the wallet.
- **dropNFT**: A function to mint and distribute NFTs from a specific collection.
- **createCollection**: A function to create a new NFT collection.
- **acceptAdmin**: A function that allows a pending admin to accept admin privileges.
- **acceptCreator**: A function that allows a pending creator to accept the creator role.
- **updateAdmin**: A function for admins to update other admin addresses.
- **updateCreator**: A function for admins to update the creator address.

### useBlockchain
This hook allows components to access the `BlockchainContext` values. Use this hook in any React component to interact with the blockchain functions.

```javascript
const { connected, account, createCollection, dropNFT, ... } = useBlockchain();
```

---

## Functions

### `buildTransaction`
Builds a simple Aptos blockchain transaction using the provided data.

#### Parameters:
- `props`: An array of arguments passed to the transaction (e.g., for creating a collection).

#### Returns:
- A simple transaction object for submission.

#### Usage Example:
```javascript
const transaction = await buildTransaction([description, name, uri, max_supply]);
```

### `updateCreator`
Updates the creator's address. This function requires admin privileges.

#### Parameters:
- `new_creator`: The new creator's address.

#### Returns:
- The transaction hash after the update is confirmed on-chain.

#### Usage Example:
```javascript
await updateCreator("0x123...");
```

### `updateAdmin`
Updates the admin address. This function requires admin privileges.

#### Parameters:
- `new_admin`: The new admin's address.

#### Returns:
- The transaction hash after the update is confirmed on-chain.

#### Usage Example:
```javascript
await updateAdmin("0x456...");
```

### `acceptCreator`
Accepts the pending creator role, allowing the pending creator to officially become the creator.

#### Parameters:
- `accept_creator`: The pending creator's address.

#### Returns:
- The transaction hash after the action is confirmed on-chain.

#### Usage Example:
```javascript
await acceptCreator("0x789...");
```

### `acceptAdmin`
Allows a pending admin to accept admin privileges.

#### Parameters:
- `accept_admin`: The pending admin's address.

#### Returns:
- The transaction hash after the action is confirmed on-chain.

#### Usage Example:
```javascript
await acceptAdmin("0xabc...");
```

### `sendToSponsorServer`
Sends a transaction's byte data to a sponsor server for sponsoring transaction fees (optional).

#### Parameters:
- `transactionBytes`: Byte array of the transaction to be sent to the sponsor server.

#### Returns:
- Data returned by the sponsor server, including the signed transaction and fee payer authenticator.

#### Usage Example:
```javascript
const sponsorResponse = await sendToSponsorServer(transactionBytes);
```

### `sendToSponsorServerDrop`
Sends the NFT drop transaction details (e.g., collection ID, recipients) to the sponsor server for processing.

#### Parameters:
- `collection_obj`: The collection object.
- `receivers`: List of wallet addresses receiving NFTs.
- `pre_mint_amount`: Amount of NFTs to pre-mint for each recipient.

#### Returns:
- Data returned by the sponsor server for the drop.

#### Usage Example:
```javascript
await sendToSponsorServerDrop(collection_obj, receivers, pre_mint_amount);
```

### `createCollection`
Creates a new NFT collection with the specified parameters and sends the transaction to the blockchain.

#### Parameters:
- `description`: The collection's description.
- `name`: The collection's name.
- `uri`: URI for the collection's metadata.
- `max_supply`: Maximum supply of NFTs for the collection.
- `royalty_percentage`: Percentage of royalties for the creator (default is 0).
- `pre_mint_amount`: Amount of NFTs to pre-mint (default is 1).
- `drop_time`: The time at which the collection will be dropped.

#### Returns:
- The transaction hash after the collection is created on-chain.

#### Usage Example:
```javascript
await createCollection(
  "An exclusive NFT collection",
  "My Collection",
  "ipfs://...",
  100,
  5,
  1,
  1681234567
);
```

### `dropNFT`
Sends an NFT drop transaction to the sponsor server for minting and distributing NFTs to the provided recipients.

#### Parameters:
- `collection_obj`: The collection object from which NFTs will be dropped.
- `receivers`: List of recipient wallet addresses.
- `pre_mint_amount`: Number of NFTs to mint for each recipient (default is 1).

#### Returns:
- Response from the sponsor server.

#### Usage Example:
```javascript
await dropNFT(collection_obj, ["0x123...", "0x456..."], 1);
```

---

## Usage

### Basic Usage in a React App

```javascript
import React from "react";
import { BlockchainProvider, useBlockchain } from "./BlockchainProvider";

function App() {
  const { connected, connect, account, createCollection, dropNFT } = useBlockchain();

  const handleCreateCollection = async () => {
    if (!connected) return;

    await createCollection(
      "A unique collection", // description
      "My NFTs",            // name
      "https://example.com", // URI
      100,                  // max supply
      10,                   // royalty percentage
      1,                    // pre-mint amount
      Date.now() / 1000     // drop time
    );
  };

  return (
    <BlockchainProvider>
      <div className="App">
        <h1>Welcome to the Aptos NFT Platform</h1>
        {account ? (
          <div>
            <p>Connected as {account.address}</p>
            <button onClick={handleCreateCollection}>Create Collection</button>
          </div>
        ) : (
          <button onClick={connect}>Connect Wallet</button>
        )}
      </div>
    </BlockchainProvider>
  );
}

export default App;
```

This example sets up a simple application where users can connect their wallet and create a new NFT collection. You can also extend this functionality by adding more interactions such as NFT minting or role management.
