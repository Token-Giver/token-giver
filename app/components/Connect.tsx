import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo, useState, useEffect } from "react";
import ProfileIcon from "@/svgs/ProfileIcon";

const Connect = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (address) setIsOpen(false);
  }, [address]);

  const shortenedAddress = useMemo(
    () => address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "",
    [address]
  );

  return (
    <>
      <button
        onClick={() => address ? disconnect() : setIsOpen(true)}
        className="flex items-center rounded-[25px] px-2 py-2 text-accent-green ring-1 ring-accent-green"
      >
        {shortenedAddress && <ProfileIcon width="1.5em" height="1.5em" />}
        <span className="px-2">
          {shortenedAddress || "Connect Wallet"}
        </span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-screen h-screen p-2 sm:max-w-2xl sm:h-[50vh] sm:max-h-[500px] rounded-none sm:rounded-lg">
          <div className="grid h-full grid-cols-1 md:grid-cols-5">
            {/* Image Section - Hidden on mobile */}
            <div className="hidden md:block relative col-span-2 overflow-hidden">
              <Image
                src="/wallet-bg.png"
                alt="Wallet Background"
                fill
                className="object-contain"
              />
            </div>

            {/* Content Section */}
            <div className="col-span-1 md:col-span-3 flex items-center justify-center px-4 overflow-y-auto">
              <div className="w-full space-y-4">
                <DialogTitle className="font-agrandir text-xl md:text-2xl font-bold">
                  Connect Wallet
                </DialogTitle>
                <p className="text-sm md:text-base text-foreground-secondary">
                  Please choose a wallet you want to connect to TokenGiver.
                  There are several wallet providers.
                </p>

                <div className="thin-scrollbar grid grid-cols-2 gap-2 md:grid-cols-4 md:max-h-[270px] overflow-y-auto">
                  {connectors.map((connector) => {
                    if (!connector.id || !connector.available()) return null;
                    
                    return (
                      <button
                        key={connector.id}
                        onClick={() => connect({ connector })}
                        className="text-xs md:text-sm"
                      >
                        <div className="mb-1 grid h-16 md:h-[100px] w-full place-content-center rounded-[5.3px] bg-[#F7F6F6]">
                          <div className="grid h-8 w-8 md:h-[50px] md:w-[50px] place-content-center">
                            {typeof connector.icon === "string" ? (
                              <img
                                src={connector.icon}
                                alt={`${connector.name} icon`}
                              />
                            ) : (
                              <>
                                {connector.icon.light && (
                                  <div className="h-full w-full dark:hidden">
                                    {connector.icon.light.startsWith("<svg") ? (
                                      <div dangerouslySetInnerHTML={{ __html: connector.icon.light }} />
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
                                      <div dangerouslySetInnerHTML={{ __html: connector.icon.dark }} />
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
                        <span className="inline-block w-full truncate text-center">
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