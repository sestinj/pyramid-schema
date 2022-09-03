import React from "react";
import Web3 from "web3";

export const connectWallet = async (web3: Web3) => {
  try {
    const [wallet] = await web3.eth.requestAccounts();
    return wallet;
  } catch {
    console.log("Failed to connect to wallet.");
  }
};

const web3Context = React.createContext("");

export default web3Context;
