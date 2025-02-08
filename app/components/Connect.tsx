import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo, useState, useEffect } from "react";

const Connect = () => {
  const { address, account } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (address) {
      setIsOpen(false);
    }
  }, [address]);

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <>
      <button
        onClick={() => {
          if (address) {
            disconnect();
          } else {
            setIsOpen(true);
          }
        }}
        className="ring-1 ring-accent-green text-accent-green px-2 py-2 rounded-[25px]"
      >
        <span className="px-2">
          {shortenedAddress ? shortenedAddress : "Connect Wallet"}
        </span>
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-2">
          <div className="grid grid-cols-5 h-[50vh] max-h-[500px]">
            <div className="relative col-span-2 overflow-hidden">
              <Image
                src={"/wallet-bg.png"}
                alt=""
                role="presentation"
                className="bg-contain"
                height={300}
                width={300}
              />
            </div>
            <div className="col-span-3 flex justify-center items-center px-4">
              <div className="space-y-2">
                <DialogTitle className="font-bold font-agrandir text-2xl">
                  Connect Wallet
                </DialogTitle>
                <p className="text-foreground-secondary">
                  Please choose a wallet you want to connect to TokenGiver.
                  There are several wallet providers.
                </p>
                <div className="grid grid-cols-4 thin-scrollbar overflow-y-scroll  max-h-[270px] gap-2">
                  {connectors.map((connector) => {
                    if (connector.id && connector.available()) {
                      return (
                        <button
                          className="text-sm"
                          onClick={() => {
                            connect({ connector });
                          }}
                          key={connector.id}
                        >
                          <div className="bg-[#F7F6F6] grid place-content-center  w-full h-[100px] rounded-[5.3px] mb-1 ">
                            <div className="w-[50px]  grid place-content-center h-[50px]">
                              {typeof connector.icon === "string" ? (
                                <img
                                  src={connector.icon}
                                  alt={`${connector.name} icon`}
                                />
                              ) : (
                                <>
                                  {typeof connector.icon.light === "string" ? (
                                    connector.icon.light.startsWith("<svg") ? (
                                      <div
                                        className="dark:hidden w-full h-full"
                                        dangerouslySetInnerHTML={{
                                          __html: connector.icon.light,
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={connector.icon.light}
                                        alt={`${connector.name} light icon`}
                                        className="dark:hidden"
                                      />
                                    )
                                  ) : null}
                                  {typeof connector.icon.dark === "string" ? (
                                    connector.icon.dark.startsWith("<svg") ? (
                                      <div
                                        className="hidden dark:block w-full h-full"
                                        dangerouslySetInnerHTML={{
                                          __html: connector.icon.dark,
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={connector.icon.dark}
                                        alt={`${connector.name} dark icon`}
                                        className="hidden dark:block"
                                      />
                                    )
                                  ) : null}
                                </>
                              )}
                            </div>
                          </div>
                          <span className="inline-block text-center w-[100px] truncate">
                            {connector.name} {connector.available()}
                          </span>
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Connect;
