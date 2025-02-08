"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import SearchIcon from "@/svgs/SearchIcon";
import Connect from "./Connect";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const createCampaign = () => {
    router.push("/create");
  };

  return (
    <header className="flex fixed top-0 bg-white w-screen z-[50] ">
      <div className="w-full flex top-0 mx-auto justify-between  text-sm px-16 py-2 items-center  max-w-[1536px]">
        <Link href="/" className="w-[10rem]">
          <Image src={"/logo.png"} alt={"logo"} width={2000} height={1342} />
        </Link>

        <div className="flex items-center gap-8">
          <nav className="text-[#8E9BAE]">
            <ul className="flex gap-8">
              <li>
                <Link
                  href={"/explore"}
                  className={pathname === "/explore" ? "text-accent-green" : ""}
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href={"/search"}
                  className={`flex items-center gap-1 ${
                    pathname === "/search" ? "text-accent-green" : ""
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
                  href={"/about"}
                  className={pathname === "/about" ? "text-accent-green" : ""}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={"/learn"}
                  className={pathname === "/learn" ? "text-accent-green" : ""}
                >
                  donate
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <Connect />

            <button
              onClick={createCampaign}
              className="bg-accent-green text-white px-4 py-2 rounded-[25px]"
            >
              Start a Campaign
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
