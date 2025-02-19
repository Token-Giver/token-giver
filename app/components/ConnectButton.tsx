"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useMemo } from "react";

type Props = {
  showButton?: boolean;
};

const ConnectButton = ({ showButton = true }: Props) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  useEffect(() => {
    if (address) {
      document.cookie = `walletAddress=${address}; path=/;`;
    } else {
      document.cookie = `walletAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
  }, [address]);

  return (
    <>
      <button
        onClick={() => {
          const connectPopover = document.querySelector(
            "#connect-modal"
          ) as HTMLElement;
          if (address) {
            disconnect();
            localStorage.removeItem("lastUsedConnector");
          } else {
            // @ts-ignore
            connectPopover.showPopover();
          }
        }}
        className={`border-solid border-[1px] border-theme-green text-theme-green py-2 px-6 rounded-[10px] w-fit justify-self-end self-end ${
          !showButton && "sr-only"
        } `}
      >
        {address ? shortenedAddress : "connect"}
      </button>

      <div
        id="connect-modal"
        popover="auto"
        className={`bg-background p-4 md:p-8 w-[90%] md:min-w-[25rem] md:w-[25vw] max-w-[30rem] h-fit  min-h-[200px] rounded-[10px] mx-auto my-auto`}
      >
        <div className="flex flex-col justify-center gap-8">
          <h5 className="font-bold text-[1.1em]">Choose a wallet:</h5>
          <div className=" flex flex-col gap-4">
            {connectors.map((connector) => {
              return (
                <button
                  popoverTarget="connect-modal"
                  className="bg-theme-green text-white py-2 px-6 rounded-[10px] w-full"
                  onClick={() => {
                    connect({ connector });
                    localStorage.setItem("lastUsedConnector", connector.name);
                  }}
                  key={connector.id}
                >
                  {connector.id}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectButton;
