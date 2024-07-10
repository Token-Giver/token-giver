"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
        className={`absolute top-0 left-0  w-full  items-center justify-between h-[3.5rem] z-50 py-8 px-8 md:px-16 ${
          isDonationPage || isCreatePage ? "hidden" : "flex"
        } `}
      >
        <Link href="/" className="font-bold text-[#127C56]  text-[1.2em]">
          <Logo />
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex gap-8">
            <li>search</li>
            <li>
              <Link href={"/campaigns"}>Campaigns</Link>
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

        {/* <div
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
            document.body.style.overflow = "auto";
          }}
          className={`fixed top-0 left-0 w-screen h-screen  bg-off-white  ${
            isMenuOpen ? "block" : "hidden"
          } lg:hidden`}
        >
          <div className="flex flex-col p-8 gap-8 max-w-[700px] mx-auto">
            <button
              title="toggle menu"
              onClick={toggleMenu}
              className=" absolute  right-[2rem] flex flex-col text-theme-green justify-center items-center gap-2 lg:hidden"
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
              <Link href="/" className="font-bold text-[#127C56]  text-[4vw]">
                token giver.
              </Link>
            </div>
            <nav className="">
              <ul className="flex flex-col gap-8">
                <li>search</li>
                <li>
                  <Link href={"/campaigns"}>Campaigns</Link>
                </li>

                <li>
                  <a href="">How it works</a>
                </li>
                <li>
                  <a href="">Contact Us</a>
                </li>
              </ul>
            </nav>
            <div className="w-fit mx-auto">
              <button
                onClick={createCampaign}
                className="bg-[#127C56] text-white px-6 py-2 rounded-[25px]"
              >
                Start a Campaign
              </button>
            </div>
          </div>
        </div> */}
        <MobileMenu
          createCampaign={createCampaign}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggleMenu={toggleMenu}
        />
      </header>
    </>
  );
};

export default Header;
