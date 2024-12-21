"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Icon from "./icons/icon";

const Footer = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");
  return (
    <footer
      className={`flex flex-col justify-center gap-16 h-[405px] lg:px-[100px] text-sm lg:text-base`}
    >
      <div className="flex flex-col lg:flex-row gap-7 items-center lg:border border-tkg-gray-300 rounded-full p-3">
        <div className="hidden lg:block">
          <Icon name="logo_sm" />
        </div>
        <div className="flex-1 flex justify-center">
          <nav className="">
            <ul className="flex gap-5 lg:gap-6 items-center ">
              <li>
                <Link href={"/"} className="">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/explore"} className="">
                  Campaign
                </Link>
              </li>
              <li>
                <Link href={"/learn"}>About</Link>
              </li>
              <li>
                <Link href={"/donate"}>Donate</Link>
              </li>
              <li>
                <Link href={"#"}>Features</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-7">
          <Link
            href={"#"}
            className="h-7 w-7 aspect-square rounded-full bg-tkg-primary flex items-center justify-center"
          >
            <Icon name="github" />
          </Link>
          <Link
            href={"#"}
            className="h-7 w-7 aspect-square rounded-full bg-tkg-primary flex items-center justify-center"
          >
            <Icon name="telegram" />
          </Link>
          <Link
            href={"#"}
            className="h-7 w-7 aspect-square rounded-full bg-tkg-primary flex items-center justify-center"
          >
            <Icon name="twitter" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-7 justify-between items-center">
        <span className="text-gray-400 text-base">
          c2024 Token Giver. All rights reserved
        </span>
        <nav className="">
          <ul className="flex gap-6 items-center">
            <li>
              <Link href={"#"} className="">
                Terms
              </Link>
            </li>
            <li>
              <Link href={"#"}>Privacy</Link>
            </li>
            <li>
              <Link href={"#"}>Cookies</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
