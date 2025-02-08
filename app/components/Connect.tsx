import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo, useState, useEffect } from "react";
import ProfileIcon from "@/svgs/ProfileIcon";

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
        className="flex items-center rounded-[25px] px-2 py-2 text-accent-green ring-1 ring-accent-green"
      >
        {shortenedAddress && <ProfileIcon width="1.5em" height="1.5em" />}
        <span className="px-2">
          {shortenedAddress ? shortenedAddress : "Connect Wallet"}
        </span>
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-2">
          <div className="grid h-[50vh] max-h-[500px] grid-cols-5">
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
            <div className="col-span-3 flex items-center justify-center px-4">
              <div className="space-y-2">
                <DialogTitle className="font-agrandir text-2xl font-bold">
                  Connect Wallet
                </DialogTitle>
                <p className="text-foreground-secondary">
                  Please choose a wallet you want to connect to TokenGiver.
                  There are several wallet providers.
                </p>
                <div className="thin-scrollbar grid max-h-[270px] grid-cols-4 gap-2 overflow-y-scroll">
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
                          <div className="mb-1 grid h-[100px] w-full place-content-center rounded-[5.3px] bg-[#F7F6F6]">
                            <div className="grid h-[50px] w-[50px] place-content-center">
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
                                        className="h-full w-full dark:hidden"
                                        dangerouslySetInnerHTML={{
                                          __html: connector.icon.light
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
                                        className="hidden h-full w-full dark:block"
                                        dangerouslySetInnerHTML={{
                                          __html: connector.icon.dark
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
                          <span className="inline-block w-[100px] truncate text-center">
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
