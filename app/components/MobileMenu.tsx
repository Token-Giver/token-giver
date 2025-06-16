"use client";
import Logo from "@/svgs/Logo";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import WalletIcon from "@/svgs/WalletIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import LogOutIcon from "@/svgs/LogOutIcon";
import { useDisconnect } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Connect from "./Connect";
const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  createCampaign,
  toggleMenu,
  address,
  connectWallet,
  shortenedAddress
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  createCampaign: () => void;
  toggleMenu: () => void;
  address: string | undefined;
  shortenedAddress: string;
  connectWallet: () => void;
}) => {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
      }}
      className={`fixed left-0 top-0 z-[9999] h-screen w-screen max-[800px]:block ${
        isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
      } hidden`}
    >
      {/* Background overlay */}
      <div
        className={`absolute inset-0 bg-[#00594C] transition-opacity duration-700 motion-reduce:duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Menu content */}
      <div
        className={`absolute inset-0 flex flex-col p-8 transition-transform duration-700 ease-in-out motion-reduce:duration-300 motion-reduce:ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between">
          <Link href="/">
            <div className="w-[8rem] max-[800px]:w-[10rem] xTablet:w-[10rem]">
              <Image
                src={"/white-logo.png"}
                alt={"logo"}
                width={2000}
                height={1342}
              />
            </div>
          </Link>

          <button
            title="toggle menu"
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center gap-2 text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-8">
          <ul className="flex flex-col gap-8 text-white">
            <li>
              <Link href={"/search"}>Search</Link>
            </li>
            <li>
              <Link href={"/discover"}>Discover</Link>
            </li>
            <li>
              <Link href={"/learn"}>Get Started</Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8 flex w-[90%] flex-col gap-4 xMobile:w-[85%] mobile:w-[60%]">
          <Connect className="border border-white !text-center !text-white max-lgMobile:text-sm" />

          <button
            onClick={createCampaign}
            className="w-full rounded-[25px] bg-white px-6 py-2 text-left font-medium text-accent-green max-lgMobile:text-sm"
          >
            Start a Campaign
          </button>
        </div>

        <p className="fixed bottom-4 left-1/2 w-full -translate-x-1/2 text-center text-white max-xMobile:text-xs">
          Copyright © {new Date().getFullYear()} TokenGiver all rights reserved{" "}
        </p>
      </div>
    </div>
  );
};

export default MobileMenu;
