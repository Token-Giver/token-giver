"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import SearchIcon from "@/svgs/SearchIcon";
import Connect from "./Connect";
import HamburgerMenuIcon from "@/svgs/HamburgerMenuIcon";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header on /create route
  if (pathname === "/create") return null;
  if (pathname?.endsWith("/donate")) return null;

  const createCampaign = () => {
    router.push("/create");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 z-[50] flex w-screen bg-white">
      <div className="top-0 mx-auto flex w-full max-w-[1536px] items-center justify-between px-4 py-2 text-sm md:px-10 lg:px-16">
        <Link href="/">
          <div className="xTablet:w-[10rem] w-[8rem] max-[800px]:w-[10rem]">
            <Image src={"/logo.png"} alt={"logo"} width={2000} height={1342} />
          </div>
        </Link>

        <div className="xTablet:gap-16 flex items-center gap-8 max-[800px]:hidden">
          <nav className="max-xTablet:text-xs text-[#8E9BAE]">
            <ul className="flex gap-8 max-[850px]:gap-4">
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
                    pathname === "/learn" ? "font-medium text-accent-green" : ""
                  }
                >
                  Get started
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <Connect />

            <button
              onClick={createCampaign}
              className="rounded-[25px] bg-accent-green px-4 py-2 text-white"
            >
              Start a Campaign
            </button>
          </div>
        </div>

        <div onClick={toggleMobileMenu} className="hidden max-[800px]:block">
          <HamburgerMenuIcon />
        </div>
      </div>

      <MobileMenu
        isMenuOpen={isMobileMenuOpen}
        setIsMenuOpen={setIsMobileMenuOpen}
        createCampaign={createCampaign}
        toggleMenu={toggleMobileMenu}
        address={undefined}
        shortenedAddress={""}
        connectWallet={() => {}}
      />
    </header>
  );
};

export default Header;
