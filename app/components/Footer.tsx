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
      <div className="w-full px-4 md:px-10 lg:px-16">
        <div className="mx-auto my-10 flex w-full max-w-[1100px] justify-between gap-6 max-md:flex-col md:my-16 md:items-center md:gap-8">
          <div className="w-full max-md:max-w-[550px] md:w-[400px]">
            <h2 className="text-l max-lgMobile:text-xl mb-4 md:mb-6">
              <span className="font-agrandir">Stay</span> Updated{" "}
            </h2>
            <p className="text-foreground-secondary">
              Join our community and stay informed about the latest campaigns,
              success stories, and blockchain innovations in fundraising.
            </p>
          </div>
          <div className="xTablet:gap-6 max-mobile:flex-col mobile:gap-4 flex flex-1 gap-6">
            <input
              className="xTablet:w-[380px] h-[45px] w-[320px] rounded-[10px] bg-[#FAFAFA] px-6 ring-1 ring-[#0000000A] placeholder:text-sm max-md:w-full max-md:max-w-[450px] lg:w-[423px]"
              placeholder="email address"
              type="text"
              name=""
              id=""
            />
            <button className="max-mobile:h-[45px] rounded-[25px] bg-accent-green px-4 py-1 text-sm text-white">
              Subscribe
            </button>
          </div>
        </div>

        <div className="max-xTablet:flex-col max-xTablet:gap-8 mx-auto mb-16 flex max-w-[1100px] justify-between text-[#8E9BAE]">
          <div className="xTablet:w-[300px] w-[80%] lg:w-[400px]">
            <Link href="/" className="inline-block w-[12rem]">
              <Image
                src={"/logo.png"}
                alt={"logo"}
                width={2000}
                height={1342}
              />
            </Link>
            <p>
              Token Giver welcomes you to a platform built on trust,
              transparency, and impact. Let's give smarter, together.
            </p>
          </div>

          <div className="max-lgMobile:grid max-lgMobile:grid-cols-2 flex gap-6 lg:gap-8">
            <div className="max-xTablet:flex-1">
              <p className="mb-4 font-medium text-foreground-primary">
                Company
              </p>
              <ul className="flex flex-col gap-4 whitespace-nowrap">
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

            <div className="max-xTablet:flex-1">
              <p className="mb-4 font-medium text-foreground-primary">
                Resources
              </p>
              <ul className="flex flex-col gap-4 whitespace-nowrap">
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

            <div className="max-xTablet:flex-1">
              <p className="mb-4 font-medium text-foreground-primary">Donate</p>
              <ul className="flex flex-col gap-4 whitespace-nowrap">
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
      </div>

      <footer>
        <div className="bg-[#282828]">
          <div className="mx-auto flex h-[69px] max-w-[1536px] justify-between p-16 text-white max-[1090px]:h-fit max-[1090px]:flex-col max-[1090px]:gap-6 max-lg:px-10 max-md:px-4 max-md:py-10 md:items-center">
            <div className="max-lgMobile:flex-col max-lgMobile:gap-6 flex flex-wrap gap-3">
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
