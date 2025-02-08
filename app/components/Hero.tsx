"use client";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section className="w-[1100px] text-foreground-secondary 2xl:mx-auto">
      <p>Explore</p>
      <h1 className="font-agrandir text-foreground-primary">
        Transform Charity with Blockchain.
      </h1>
      <p className="mb-4 text-foreground-secondary">
        Fussing compassion with innovation. Maximizing your contributions'
        impact with security and transparency.
      </p>
      <button
        onClick={createCampaign}
        className="rounded-[25px] bg-accent-green px-4 py-2 text-sm text-white"
      >
        Start a Campaign
      </button>
    </section>
  );
};

export default Hero;
