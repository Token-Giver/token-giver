"use client";

import { Card } from "@/app/components/Fundraiser/Card";
import QuotesIcon from "@/svgs/QuotesIcon";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const categoryName = String(params?.category ?? "All").replace(/-/g, " ");

  return (
    <section className="mx-auto mt-[5rem] min-h-[40vh] animate-fadeIn px-16 py-8">
      <div className="mx-auto mb-16 grid max-w-[1242px] grid-cols-2 px-4">
        <div>
          <p className="mb-12 text-foreground-secondary">Category</p>
          <h2 className="mb-4 font-agrandir text-4xl capitalize">
            <span className="text-accent-green">{categoryName}</span>{" "}
            Fundraising with TokenGiver
          </h2>
          <div>
            <p className="mb-8 text-foreground-secondary">
              Empowering the future through causes has never been easier with
              TokenGiver. and innovation. Join us in transforming lives
            </p>
            <Link
              href={"/create"}
              className="rounded-[25px] bg-accent-green px-4 py-2 text-sm text-white"
            >
              Start a Campaign
            </Link>
          </div>
        </div>
        <div className="">
          <div className="relative ml-auto h-[531px] w-[491px] rounded-[10px]">
            <Image
              src={"/404.png"}
              width={521}
              height={581}
              alt={`${categoryName}`}
              role="presentation"
              className="object-cover"
            />
            <div className="absolute -left-[3rem] w-[280px] rounded-[5px] bg-white p-6 leading-6 tracking-wider shadow-md">
              <div className="absolute left-[-20px] top-[-10px] grid h-[40px] w-[40px] place-content-center rounded-full bg-accent-green font-agrandir text-white">
                <QuotesIcon />
              </div>
              <p>
                Start making a difference today! Whether you're donating or
                creating your own campaign
              </p>
              <i className="text-sm text-accent-green">-TokenGiver</i>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1242px]">
        <h3 className="mb-8 ml-4 text-2xl font-medium capitalize">
          See {categoryName} Fundraisers
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="w-1/4 flex-shrink-0">
                <Card
                  cid={"123"}
                  causeName={"Unknown Cause"}
                  imageSrc={"/default-image.webp"}
                  location={"Lagos, Nigeria"}
                  progress={0}
                  token_id={"7777"}
                  campaign_address={"0x0"}
                  target={"60"}
                  url={""}
                />
              </div>
            ))}
        </div>
        <button className="mx-auto mt-8 block w-fit rounded-[25px] px-4 py-2 text-sm text-foreground-primary ring-1 ring-[#808080]">
          See More
        </button>
      </div>
    </section>
  );
};

export default page;
