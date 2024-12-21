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
import Icon from "./icons/icon";
import Searchbar from "./Searchbar";

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
    <header className="flex items-center justify-between lg:h-[123px] h-[66px] max-w-[1312px] mx-auto pr-5">
      <Link href={"/"}>
        <Icon name="logo" />
      </Link>
      <div className="flex-1 hidden lg:flex justify-center gap-6 items-center">
        <Searchbar />
        <nav className="hidden lg:block">
          <ul className="flex gap-6 items-center">
            <li>
              <Link href={"/explore"} className="">
                Campaign
              </Link>
            </li>
            <li>
              <Link href={"/learn"}>About</Link>
            </li>
            <li>
              <Link href={"/donate"}>Donate</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden lg:flex items-center gap-8">
        <button className="">Join us</button>
        <button className="border border-tkg-primary py-3 px-6 rounded-full text-black max-h-11 leading-none">
          Start Campaign
        </button>
      </div>
      <div className="flex lg:hidden items-center gap-2.5 ">
        <button className="text-tkg-primary">
          <Icon name="lens" />
        </button>
        <button>
          <Icon name="menu" />
        </button>
      </div>
    </header>
  );
};

export default Header;
