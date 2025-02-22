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
    <section className="mx-auto mt-[5rem] min-h-[40vh] animate-fadeIn px-3 sm:px-8 md:px-12 lg:px-16 py-8">
      <div className="mx-auto mb-16 grid max-w-[1242px] px-3 lg:grid-cols-2 gap-10">
        <div className="space-y-4 text-center lg:text-left">
          <p className="mb-2 text-foreground-secondary text-sm sm:text-base text-left">
            Category
          </p>
          <h2 className="font-agrandir text-[32px] text-left sm:text-3xl md:text-4xl capitalize leading-tight">
            <span className="text-accent-green">{categoryName}</span> Fundraising with TokenGiver
          </h2>
          <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base text-justify">
            Empowering the future through causes has never been easier with
            TokenGiver. Join us in transforming lives.
          </p>
          <Link
            href={"/create"}
            className="block  items-start w-full sm:inline-block sm:w-auto rounded-[25px] bg-accent-green px-4 py-2 text-sm text-white"
           // "rounded-[25px] bg-accent-green px-4 py-2 text-sm text-white"
          >
            Start a Campaign
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="relative top-5 max-w-[400px] sm:max-w-[450px] md:max-w-[500px] rounded-[10px] lg:top-0">
            <Image
              src={"/404.png"}
              width={521}
              height={581}
              alt={`${categoryName}`}
              role="presentation"
              className="object-cover w-full rounded-[10px]"
            />
            <div className="absolute w-[90%] max-w-[280px] rounded-[5px] bg-white p-4 sm:p-6 leading-6 tracking-wider shadow-md lg:-left-[3rem]">
              <div className="absolute left-[-15px] sm:left-[-20px] top-[-10px] grid h-[35px] w-[35px] sm:h-[40px] sm:w-[40px] place-content-center rounded-full bg-accent-green font-agrandir text-white">
                <QuotesIcon />
              </div>
              <p className="text-sm sm:text-base">
                Start making a difference today! Whether you're donating or
                creating your own campaign.
              </p>
              <i className="text-xs sm:text-sm text-accent-green">-TokenGiver</i>
            </div>
          </div>
        </div>
      </div>

      {/* Fundraisers Grid */}
      <div className="max-w-[1280px] mx-auto ">
        <h3 className="mb-8 text-center text-xl font-medium capitalize sm:text-2xl lg:text-left mt-56">
          See {categoryName} Fundraisers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 sm:px-4 md:px-6 lg:px-5">
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <Card
                key={index}
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
            ))}
        </div>

          {/* //mx-auto mt-8 block w-fit rounded-[25px] px-4 py-2 text-sm text-foreground-primary ring-1 ring-[#808080] */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-[25px] px-4 py-2 text-sm text-foreground-primary ring-1 ring-[#808080]">
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
