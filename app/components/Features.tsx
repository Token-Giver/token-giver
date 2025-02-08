"use client";
import GiveIcon from "@/svgs/GiveIcon";
import GrowIcon from "@/svgs/GrowIcon";
import LoveIcon from "@/svgs/LoveIcon";
import { usePathname } from "next/navigation";
import Container from "./util/Container";
import { H2 } from "./util/Headers";
import SendIcon from "@/svgs/SendIcon";
import WalletIcon from "@/svgs/WalletIcon";
import CreateIcon from "@/svgs/CreateIcon";

const Features = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");

  return (
    <section
      className={`${
        isDonationPage ? "hidden" : "block"
      } bg-background px-4 py-10 md:p-10`}
    >
      <Container>
        <div className="mb-[5rem]">
          <H2>Fundraising on token giver only takes a few minutes</H2>
        </div>
        <div
          id="feat-section"
          className="flex flex-col justify-center rounded-[20px] bg-yellow-100 md:flex-row"
        >
          <div className="flex flex-col gap-4 p-4 md:items-center md:justify-center md:p-8 lg:p-12">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-theme-green text-theme-yellow md:h-[80px] md:w-[80px] lg:h-[120px] lg:w-[120px]">
              <WalletIcon width="2em" height="2em" />
            </div>
            <div className="md:text-center">
              <h5 className="mb-2">Connect</h5>
              <p>Connect your wallet</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 md:items-center md:justify-center md:p-8 lg:p-12">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-theme-green text-theme-yellow md:h-[80px] md:w-[80px] lg:h-[120px] lg:w-[120px]">
              <CreateIcon />
            </div>
            <div className="md:text-center">
              <h5 className="mb-2">Create</h5>
              <p>Tell us about your campaign</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 md:items-center md:justify-center md:p-8 lg:p-12">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-theme-green text-theme-yellow md:h-[80px] md:w-[80px] lg:h-[120px] lg:w-[120px]">
              <SendIcon width="2em" height="2em" />
            </div>
            <div className="md:text-center">
              <h5 className="mb-2">Share</h5>
              <p>share your campaign</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;
