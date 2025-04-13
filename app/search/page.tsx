"use client";
import { useEffect, useState } from "react";
import { searchCampaigns } from "../utils/helper";
import { campaign_contract } from "../utils/data";
import { useDebounce } from "../hooks";
import { Campaign } from "@/types";
import FilteredCampaigns from "./components/FilteredCampaigns";
import LatestCampaigns from "./components/LatestCampaigns";
import Categories from "../components/Categories";
import FAQ from "../components/FAQ";
import SearchIcon from "@/svgs/SearchIcon";

const page = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  // const [collections, setCollections] = useState<Campaign[]>([]);
  // const [loading, setLoading] = useState(true);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [latestCampaigns, setLatestCampaigns] = useState<Campaign[]>([]);

  // useEffect(() => {
  //   fetchCampaigns(campaign_contract, setLoading, setCollections);

  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   if (collections) {
  //     const latestFive = collections.slice(0, 5);
  //     setLatestCampaigns(latestFive);
  //   }
  // }, [collections]);

  // useEffect(() => {
  //   if (debouncedSearch.trim() === "") {
  //     setFilteredCampaigns([]);
  //   } else {
  //     const loadCampaigns = async () => {
  //       const campaigns = await searchCampaigns({
  //         campaigns: collections,
  //         search: debouncedSearch
  //       });
  //       setFilteredCampaigns(campaigns);
  //     };
  //     loadCampaigns();
  //   }
  // }, [debouncedSearch]);

  return (
    <section className="mx-auto mt-[5rem] min-h-[40vh] animate-fadeIn px-16 py-8">
      <div>
        <div className="mx-auto max-w-[1204px] space-y-5 text-center">
          <p className="text-foreground-secondary">
            Search campaigns on Token Giver
          </p>
          <h2 className="font-agrandir text-foreground-primary">
            Discover Causes That Matter
          </h2>
          <p className="mx-auto max-w-[900px] text-foreground-secondary">
            Our advanced search tool allows you to explore causes that resonate
            with your values. Use keywords, categories, or filters to discover
            campaigns that align with your passions.
          </p>
        </div>
        <div className="relative mx-auto my-20 max-w-[800px]">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
          <input
            className="h-[45px] w-full rounded-[25px] px-10 ring-1 ring-gray-100 placeholder:text-sm"
            type="text"
            placeholder="search Campaign"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredCampaigns.length > 0 ? (
          <FilteredCampaigns campaigns={filteredCampaigns} />
        ) : (
          <LatestCampaigns />
        )}
      </div>
      <Categories />
      <div className="mt-12">
        <FAQ />
      </div>
    </section>
  );
};

export default page;
