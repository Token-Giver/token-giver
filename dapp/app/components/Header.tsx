"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import Logo from "@/svgs/Logo";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
      <div className="fixed top-0 left-0  w-screen h-[50vh] -z-50 bg-header-gradient"></div>
      <header
        id="header-container"
        className={`absolute top-0 left-0  w-full   `}
      >
        <div
          className={`container mx-auto w-full  items-center justify-between h-[3.5rem] z-50 py-8 px-8 md:px-16 ${
            isDonationPage || isCreatePage ? "hidden" : "flex"
          }`}
        >
          <Link href="/" className="font-bold text-[#127C56]  text-[1.2em]">
            <Logo />
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex gap-8">
              <li>search</li>
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
          <div className="hidden lg:block">
            <button className="px-6 py-2 rounded-[25px]">Sign in</button>
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
          />
        </div>
      </header>
    </>
  );
};

export default Header;
