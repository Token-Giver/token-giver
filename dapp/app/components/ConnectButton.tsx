"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo } from "react";

const ConnectButton = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <>
      <button
        onClick={() => {
          if (address) disconnect();
        }}
        popoverTarget={address ? "" : "connect-modal"}
        className="border-solid border-[1px] border-theme-green text-theme-green py-2 px-6 rounded-[10px] w-fit justify-self-end self-end outline-none"
      >
        {address ? shortenedAddress : "connect"}
      </button>

      <div
        id="connect-modal"
        popover="auto"
        className={`bg-off-white p-4 md:p-8 w-[90%] md:min-w-[25rem] md:w-[25vw] max-w-[30rem] h-fit  min-h-[200px] rounded-[10px] mx-auto flex flex-col justify-center gap-8 my-auto`}
      >
        <h5 className="font-bold text-[1.1em]">Choose a wallet:</h5>
        <div className=" flex flex-col gap-4">
          {connectors.map((connector) => {
            return (
              <button
                popoverTarget="connect-modal"
                popoverTargetAction="hide"
                className="bg-theme-green text-white py-2 px-6 rounded-[10px] w-full  "
                onClick={() => {
                  connect({ connector });
                }}
                key={connector.id}
              >
                {connector.id}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ConnectButton;
