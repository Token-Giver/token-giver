"use client";

import { Card } from "@/app/components/Fundraiser/Card";
import { GET_CAMPAIGNS_BY_CATEGORY } from "@/graphql/queries";
import QuotesIcon from "@/svgs/QuotesIcon";
import { ICampaign } from "@/types/campaigns";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIES } from "@/static";

const page = () => {
  const params = useParams();
  const slug = String(params?.category ?? "all");
  const categoryName =
    CATEGORIES.find((cat) => cat.slug === slug)?.name ?? "All";

  const { data } = useQuery(GET_CAMPAIGNS_BY_CATEGORY, {
    variables: {
      name: slug,
      limit: 20
    },
    skip: !slug
  });
  const campaigns: ICampaign[] = data?.getCampaignsByCategory?.items || [];

  return (
    <section className="mx-auto mt-[5rem] min-h-[40vh] animate-fadeIn px-3 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto mb-16 grid max-w-[1242px] gap-10 px-3 lg:grid-cols-2">
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
        <div className="flex justify-center">
          <div className="relative top-5 max-w-[400px] rounded-[10px] sm:max-w-[450px] md:max-w-[500px] lg:top-0">
            <Image
              src={`/categories/${slug}.svg`}
              width={521}
              height={581}
              alt={`${categoryName}`}
              role="presentation"
              className="rounded-lg object-cover"
            />
            <div className="absolute hidden w-[280px] -translate-y-full rounded-[5px] bg-white p-6 leading-6 tracking-wider shadow-md lg:block">
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
      {campaigns.length ? (
        <div className="mx-auto max-w-[1242px] animate-fadeIn">
          <h3 className="mb-8 text-2xl font-medium capitalize">
            See {categoryName} Fundraisers
          </h3>

          <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {campaigns.length > 0 &&
              campaigns.map((campaign, index) => {
                const url = `/${campaign.campaign_name.toLowerCase().replace(/\s+/g, "-")}/${campaign.campaign_id}`;
                return (
                  <div key={index} className="mx-auto">
                    <Card
                      key={campaign.campaign_id}
                      cid={campaign.campaign_id}
                      causeName={campaign.campaign_name || "Unknown Cause"}
                      imageSrc={campaign.cover_photo || "/default-image.webp"}
                      location={campaign.location}
                      progress={campaign.total_donations}
                      token_id={campaign.campaign_id}
                      campaign_address={campaign.campaign_address || "0x0"}
                      target={String(campaign.target_amount)}
                      url={url}
                    />
                  </div>
                );
              })}
          </div>
          {campaigns.length > 20 && (
            <button className="mx-auto mt-8 block w-fit rounded-[25px] px-4 py-2 text-sm text-foreground-primary ring-1 ring-[#808080]">
              See More
            </button>
          )}
        </div>
      ) : null}
    </section>
  );
};

export default page;
