"use client";
import { useEffect, useState } from "react";
import Card from "../components/Fundraiser/Card";
import CardLoader from "../components/loading/CardLoader";
import { campaign_contract } from "../utils/data";
import { fetchCampaigns } from "../utils/helper";
import Container from "../components/util/Container";
import { H1, H2, H3 } from "../components/util/Headers";
import Image from "next/image";
import CategoryCard from "../components/Explore/Card";
import NextIcon from "@/svgs/NextIcon";
import Link from "next/link";
import { categoryList, statusList } from "../utils/explore-data";
import Status from "../components/Explore/Status";
import Project from "../components/Explore/Project";

const page = () => {
  const [cursor, setCursor] = useState(null);
  const [reachedEnd, setReachedEnd] = useState<"more" | "end">("more");
  const [collections, setCollections] = useState<any[]>([]);
  const [cachedCollections, setCachedCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchCampaigns(campaign_contract, setLoading, setCollections);
    return () => {};
  }, []);

  useEffect(() => {
    setCachedCollections((prev) => {
      const newCollections = collections.filter(
        (collection) =>
          !prev.some((item) => item.token_id === collection.token_id)
      );
      return [...prev, ...newCollections];
    });
    if (cursor === undefined) {
      setReachedEnd("end");
    }
  }, [collections]);

  return (
    <section className="min-h-screen bg-white-smoke">
      <Container className="mt-[5rem] py-10 px-4 md:px-10 lg:px-16">
        <div className="my-12">
          <div className="px-4 flex flex-col justify-center items-center gap-4">
            <H1 style="text-center !text-[2rem] font-semibold">
              Browse Through different categories, to give a Helping hand.
            </H1>
            {/* style="my-[5rem]" */}
            <p className="text-center font-normal text-[1.125rem] leading-6">
              Merging Heart with Technology: Secure, Transparent Giving for
              Maximum Impact
            </p>
            <button className="bg-pantone-green text-white px-6 py-3 rounded-[48px]">
              Start a Campaign
            </button>
          </div>

          <Image
            src="/heart-pic.png"
            alt="helping hand picture"
            width={358}
            height={270}
            className="rounded-[2.5rem] mt-6"
          />
        </div>

        <div>
          <p className="text-[0.875rem] font-normal leading-4">
            Please select any category of your choice
          </p>
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-4 mt-3">
            {categoryList.map(({ icon, title }) => (
              <CategoryCard Icon={icon} categoryName={title} />
            ))}
          </div>
          <div className="flex justify-end">
            <Link href="#" className="mt-3 flex gap-2 items-center">
              See more <NextIcon />
            </Link>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 overflow-x-scroll mt-8 border-b border-dark-gray pb-3">
            {statusList.map((data) => (
              <Status status={data} />
            ))}
          </div>
          <div className="my-2 ">
            <H2 style="font-semibold !text-[1.125rem] mb-2">Medical</H2>
            <Project />
          </div>
          <div className="my-2 ">
            <H2 style="font-semibold !text-[1.125rem] mb-2">Emergency</H2>
            <Project />
          </div>
          <div className="my-2 ">
            <H2 style="font-semibold !text-[1.125rem] mb-2">Family</H2>
            <Project />
          </div>
          <div className="my-2 ">
            <H2 style="font-semibold !text-[1.125rem] mb-2">Events</H2>
            <Project />
          </div>
        </div>

        {/* <section
            id="fundraisers"
            className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center "
          >
            {loading
              ? Array.from({ length: 12 }).map((_, idx) => (
                  <CardLoader key={idx} />
                ))
              : cachedCollections.map((nft, idx) => {
                  const {
                    name,
                    image,
                    campaign_address,
                    id,
                    location,
                    cid,
                    target,
                  } = nft || {};
                  const path = name
                    .replace(/[^a-zA-Z ]/g, "")
                    .replace(/ /g, "-")
                    .toLocaleLowerCase()
                    .replace(/-+/g, "-");

                  const url = `${path}/${campaign_address}/${cid}`;
                  return (
                    <Card
                      causeName={name || "Unknown Cause"}
                      imageSrc={
                        `${
                          process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
                        }${image.slice(7, -1)}?pinataGatewayToken=${
                          process.env.NEXT_PUBLIC_PINATA_API_KEY
                        }` || "/default-image.webp"
                      }
                      location={location}
                      target={target}
                      key={idx}
                      progress={43}
                      token_id={id}
                      campaign_address={campaign_address || "0x0"}
                      cid={cid}
                      url={url}
                    />
                  );
                })}
          </section> */}
      </Container>
    </section>
  );
};

export default page;
