"use client"
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core"
import { useEffect, useMemo } from "react"

type Props = {
  showButton?: boolean
}

const ConnectButton = ({ showButton = true }: Props) => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { connectors, connect } = useConnect()

  const shortenedAddress = useMemo(() => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [address])

  useEffect(() => {
    if (address) {
      document.cookie = `walletAddress=${address}; path=/;`
    } else {
      document.cookie = `walletAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    }
  }, [address])

  return (
    <>
      <button
        onClick={() => {
          const connectPopover = document.querySelector("#connect-modal") as HTMLElement
          if (address) {
            disconnect()
            localStorage.removeItem("lastUsedConnector")
          } else {
            // @ts-ignore
            connectPopover.showPopover()
          }
        }}
        className={`border-solid border-[1px] border-theme-green text-theme-green py-2 px-4 sm:px-6 rounded-[10px] w-full sm:w-fit text-sm sm:text-base justify-self-end self-end ${
          !showButton && "sr-only"
        }`}
      >
        {address ? shortenedAddress : "Connect"}
      </button>

      <div
        id="connect-modal"
        popover="auto"
        className="bg-background p-4 sm:p-6 md:p-8 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-[500px] h-fit max-h-[90vh] rounded-[10px] mx-auto my-auto overflow-y-auto"
      >
        <div className="flex flex-col justify-center gap-4 sm:gap-6 md:gap-8">
          <h5 className="font-bold text-base sm:text-lg md:text-xl text-center">Choose a wallet:</h5>
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            {connectors.map((connector) => (
              <button
                popoverTarget="connect-modal"
                className="bg-theme-green text-white py-2 px-4 sm:px-6 rounded-[10px] w-full text-sm sm:text-base transition-colors duration-200 hover:bg-opacity-90"
                onClick={() => {
                  connect({ connector })
                  localStorage.setItem("lastUsedConnector", connector.name)
                }}
                key={connector.id}
              >
                {connector.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ConnectButton