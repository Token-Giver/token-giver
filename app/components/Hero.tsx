"use client";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section className="mx-auto w-full max-w-[1100px] flex flex-col items-center justify-center sm:items-start sm:justify-start space-y-8 text-foreground-secondary">
      <p className="text-xs sm:text-sm">Explore</p>
      <h1 className="block text-center sm:text-left lg:flex font-agrandir lg:flex-col">
        <span className="text-foreground-primary">
          Connect with Verified & Impactful{" "}
        </span>
        <span className="text-accent-green">Projects Around The Globe.</span>
      </h1>
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
