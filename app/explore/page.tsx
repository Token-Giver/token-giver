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
import { useRouter } from "next/navigation";

const page = () => {
  const [cursor, setCursor] = useState(null);
  const [reachedEnd, setReachedEnd] = useState<"more" | "end">("more");
  const [collections, setCollections] = useState<any[]>([]);
  const [cachedCollections, setCachedCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const createCampaign = () => {
    router.push("/create");
  };

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
      <Container className="mt-[5rem] py-10 px-4 md:px-8 lg:px-10 xl:px-0 ">
        <div className="my-12 lg:flex items-start justify-between">
          <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-4 max-w-[750px]">
            <H2 style="text-center lg:text-start !text-[2rem] font-semibold lg:!text-[42px] lg:leading-[54px]">
              Browse Through different categories, to give a Helping hand.
            </H2>
            {/* style="my-[5rem]" */}
            <p className="text-center lg:text-start font-normal text-[1.125rem] leading-6 sm:text-md sm:leading-5">
              Merging Heart with Technology: Secure, Transparent Giving for
              Maximum Impact
            </p>
            <button
              onClick={createCampaign}
              className="bg-pantone-green text-white px-6 py-3 rounded-[48px]"
            >
              Start a Campaign
            </button>
          </div>

          <Image
            src="/heart-pic.png"
            alt="helping hand picture"
            width={358}
            height={270}
            className="rounded-[2.5rem] mt-6 justify-self-center lg:mt-0 sm:w-[474px] sm:h-[357px]"
          />
        </div>

        <div>
          <p className="text-[0.875rem] font-normal leading-4">
            Please select any category of your choice
          </p>
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-4 mt-3 lg:grid-cols-10 lg:content-center lg:gap-x-6 lg:gap-y-10">
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
          <div className="flex items-center gap-1 overflow-x-scroll mt-8 border-b border-dark-gray pb-3 lg:pb-10">
            {statusList.map((data) => (
              <Status status={data} />
            ))}
          </div>
        </div>

        <section
          id="fundraisers"
          className="bg-white lg:bg-transparent lg:grid gap-4 mt-10 lg:gap-8 lg:grid-cols-2 xl:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center "
        >
          {/* <H2 style="font-semibold !text-[1.125rem] mb-2">Medicals</H2> */}
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
                  <div>
                    <Card
                      causeName={name || "Unknown Cause"}
                      isLastCard={idx === cachedCollections.length - 1}
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
                  </div>
                );
              })}
        </section>
        <div className="flex justify-center items-center mt-4 lg:mt-10">
          <button className="border-[0.5px] border-black rounded-full py-3 px-6">
            Browse more categories
          </button>
        </div>
      </Container>
    </section>
  );
};

export default page;
