"use client";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";

const ConnectButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const openModal = () => {
    if (!address) {
      document.body.style.overflow = "hidden";
      setModalOpen(true);
      setTimeout(() => {
        setAnimate(true);
      }, 50);
    } else if (address) {
      disconnect();
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <button
        onClick={openModal}
        className="border-solid border-[1px] border-theme-green text-theme-green py-2 px-6 rounded-[10px] w-fit justify-self-end self-end "
      >
        {address ? shortenedAddress : "connect"}
      </button>
      {modalOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setAnimate(false);
            setTimeout(() => {
              setModalOpen(false);
              document.body.style.overflow = "auto";
            }, 500);
          }}
          className="fixed w-screen bg-[#0000005d] z-[9999]  h-screen  left-0 top-0 flex items-center shadow-hero-shadow "
        >
          <div
            className={`bg-off-white p-4 md:p-8 w-[90%] md:min-w-[25rem] md:w-[25vw] max-w-[30rem] h-fit  min-h-[200px] rounded-[10px] mx-auto flex flex-col justify-center gap-8  ${
              animate
                ? "scale-100 opacity-100 transition-all duration-500"
                : "scale-75 opacity-0 transition-all duration-500"
            }`}
          >
            <h5 className="font-bold text-[1.1em]">Choose a wallet:</h5>
            <div className="">
              {connectors.map((connector) => {
                return (
                  <button
                    className="bg-theme-green text-white py-2 px-6 rounded-[10px] w-full  "
                    onClick={() => {
                      connect({ connector });
                      setModalOpen(false);
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
      )}
    </>
  );
};

export default ConnectButton;
