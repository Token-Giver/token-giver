"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import MobileMenu from "./MobileMenu";
import Logo from "@/svgs/Logo";
import ProfileIcon from "@/svgs/ProfileIcon";
import { useAccount } from "@starknet-react/core";
import ConnectButton from "./ConnectButton";
import WalletIcon from "@/svgs/WalletIcon";
import UserModal from "./UserModal";

const Header = () => {
  const { address } = useAccount();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserIsMenuOpen] = useState(false);

  const createCampaign = () => {
    router.push("/create");
  };

  const isDonationPage = pathname?.endsWith("/donate");
  const isCreatePage = pathname === "/create";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      if (prev === true) {
        document.body.style.overflow = "auto";
        return !prev;
      } else {
        document.body.style.overflow = "hidden";
        return true;
      }
    });
  };

  const connectWallet = () => {
    setUserIsMenuOpen((prev) => !prev);
    const connectPopover = document.querySelector(
      "#connect-modal"
    ) as HTMLElement;
    if (!address) {
      // @ts-ignore
      connectPopover.showPopover();
    }
  };

  return (
    <>
      <ConnectButton showButton={false} />
      {/* <div className="fixed top-0 left-0  w-screen h-[50vh] -z-50 bg-header-gradient"></div> */}
      <header id="header-container" className="flex">
        <div
          className={`container mx-auto w-full  items-center justify-between h-[3.5rem] z-50 py-8 px-8 ${
            isDonationPage || isCreatePage ? "hidden" : "flex"
          }`}
        >
          <Link href="/" className="font-bold text-[#127C56]  text-[1.2em]">
            <Logo />
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex gap-8">
              <li>
                <Link href={"/search"}>Search</Link>
              </li>
              <li>
                <Link href={"/explore"}>Campaigns</Link>
              </li>

              <li>
                <Link href={"/learn"}>Learn more</Link>
              </li>
            </ul>
          </nav>
          <div className="hidden lg:flex gap-4">
            <div className="relative">
              <button
                onClick={connectWallet}
                className="flex items-center border-solid border-[1px] border-theme-green rounded-[25px] h-full"
              >
                {!address && (
                  <span className="px-2">
                    <WalletIcon />
                  </span>
                )}
                <span className="px-2">
                  {shortenedAddress ? shortenedAddress : "Sign in"}
                </span>
                <span className="bg-[#edf2ee66] rounded-full p-2">
                  <ProfileIcon width="1.2em" height="1.2em" />
                </span>
              </button>
              <UserModal
                setUserIsMenuOpen={setUserIsMenuOpen}
                address={address}
                isUserMenuOpen={isUserMenuOpen}
              />
            </div>
            <button
              onClick={createCampaign}
              className="bg-[#127C56] text-white px-6 py-2 rounded-[25px]"
            >
              Start a Campaign
            </button>
          </div>

          <button
            title="toggle menu"
            onClick={toggleMenu}
            className="flex flex-col gap-2 lg:hidden"
          >
            <div
              className={`w-[1.5em] h-[3px] bg-theme-green rounded-full transition-all duration-300 ease-in-out`}
            ></div>
            <div
              className={`w-[1.5em] h-[3px] bg-theme-green rounded-full transition-all duration-300 ease-in-out `}
            ></div>
          </button>

          <MobileMenu
            createCampaign={createCampaign}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            toggleMenu={toggleMenu}
            address={address}
            connectWallet={connectWallet}
            shortenedAddress={shortenedAddress}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
