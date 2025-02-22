"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  OnlydustIcon,
  GithubIcon,
  TelegramIcon,
  XIcon
} from "@/svgs/social.icons";
const Footer = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");
  return (
    <div>
      <div className="my-16 flex max-w-[1100px] flex-col items-start justify-start space-y-6 p-4 md:mx-auto md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="w-full md:w-1/2">
          <div className="flex w-full max-w-[400px] flex-col items-start justify-start space-y-4">
            <h2 className="text-l">
              <span className="font-agrandir">Stay</span> Updated{" "}
            </h2>
            <p className="w-full text-foreground-secondary md:max-w-[80%]">
              Join our community and stay informed about the latest campaigns,
              success stories, and blockchain innovations in fundraising.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start space-x-0 space-y-6 md:w-1/2 md:flex-row md:items-center md:justify-end md:space-x-4 md:space-y-0">
          <input
            className="w-full rounded-[10px] bg-[#FAFAFA] px-6 py-3 ring-1 ring-[#0000000A] placeholder:text-sm"
            placeholder="email address"
            type="text"
            name=""
            id=""
          />
          <button className="w-full rounded-[25px] bg-accent-green px-8 py-3 text-sm font-semibold text-white md:w-auto">
            Subscribe
          </button>
        </div>
      </div>
      <div className="mx-auto mb-16 flex max-w-[1100px] flex-col items-start justify-start text-[#8E9BAE] md:flex-row md:justify-between">
        <div className="mb-6 w-full md:mb-0 md:max-w-[480px]">
          <Link href="/" className="inline-block w-[12rem]">
            <Image src={"/logo.png"} alt={"logo"} width={2000} height={1342} />
          </Link>
          <p className="w-full px-4 sm:max-w-[80%]">
            Token Giver welcomes you to a platform built on trust, transparency,
            and impact. Let's give smarter, together.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-8 p-4 sm:grid-cols-3 md:p-0">
          <div className="col-span-1 w-full">
            <p className="text-md mb-4 font-semibold text-foreground-primary">
              Company
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <p>About Us</p>
              </li>
              <li>
                <p>Career</p>
              </li>
              <li>
                <p>Contact Us</p>
              </li>
              <li>
                <p>Privacy Policy</p>
              </li>
              <li>
                <p>Terms of Use</p>
              </li>
            </ul>
          </div>
          <div className="col-span-1 w-full">
            <p className="text-md mb-4 font-semibold text-foreground-primary">
              Resources
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <p>Blog</p>
              </li>
              <li>
                <p>Brand</p>
              </li>
              <li>
                <p>FAQ</p>
              </li>
              <li>
                <p>Help and support</p>
              </li>
              <li>
                <p>Terms of Use</p>
              </li>
            </ul>
          </div>
          <div className="col-span-1 w-full">
            <p className="text-md mb-4 font-semibold text-foreground-primary">
              Donate
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <p>Documentation</p>
              </li>
              <li>
                <p>How to start TokenGiver</p>
              </li>
              <li>
                <p>Categories</p>
              </li>
              <li>
                <p>Token Bounty</p>
              </li>
              <li>
                <p>Security</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="w-full bg-[#282828]">
        <div className="mx-auto w-full xl:max-w-[1340px] px-4 py-12 text-white">
          <div className="grid w-full grid-cols-2 gap-2">
            <div className="col-span-2 flex flex-col items-start justify-start space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-3 lg:col-span-1">
              <span className="text-sm">
                Copyright © {new Date().getFullYear()} TokenGiver all rights
                reserved{" "}
              </span>
              <div className="flex space-x-3 text-sm">
                <a href="/">Terms & Condition</a>
                <a href="/">Privacy Policy</a>
              </div>
            </div>
            <div className="col-span-2 flex flex-col items-start justify-start space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:col-span-1">
              <div className="flex w-full items-center justify-start gap-2 lg:justify-center">
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <XIcon />
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <TelegramIcon />
                </a>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <OnlydustIcon />
                </a>
              </div>
              <span className="text-sm">support@tokengiver.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
