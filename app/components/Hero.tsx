"use client";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center space-y-8 text-foreground-secondary sm:items-start sm:justify-start">
      <p className="text-xs sm:text-sm">Explore</p>
      <div>
        <h1 className="mb-4 text-center sm:text-left">Transform Charity with Blockchain.</h1>
        <p className="w-full text-center sm:text-left">
          Fussing compassion with innovation. Maximizing your contributions'
          impact with security and transparency.
        </p>
      </div>
      <button
        onClick={createCampaign}
        className="w-fit rounded-[18px] bg-accent-green px-4 py-3 text-xs font-semibold text-white sm:rounded-[25px] sm:px-8 sm:py-4 sm:text-sm"
      >
        Start a Campaign
      </button>
    </section>
  );
};

export default Hero;
