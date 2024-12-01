"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";
import {
  connect,
  disconnect,
  TBAStarknetWindowObject,
} from "tokenbound-connectkit";

const ConnectTBAButton = () => {
  // const [connection, setConnection] = useState<TBAStarknetWindowObject>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState("");


  const connectTBA = async () => {
      try {
        const data = await connect({
          tokenboundOptions: {
            chainId: "SN_SEPOLIA",
          }
        });
        console.log(data)
        setAccount(data.wallet);
        setAddress(data.wallet.address);
      } catch (e) {
        console.error(e)
      }
  };

  const disconnectTBA = async () => {
    await disconnect();
  };

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <>
      {!account ? (
        <button
          className="bg-[#127C56] text-white px-6 py-2 rounded-[25px]"
          onClick={connectTBA}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="bg-[#127C56] text-white px-6 py-2 rounded-[25px]"
          onClick={disconnectTBA}
        >
          Disconnect
        </button>
      )}
    </>
  );
};

export default ConnectTBAButton;
