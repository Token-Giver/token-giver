"use client";

import Logo from "@/svgs/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Container from "./util/Container";
import GitHubIcon from "@/svgs/GitHubIcon";
import TwitterIcon from "@/svgs/TwitterIcon";
import TelegramIcon from "@/svgs/telegramIcon";
const Footer = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");
  return (
    <footer className={` bg-[#F5F7F8] flex items-center  h-[400px]`}>
      <Container className={` ${isDonationPage ? "hidden" : "block"} `}>
        <div className="flex flex-col gap-8 md:flex-row justify-between  px-8  border border-[#EBEBEB] py-2 rounded-full  lg:px-12 flex-1">
          <div className="hidden lg:block">
            <Link
              href="/"
              className="font-bold text-[#127C56] text-[1.3em] self-start justify-self-start"
            >
              <Logo />
            </Link>
          </div>
          <div className="flex  gap-4">
            <Link href="/" className="text-base">
              Home
            </Link>
            <Link href="/" className="text-base">
              Campaign
            </Link>
            <Link href="/" className="text-base">
              About
            </Link>
            <Link href="/" className="text-base">
              Donate
            </Link>
            <Link href="/" className="text-base">
              Features
            </Link>
          </div>

          <div className="flex justify-center lg:justify-start flex-wrap gap-4 items-center">
            <GitHubIcon />
            <TelegramIcon />
            <TwitterIcon />
          </div>
        </div>

        <div className=" flex justify-center  flex-wrap gap-4 py-[32px] lg:justify-between ">
          <div className="flex  gap-2 items-center text-[#ABABAB] ">
            <p>
              <span>&copy;</span>
              <span>2024 Token Giver.</span>
            </p>
            <span>All rights reserved</span>
          </div>
          <div className="flex  flex-wrap gap-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
