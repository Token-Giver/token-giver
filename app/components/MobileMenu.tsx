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

  const yRef = useRef(100);
  const cRef = useRef(100);
  useEffect(() => {
    let y = yRef.current;
    let c = cRef.current;
    const links = document.querySelector(".mobile-nav");
    const path = document.querySelector(".path");
    let animationFrameId: number;

    const lerp = (start: number, end: number, t: number) => {
      return start * (1 - t) + end * t;
    };

    if (isMenuOpen) {
      setTimeout(() => {
        links?.classList.add("active");
      }, 800);
    } else {
      links?.classList.remove("active");
    }
    const animate = () => {
      if (isMenuOpen) {
        y = +lerp(y, 0, 0.065).toFixed(2);
        c = +lerp(c, 0, 0.085).toFixed(2);
        yRef.current = y;
        cRef.current = c;
        if (y <= 0.1 && c <= 0.1) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
      } else {
        y = +lerp(y, 100, 0.065).toFixed(2);
        c = +lerp(c, 100, 0.085).toFixed(2);
        yRef.current = y;
        cRef.current = c;
        if (y >= 99.93 && c >= 99.93) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
      }

      path?.setAttribute(
        "d",
        `M 0 ${y} L 0 100 100 100 100 ${y} C 50 ${c}, 50 ${c}, 0 ${y}`
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMenuOpen]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setTimeout(() => {
          setIsMenuOpen(false);
          document.body.style.overflow = "auto";
        }, 300);
      }}
      className={`fixed left-0 top-0 z-[9999] h-screen w-screen max-[800px]:block ${
        isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
      } hidden`}
    >
      <svg
        width={"100%"}
        height={"100%"}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute"
      >
        <path
          className="path"
          stroke="#00594C"
          fill="#00594C"
          strokeWidth={"1px"}
          dur={"10s"}
          vectorEffect={"non-scaling-stroke"}
          d={`M 0 100 L 100 100  L 0 100 C 0 0, 0 0, 0 100`}
        />
        <animateMotion dur={"10s"} repeatCount={"indefinite"}>
          <mpath xlinkHref="#path" />
        </animateMotion>
      </svg>
      <div
        className={`mobile-nav max-lgMobile:px-4 relative mx-auto flex max-w-[700px] flex-col gap-8 p-8`}
      >
        <div className="flex justify-between">
          <Link href="/">
            <div className="xTablet:w-[10rem] w-[8rem] max-[800px]:w-[10rem]">
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
        <nav className="">
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
            {/* <li>
              <a href="">Contact Us</a>
            </li> */}
          </ul>
        </nav>

        <div className="mobile:w-[60%] xMobile:w-[85%] mt-4 flex w-[90%] flex-col gap-4">
          {/* {address ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  router.push(`/campaigns/${address}`);
                }}
                className="flex items-center gap-4"
              >
                <span className="">
                  <ProfileIcon width="1em" height="1em" />
                </span>
                <span className="">My Campaigns</span>
              </button>
              <button
                onClick={() => {
                  if (address) {
                    disconnect();
                  }
                }}
                className="flex items-center gap-4"
              >
                <span>
                  <LogOutIcon />
                </span>
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="flex h-full w-full items-center justify-between rounded-[25px] border-[1px] border-solid border-theme-green"
            >
              <span className="px-2">
                <WalletIcon />
              </span>

              <span className="px-2">Sign in</span>
              <span className="rounded-full bg-[#edf2ee66] p-2">
                <ProfileIcon width="1.2em" height="1.2em" />
              </span>
            </button>
          )} */}

          <Connect className="max-lgMobile:text-sm border border-white !text-center !text-white" />

          <button
            onClick={createCampaign}
            className="max-lgMobile:text-sm w-full rounded-[25px] bg-white px-6 py-2 text-left font-medium text-accent-green"
          >
            Start a Campaign
          </button>
        </div>

        <p className="max-xMobile:text-xs fixed bottom-4 left-1/2 w-full -translate-x-1/2 text-center text-white">
          Copyright © {new Date().getFullYear()} TokenGiver all rights
          reserved{" "}
        </p>
      </div>
    </div>
  );
};

export default MobileMenu;
