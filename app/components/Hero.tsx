"use client";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section className="w-full max-w-[1100px] text-center text-foreground-secondary md:text-start 2xl:mx-auto">
      <p className="mb-3">Explore</p>
      <h1 className="font-agrandir text-foreground-primary max-lg:text-[42px] max-md:leading-[55px] max-lgMobile:text-4xl max-lgMobile:leading-[42px]">
        Transform Charity with Blockchain.
      </h1>
      <p className="mb-4 text-sm text-foreground-secondary max-lgMobile:mt-2 lgMobile:mb-6 lgMobile:text-base">
        Fusing compassion with innovation. Maximizing your contributions'
        impact with security and transparency.
      </p>
      <button
        onClick={createCampaign}
        className="rounded-[25px] bg-accent-green px-4 py-2 text-sm text-white max-mobile:mx-auto"
      >
        Start a Campaign
      </button>
    </section>
  );
};

export default Hero;
