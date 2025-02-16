"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import SearchIcon from "@/svgs/SearchIcon";
import Connect from "./Connect";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Hide header on /create route
  if (pathname === "/create") return null;
  if (pathname?.endsWith("/donate")) return null;

  const createCampaign = () => {
    router.push("/create");
  };

  return (
    <header className="fixed top-0 z-[50] flex w-screen bg-white">
      <div className="top-0 mx-auto flex w-full max-w-[1536px] items-center justify-between px-16 py-2 text-sm">
        <Link href="/" className="w-[10rem]">
          <Image src={"/logo.png"} alt={"logo"} width={2000} height={1342} />
        </Link>

        <div className="flex items-center gap-16">
          <nav className="text-[#8E9BAE]">
            <ul className="flex gap-8">
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
                    pathname === "/discover"
                      ? "font-medium text-accent-green"
                      : ""
                  }
                >
                  discover
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
      </div>
    </header>
  );
};

export default Header;
