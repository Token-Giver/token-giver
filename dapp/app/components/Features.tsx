"use client";
import GiveIcon from "@/svgs/GiveIcon";
import GrowIcon from "@/svgs/GrowIcon";
import LoveIcon from "@/svgs/LoveIcon";
import { usePathname } from "next/navigation";
import Container from "./util/Container";
import { H2 } from "./util/Headers";

const Features = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");

  return (
    <section
      className={`${
        isDonationPage ? "hidden" : "block"
      } py-10 px-4 md:p-10 bg-background`}
    >
      <Container>
        <div className="mb-[5rem]">
          <H2>Fundraising on token giver only takes a few minutes</H2>
        </div>
        <div
          id="feat-section"
          className="flex flex-col justify-center md:flex-row bg-yellow-100 rounded-[20px]"
        >
          <div className="flex flex-col gap-4 md:items-center md:justify-center p-4 md:p-8 lg:p-12">
            <div className="bg-theme-green w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center text-theme-yellow">
              <LoveIcon />
            </div>
            <div className=" md:text-center">
              <h5 className="mb-2">Love</h5>
              <p>
                Lorem ipsum dolor nctio sit aliquam praesentium animi cum
                quibusdam voluptate, harum optio.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:items-center md:justify-center p-4  md:p-8  lg:p-12 ">
            <div className="bg-theme-green w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center text-theme-yellow">
              <GiveIcon />
            </div>
            <div className=" md:text-center">
              <h5 className="mb-2">Give</h5>
              <p>
                Lorem ipsum dolor nctio sit aliquam praesentium animi cum
                quibusdam voluptate, harum optio.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:items-center md:justify-center p-4  md:p-8  lg:p-12">
            <div className="bg-theme-green w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center text-theme-yellow">
              <GrowIcon />
            </div>
            <div className=" md:text-center">
              <h5 className="mb-2">Grow</h5>
              <p>
                Lorem ipsum dolor nctio sit aliquam praesentium animi cum
                quibusdam voluptate, harum optio.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;
