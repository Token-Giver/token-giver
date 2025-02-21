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
      <span className="px-2 truncate">
        {shortenedAddress || "Connect Wallet"}
        </span>
        </button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="min-w-full p-3 sm:min-w-[32rem]  h-screen sm:h-auto rounded-none sm:rounded-lg">
            <div className="grid h-full grid-cols-1 md:grid-cols-5">
              {/* Image Section - Hidden on mobile */}
              <div className="hidden md:block relative col-span-2 overflow-hidden">
                <Image
                src={"/wallet-bg.png"}
                alt=""
                role="presentation"
                className="bg-contain"
                height={300}
                width={300}
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

                <div className=" grid grid-cols-2 gap-3 md:gap-2 md:grid-cols-4 md:max-h-[270px] overflow-y-auto p-1">
                  {connectors.map((connector) => {
                    if (!connector.id || !connector.available()) return null;
                    return (
                    <button
                    key={connector.id}
                    onClick={() => connect({ connector })}
                    className="text-xs md:text-sm transition-all hover:scale-105"
                    >
                    <div className="mb-1 grid w-[120px] h-[120px] md:h-[100px] md:w-[100px] mx-auto place-content-center rounded-md bg-[#F7F6F6] hover:ring-1 hover:ring-accent-green">
                      <div className="grid h-[60px] w-[60px] md:h-[50px] md:w-[50px] place-content-center">
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
                          <span className="inline-block w-full truncate text-[16px] pt-2 pb-2 text-center font-medium">
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