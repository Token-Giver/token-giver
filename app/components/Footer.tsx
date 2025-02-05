"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import OnlydustIcon from "@/svgs/OnlydustIcon";
import TelegramIcon from "@/svgs/TelegramIcon";
import GithubIcon from "@/svgs/GithubIcon";
import XIcon from "@/svgs/XIcon";
const Footer = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");
  return (
    <div>
      <div className="flex items-center my-16 max-w-[1100px] justify-between  mx-auto">
        <div className="w-[400px]">
          <h2 className="text-l mb-6">
            <span className="font-agrandir">Stay</span> Updated{" "}
          </h2>
          <p className="text-foreground-secondary">
            Join our community and stay informed about the latest campaigns,
            success stories, and blockchain innovations in fundraising.
          </p>
        </div>
        <div className="flex gap-6">
          <input
            className="w-[423px] h-[45px] px-6 bg-[#FAFAFA] ring-1 ring-[#0000000A] rounded-[10px] placeholder:text-sm"
            placeholder="email address"
            type="text"
            name=""
            id=""
          />
          <button className="bg-accent-green text-white text-sm px-4 py-1 rounded-[25px]">
            subscribe
          </button>
        </div>
      </div>
      <div className="flex justify-between max-w-[1100px] text-[#8E9BAE] mb-16  mx-auto">
        <div className="w-[400px]">
          <Link href="/" className="w-[12rem] inline-block">
            <Image src={"/logo.png"} alt={"logo"} width={2000} height={1342} />
          </Link>
          <p>
            Token Giver welcomes you to a platform built on trust, transparency,
            and impact. Let's give smarter, together.
          </p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="font-medium text-foreground-primary mb-4">company</p>
            <ul className="flex flex-col gap-4">
              <li>
                <p>About Us</p>
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
          <div>
            <p className="font-medium text-foreground-primary mb-4">
              Resources
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <p>FAQ</p>
              </li>
              <li>
                <p>Blog</p>
              </li>
              <li>
                <p>Help and support</p>
              </li>
              <li>
                <p>Terms of Use</p>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground-primary mb-4">Donate</p>
            <ul className="flex flex-col gap-4">
              <li>
                <p>Documentation</p>
              </li>
              <li>
                <p>How to get started on token giver</p>
              </li>
              <li>
                <p>Categories</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <div className="bg-[#282828]">
          <div className="max-w-[1536px] mx-auto items-center p-16 justify-between h-[69px] flex text-white">
            <div className="flex gap-3">
              <p>
                Copyright © {new Date().getFullYear()} TokenGiver all rights
                reserved{" "}
              </p>
              <p>Terms & Condition</p>
              <p>Privacy Policy</p>
            </div>
            <div className="flex items-center gap-2">
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
            <div className="flex items-center">
              <p>support@tokengiver.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
