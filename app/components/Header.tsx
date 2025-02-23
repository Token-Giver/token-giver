"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import SearchIcon from "@/svgs/SearchIcon";
import Connect from "./Connect";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Hide header on /create route
  if (pathname === "/create") return null;
  if (pathname?.endsWith("/donate")) return null;

  const createCampaign = () => {
    router.push("/create");
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <header className="fixed top-0 z-[50] flex w-screen bg-white">
        <div className="top-0 mx-auto flex w-full max-w-[1536px] items-center justify-between py-2 text-sm lg:px-16">
          <Link href="/" className="w-[10rem]">
            <Image src={"/logo.png"} alt={"logo"} width={300} height={100} />
          </Link>

          <div className="flex items-center justify-end md:hidden">
            <button
              type="button"
              className="h-10 w-12"
              onClick={handleShowMenu}
            >
              <Image
                src={"/menu.svg"}
                width={24}
                height={24}
                alt={"Menu button"}
              />
            </button>
          </div>
          <div className="hidden items-center gap-4 md:flex lg:gap-16">
            <nav className="text-[#8E9BAE]">
              <ul className="flex gap-6 lg:gap-8">
                <li>
                  <Link
                    href={"/search"}
                    className={`flex items-center gap-1 ${
                      pathname === "/search"
                        ? "font-medium text-accent-green"
                        : ""
                    }`}
                  >
                    <span>
                      <SearchIcon />
                    </span>
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/discover"}
                    className={
                      pathname?.startsWith("/discover")
                        ? "font-medium text-accent-green"
                        : ""
                    }
                  >
                    Discover
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/learn"}
                    className={
                      pathname === "/learn"
                        ? "font-medium text-accent-green"
                        : ""
                    }
                  >
                    Get started
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-2 lg:gap-4">
              <Connect />

              <button
                onClick={createCampaign}
                className="rounded-[25px] bg-accent-green px-2 py-2 text-white lg:px-4"
              >
                Start a Campaign
              </button>
            </div>
          </div>
        </div>
      </header>
      {showMenu ? (
        <div className="fixed top-0 z-[99] flex h-full min-h-screen w-screen flex-col justify-start space-y-0 overflow-clip bg-accent-green py-4 md:hidden">
          <div className="flex w-full flex-row items-center justify-between space-x-4">
            <Link href="/" className="w-[10rem]">
              <Image
                src={"/logo-white.png"}
                alt={"logo"}
                width={200}
                height={60}
              />
            </Link>
            <div className="flex items-center justify-end md:hidden">
              <button
                type="button"
                className="h-8 w-10"
                onClick={handleShowMenu}
              >
                <Image
                  src={"/x.svg"}
                  width={16}
                  height={16}
                  alt={"Close button"}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start space-y-6 px-4 py-8">
            <Link
              href={"/explore"}
              className={`flex items-center gap-1 text-xl font-medium text-white`}
            >
              Explore
            </Link>
            <Link
              href={"/search"}
              className={`flex items-center gap-1 text-xl font-medium text-white`}
            >
              Search
            </Link>
            <Link
              href={"/about"}
              className={`flex items-center gap-1 text-xl font-medium text-white`}
            >
              About
            </Link>
            <Link
              href={"/donate"}
              className={`flex items-center gap-1 text-xl font-medium text-white`}
            >
              Donate
            </Link>
            <Link
              href={"/blog"}
              className={`flex items-center gap-1 text-xl font-medium text-white`}
            >
              Blog
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start px-4 space-y-4">
            <div className="text-white">
              <Connect />
            </div>
            <button
              onClick={createCampaign}
              className="w-full max-w-[320px] rounded-[25px] bg-white px-2 py-4 text-center text-xl font-bold text-accent-green lg:px-4"
            >
              Start a Campaign
            </button>
          </div>
          <p className="absolute bottom-8 w-full text-center text-sm font-normal text-white">
            Copyright © 2025 TokenGiver all rights reserved
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
