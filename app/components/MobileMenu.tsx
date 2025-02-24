"use client";
import Logo from "@/svgs/Logo";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import WalletIcon from "@/svgs/WalletIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import LogOutIcon from "@/svgs/LogOutIcon";
import { useDisconnect } from "@starknet-react/core";
import { useRouter } from "next/navigation";
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
      className={`fixed left-0 top-0 z-[9999] h-screen w-screen ${
        isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
      } lg:hidden`}
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
          stroke="#127C56"
          fill="#fffcf5"
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
        className={`mobile-nav relative mx-auto flex max-w-[700px] flex-col gap-8 p-8`}
      >
        <button
          title="toggle menu"
          onClick={toggleMenu}
          className="absolute right-[2rem] flex flex-col items-center justify-center gap-2 text-theme-green lg:hidden"
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
        <div className="mt-8">
          <Link href="/" className="text-[4vw] font-bold text-[#127C56]">
            <Logo />
          </Link>
        </div>
        <nav className="">
          <ul className="flex flex-col gap-8">
            <li>
              <Link href={"/search"}>Search</Link>
            </li>
            <li>
              <Link href={"/explore"}>Campaigns</Link>
            </li>

            <li>
              <a href="">How it works</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
          </ul>
        </nav>
        <div className="mx-auto flex w-fit flex-col gap-4">
          {address ? (
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
          )}

          <button
            onClick={createCampaign}
            className="rounded-[25px] bg-[#127C56] px-6 py-2 text-white"
          >
            Start a Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
