"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardLoader from "@/app/components/loading/CardLoader";
import { useRouter } from "next/navigation";
import { campaign_contract } from "@/app/utils/data";
import { fetchCampaigns } from "@/app/utils/helper";
import Container from "../util/Container";
import { H2 } from "../util/Headers";
import { useConnect } from "@starknet-react/core";
import FeaturedCampaigns from "./FeaturedCampaigns";

export const categories = [
  "Health Care",
  "Education",
  "Environment",
  "Arts and Crafts",
  "Community development",
  "Science and technology",
  "Event",
  "Volunteer",
  "Animals",
  "Global Advocacy",
  "Family",
  "Sports",
  "Religion",
  "Travel",
  "Business",
];

const Fundraisers = () => {
  const router = useRouter();
  const { connectors, connect } = useConnect();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRouteToCampaigns = () => {
    router.push("/explore");
  };
  useEffect(() => {
    const lastUsedConnector = localStorage.getItem("lastUsedConnector");
    if (lastUsedConnector) {
      connect({
        connector: connectors.find(
          (connector) => connector.name === lastUsedConnector
        ),
      });
    }
  }, [connectors]);

  useEffect(() => {
    fetchCampaigns(campaign_contract, setLoading, setCollections);
    return () => {};
  }, []);

  return (
    <section className="max-w-[1536px]  2xl:mx-auto">
      <FeaturedCampaigns />

      <div className="mt-16 ">
        <div className="relative  mx-auto mb-8">
          {/* Gradient indicators for scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrollable container */}
          <div className="overflow-x-auto flex gap-4 pb-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scrollbar-hide">
            {/* Category buttons */}
            {categories.map((category, index) => (
              <button
                key={index}
                className={`shrink-0  font-agrandir px-2 py-1 text-sm  rounded-full transition-colors ${
                  index === 0
                    ? "bg-accent-green  text-white hover:bg-[#0f6647]"
                    : " bg-[#F7F7F6] text-foreground-primary  "
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid  max-w-[1200px] gap-8 grid-cols-2 2xl:mx-auto">
          <div className="bg-blue h-[22rem] rounded-[10px] w-full">a</div>
          <div className="bg-red h-[22rem] rounded-[10px] ">a</div>
        </div>
        <div className="mt-16 max-w-[1242px] flex flex-col items-center 2xl:mx-auto">
          <div className="grid grid-cols-4  gap-4 ">
            <Card
              campaign_address=""
              causeName=""
              cid=""
              imageSrc=""
              location=""
              progress={0}
              target=""
              token_id=""
              url=""
              imageAltText=""
            />
            <Card
              campaign_address=""
              causeName=""
              cid=""
              imageSrc=""
              location=""
              progress={0}
              target=""
              token_id=""
              url=""
              imageAltText=""
            />
            <Card
              campaign_address=""
              causeName=""
              cid=""
              imageSrc=""
              location=""
              progress={0}
              target=""
              token_id=""
              url=""
              imageAltText=""
            />
            <Card
              campaign_address=""
              causeName=""
              cid=""
              imageSrc=""
              location=""
              progress={0}
              target=""
              token_id=""
              url=""
              imageAltText=""
            />
            <Card
              campaign_address=""
              causeName=""
              cid=""
              imageSrc=""
              location=""
              progress={0}
              target=""
              token_id=""
              url=""
              imageAltText=""
            />
            <Card
              campaign_address=""
              causeName=""
              cid=""
              imageSrc=""
              location=""
              progress={0}
              target=""
              token_id=""
              url=""
              imageAltText=""
            />
            <Card
              campaign_address=""
              causeName=""
              cid=""
              imageSrc=""
              location=""
              progress={0}
              target=""
              token_id=""
              url=""
              imageAltText=""
            />
            <Card
              campaign_address=""
              causeName=""
              cid=""
              imageSrc=""
              location=""
              progress={0}
              target=""
              token_id=""
              url=""
              imageAltText=""
            />
          </div>
          <button className="ring-1 ring-[#808080] w-[7rem] mx-auto text-sm px-4 py-2 mt-8 rounded-[25px] text-foreground-primary">
            See more
          </button>
        </div>
      </div>
    </section>
    // <section>
    //   <Container>
    //     <H2 style="my-[5rem]">Browse Fundraisers</H2>
    //     <section
    //       id="fundraisers"
    //       className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center "
    //     >
    //       {loading
    //         ? Array.from({ length: 12 }).map((_, idx) => (
    //             <CardLoader key={idx} />
    //           ))
    //         : collections.slice(0, 9).map((data, idx) => {
    //             const path = data.name
    //               .replace(/[^a-zA-Z ]/g, "")
    //               .replace(/ /g, "-")
    //               .toLocaleLowerCase()
    //               .replace(/-+/g, "-");

    //             const url = `${path}/${data.campaign_address}/${data.cid}`;
    //             return (
    //               <Card
    //                 cid={data.cid}
    //                 causeName={data.name || "Unknown Cause"}
    //                 imageSrc={
    //                   `${
    //                     process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
    //                   }${data.image?.slice(7, -1)}?pinataGatewayToken=${
    //                     process.env.NEXT_PUBLIC_PINATA_API_KEY
    //                   }` || "/default-image.webp"
    //                 }
    //                 location={data.location}
    //                 progress={0}
    //                 key={idx}
    //                 token_id={data.id}
    //                 campaign_address={data.campaign_address || "0x0"}
    //                 target={data.target}
    //                 url={url}
    //               />
    //             );
    //           })}
    //     </section>
    //     <div className=" flex justify-center">
    //       <button
    //         onClick={handleRouteToCampaigns}
    //         className="px-6 py-2 border-solid border-[1px] ml-10 mt-10 h-fit border-[#127C56] rounded-[25px]"
    //       >
    //         Show more
    //       </button>
    //     </div>
    //   </Container>
    // </section>
  );
};

export default Fundraisers;
