import { useContext, createContext } from "react";
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";
import {
  Aptos,
  AptosConfig,
  Network,
  Deserializer,
  AccountAuthenticator,
  SimpleTransaction,
} from "@aptos-labs/ts-sdk";

const BlockchainContext = createContext();

const moduleAddress =
  "0x95247dbc3fcf380dd597bd9419d4821f2c70384bff0fa00dd3682716a9195f4f";
const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);

export const BlockchainProvider = ({ children }) => {
  const {
    account,
    connected,
    connect,
    wallet,
    disconnect,
    signAndSubmitTransaction,
    signTransaction,
  } = useWallet();

  const buildTransaction = async (props) => {
    if (!account) throw new Error("Wallet not connected");

    return await aptos.transaction.build.simple({
      sender: account.address,
      withFeePayer: true,
      data: {
        function: `${moduleAddress}::creatow_14::create_collection`,
        functionArguments: [...props],
      },
    });
  };

  const updateCreator = async (new_creator) => {
    const transaction = {
      data: {
        function: `${moduleAddress}::creatow_14::update_creator`,
        functionArguments: [new_creator],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await provider.waitForTransaction(response.hash);
    } catch (error) {
      // console.log(error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const updateAdmin = async (new_admin) => {
    const transaction = {
      data: {
        function: `${moduleAddress}::creatow_14::update_admin`,
        functionArguments: [new_admin],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await provider.waitForTransaction(response.hash);
    } catch (error) {
      // console.log(error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const acceptCreator = async (accept_creator) => {
    const transaction = {
      data: {
        function: `${moduleAddress}::creatow_14::accept_creator`,
        functionArguments: [accept_creator],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await provider.waitForTransaction(response.hash);
    } catch (error) {
      // console.log(error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const acceptAdmin = async (accept_admin) => {
    const transaction = {
      data: {
        function: `${moduleAddress}::creatow_14::accept_admin`,
        functionArguments: [accept_admin],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await provider.waitForTransaction(response.hash);
    } catch (error) {
      // console.log(error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const sendToSponsorServer = async (transactionBytes) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/sponsor-transaction",
        {
          transactionBytes: Array.from(transactionBytes),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending transaction to sponsor server:", error);
      throw error;
    }
  };

  const sendToSponsorServerDrop = async (
    collection_obj,
    receivers,
    pre_mint_amount
  ) => {
    try {
      const response = await axios.post("http://localhost:3002/drop-nft", {
        collectionId: collection_obj,
        receivers: receivers,
        pre_mint_amount: pre_mint_amount,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending transaction to sponsor server:", error);
      throw error;
    }
  };

  const createCollection = async (
    description,
    name,
    uri,
    max_supply,
    royalty_percentage = 0,
    pre_mint_amount = 1,
    drop_time
  ) => {
    const transaction = await buildTransaction([
      description,
      name,
      uri,
      max_supply,
      royalty_percentage,
      pre_mint_amount,
      drop_time,
    ]);
    try {
      const userSignature = await signTransaction(transaction);
      const { sponsorAuthBytes, signedTransaction, sponsorAddress } =
        await sendToSponsorServer(transaction.bcsToBytes());

      const sponsorAuthBytesRe = new Uint8Array(sponsorAuthBytes);
      // deserialize fee payer authenticator
      let deserializer = new Deserializer(sponsorAuthBytesRe);
      const feePayerAuthenticator =
        AccountAuthenticator.deserialize(deserializer);
      console.log(feePayerAuthenticator);

      // Deserialize raw transaction
      const txnbytes = new Uint8Array(signedTransaction);
      deserializer = new Deserializer(txnbytes);
      console.log(deserializer);
      const signedTransactionRe = SimpleTransaction.deserialize(deserializer);

      console.log(transaction);
      console.log(signedTransactionRe);

      const response = await aptos.transaction.submit.simple({
        transaction: signedTransactionRe,
        senderAuthenticator: userSignature,
        feePayerAuthenticator,
      });

      const executedTransaction = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });
      console.log("executed transaction", executedTransaction.hash);
    } catch (error) {
      // console.log(error);
    } finally {
      //   setTransactionInProgress(false);
    }
  };

  const dropNFT = async (collection_obj, receivers, pre_mint_amount = 1) => {
    sendToSponsorServerDrop(collection_obj, receivers, pre_mint_amount);
  };

  return (
    <BlockchainContext.Provider
      value={{
        connected,
        account,
        signAndSubmitTransaction,
        disconnect,
        dropNFT,
        createCollection,
        acceptAdmin,
        acceptCreator,
        updateAdmin,
        updateCreator,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => useContext(BlockchainContext);
