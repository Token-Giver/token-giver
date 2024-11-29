"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";
import { ConnectedStarknetWindowObject } from "get-starknet-core";
import {
  connect,
  disconnect,
  TBAStarknetWindowObject,
} from "tokenbound-connectkit";

const ConnectTBAButton = () => {
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState("");
  const {
    isOpen,
    openModal,
    closeModal,
    value,
    selectedOption,
    handleChange,
    handleChangeInput,
    resetInputValues,
  } = useTokenBoundModal();

  const tokenbound = new TokenboundConnector({
    tokenboundAddress: value,
    parentAccountId: selectedOption,
  });

  const connectTBA = async () => {
    const connection = await tokenbound.connect();
    closeModal();
    resetInputValues();

    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);
      setAddress(connection.selectedAddress);
    }
  };

  const disconnectTBA = async () => {
    await tokenbound.disconnect();
    setConnection(undefined);
    setAccount(undefined);
    setAddress("");
  };

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <>
      {!connection ? (
        <button
          className="bg-[#127C56] text-white px-6 py-2 rounded-[25px]"
          onClick={openModal}
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
      {isOpen && (
        <TokenBoundModal
          isOpen={isOpen}
          closeModal={closeModal}
          value={value}
          selectedOption={selectedOption}
          handleChange={handleChange}
          handleChangeInput={handleChangeInput}
          onConnect={connectTBA}
        />
      )}
    </>
  );
};

export default ConnectTBAButton;
