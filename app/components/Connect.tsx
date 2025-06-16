import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo, useState, useEffect } from "react";
import ProfileIcon from "@/svgs/ProfileIcon";

const Connect = ({ className }: { className?: string }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (address) setIsOpen(false);
  }, [address]);

  const shortenedAddress = useMemo(
    () => (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""),
    [address]
  );

  return (
    <>
      <button
        onClick={() => (address ? disconnect() : setIsOpen(true))}
        className={`flex items-center rounded-[25px] px-2 py-2 text-sm text-accent-green ring-1 ring-accent-green ${className}`}
      >
        {shortenedAddress && <ProfileIcon width="1.5em" height="1.5em" />}
        <span className="truncate px-2">
          {shortenedAddress || "Connect Wallet"}
        </span>
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="h-screen rounded-none p-3 sm:h-auto sm:min-w-[32rem] sm:rounded-lg">
          <div className="grid h-full grid-cols-1 md:grid-cols-5">
            <div className="relative col-span-2 hidden overflow-hidden md:block">
              <Image
                src={"/wallet-bg.png"}
                alt=""
                role="presentation"
                className="bg-contain"
                height={300}
                width={300}
              />
            </div>
            <div className="col-span-1 flex items-center justify-center overflow-y-auto px-4 md:col-span-3">
              <div className="w-full space-y-4">
                <DialogTitle className="font-agrandir text-xl font-bold md:text-2xl">
                  Connect Wallet
                </DialogTitle>
                <p className="text-sm text-foreground-secondary md:text-base">
                  Please choose a wallet you want to connect to TokenGiver.
                  There are several wallet providers.
                </p>

                <div className="mx-auto grid w-[70%] grid-cols-1 gap-2 overflow-y-auto p-1 xs:grid-cols-2 md:max-h-[270px] md:w-[100%] md:grid-cols-4 md:gap-2 lg:w-[100%]">
                  {connectors.map((connector) => {
                    if (!connector.id || !connector.available()) return null;
                    return (
                      <button
                        key={connector.id}
                        onClick={() => connect({ connector })}
                        className="text-xs md:text-sm"
                      >
                        <div className="mx-auto mb-1 grid h-[100px] place-content-center rounded-[5.3px] bg-[#F7F6F6] md:h-[100px] md:w-[100px] lg:h-[100px] lg:w-[100px]">
                          <div className="grid h-[60px] w-[60px] place-content-center md:h-[50px] md:w-[50px]">
                            {typeof connector.icon === "string" ? (
                              <img
                                className="w-[50px]"
                                src={connector.icon}
                                alt={`${connector.name} icon`}
                              />
                            ) : (
                              <>
                                {connector.icon.light && (
                                  <div className="h-full w-full dark:hidden">
                                    {connector.icon.light.startsWith("<svg") ? (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: connector.icon.light
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={connector.icon.light}
                                        alt={`${connector.name} light icon`}
                                      />
                                    )}
                                  </div>
                                )}
                                {connector.icon.dark && (
                                  <div className="hidden h-full w-full dark:block">
                                    {connector.icon.dark.startsWith("<svg") ? (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: connector.icon.dark
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={connector.icon.dark}
                                        alt={`${connector.name} dark icon`}
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <span className="inline-block w-full truncate pb-2 pt-2 text-center text-[16px] font-medium">
                          {connector.name}
                        </span>
                      </button>
                    );
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
