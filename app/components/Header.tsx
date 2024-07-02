"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  const isOpen = false;

  return (
    <>
      <div className="fixed top-0 left-0  w-screen h-[50vh]  -z-50 bg-header-gradient"></div>

      <header
        id="header-container"
        className="absolute top-0 left-0  w-full flex items-center justify-between h-[3.5rem] z-50 py-8 px-8 md:px-16"
      >
        <Link href="/" className="font-bold text-[#127C56]">
          Logo.
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex gap-8">
            <li>search</li>

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
          // onClick={openMenu}
          className="flex flex-col gap-2 lg:hidden"
        >
          <div
            className={`w-[1.5em] h-[2px] bg-theme-green rounded-full transition-all duration-300 ease-in-out 
            ${isOpen ? "rotate-45 translate-y-[.55em]" : "transform-none"} 
            `}
          ></div>
          <div
            className={`w-[1.5em] h-[2px] bg-theme-green rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-[-45deg] translate-y-[-.1em]" : "transform-none"
            } `}
          ></div>
        </button>
      </header>
    </>
  );
};

export default Header;
