"use client";
import HeartIcon from "@/svgs/HeartIcon";
import { useRouter } from "next/navigation";
import { H1 } from "./util/Headers";

const Hero = () => {
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };
  return (
    <section className="text-foreground-secondary  w-[1100px] 2xl:mx-auto">
      <p>Explore</p>
      <h1 className="text-foreground-primary">
        Transform Charity with Blockchain.
      </h1>
      <p className="mb-4 text-foreground-secondary">
        Fussing compassion with innovation. Maximizing your contributions'
        impact with security and transparency.
      </p>
      <button
        onClick={createCampaign}
        className="bg-accent-green text-sm text-white px-4 py-2 rounded-[25px]"
      >
        Start a Campaign
      </button>
    </section>
  );
};

export default Hero;
