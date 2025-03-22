"use client";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section className="max-mobile:text-center w-full max-w-[1100px] text-foreground-secondary 2xl:mx-auto">
      <p className="mb-3">Explore</p>
      <h1 className="max-lgMobile:text-4xl max-lgMobile:leading-[42px] font-agrandir text-foreground-primary max-lg:text-[42px] max-md:leading-[55px]">
        Transform Charity with Blockchain.
      </h1>
      <p className="lgMobile:text-base max-lgMobile:mt-2 lgMobile:mb-6 mb-4 text-sm text-foreground-secondary">
        Fussing compassion with innovation. Maximizing your contributions'
        impact with security and transparency.
      </p>
      <button
        onClick={createCampaign}
        className="max-mobile:mx-auto rounded-[25px] bg-accent-green px-4 py-2 text-sm text-white"
      >
        Start a Campaign
      </button>
    </section>
  );
};

export default Hero;
