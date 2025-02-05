"use client";

import Logo from "@/svgs/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Container from "./util/Container";
import Image from "next/image";
const Footer = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");
  return (
    <div>
      <div>
        <div>
          <h2>Stay Updated</h2>
          <p>
            Join our community and stay informed about the latest campaigns,
            success stories, and blockchain innovations in fundraising.
          </p>
        </div>
        <div>
          <input type="text" name="" id="" />
          <button>subscribe</button>
        </div>
      </div>
      <div className="flex">
        <div>
          <Link href="/" className="w-[10rem]">
            <Image src={"/logo.png"} alt={"logo"} width={2000} height={1342} />
          </Link>
          <p>
            Token Giver welcomes you to a platform built on trust, transparency,
            and impact. Let’s give smarter, together.
          </p>
        </div>
        <div>
          <div>
            <p>company</p>

            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
            </ul>
          </div>
          <div>
            <p>Resources</p>
            <ul>
              <li>FAQ</li>
              <li>Blog</li>
              <li>Help and support</li>
              <li>Terms of Use</li>
            </ul>
          </div>
          <div>
            <p>Donate</p>
            <ul>
              <li>Documentation</li>
              <li>How to get started on token giver</li>
              <li>Categories</li>
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <div className="bg-[#282828] justify-between h-[69px] flex text-white">
          <div className="flex">
            <p>Copyright © 2025 TokenGiver all rights reserved </p>
            <p>Terms & Condition</p>
            <p>Privacy Policy</p>
          </div>
          <div>
            <p>support@tokengiver.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
