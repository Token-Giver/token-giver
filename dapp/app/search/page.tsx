"use client";
import { useEffect, useState } from "react";
import Container from "../components/util/Container";
import { fetchCampaigns, searchCampaigns } from "../utils/helper";
import { campaign_contract } from "../utils/data";
import { useDebounce } from "../hooks";
import { Campaign } from "@/types";
import FilteredCampaigns from "./components/FilteredCampaigns";
import LatestCampaigns from "./components/LatestCampaigns";
import { H2 } from "../components/util/Headers";

const page = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [collections, setCollections] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [latestCampaigns, setLatestCampaigns] = useState<Campaign[]>([]);

  console.log(search);

  useEffect(() => {
    fetchCampaigns(campaign_contract, setLoading, setCollections);

    return () => {};
  }, []);

  useEffect(() => {
    if (collections) {
      const latestFive = collections.slice(0, 4);
      setLatestCampaigns(latestFive);
    }
  }, [collections]);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setFilteredCampaigns([]);
    } else {
      const loadCampaigns = async () => {
        const campaigns = await searchCampaigns({
          campaigns: collections,
          search: debouncedSearch,
        });
        setFilteredCampaigns(campaigns);
      };
      loadCampaigns();
    }
  }, [debouncedSearch]);

  return (
    <section className="min-h-[100svh] py-[5rem] px-4 lg:px-[10vw]">
      <Container className="flex flex-col gap-8">
        <div className="text-center">
          <H2 style="mb-4">Search campaigns on Token Giver</H2>
          <p>Find campaigns by location, title, or organizer</p>
        </div>
        <div className="flex justify-center">
          <input
            className="w-full max-w-[30rem] md:max-w-[40rem] bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
            type="text"
            placeholder="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredCampaigns.length > 0 ? (
          <FilteredCampaigns campaigns={filteredCampaigns} />
        ) : (
          <LatestCampaigns campaigns={latestCampaigns} loading={loading} />
        )}
      </Container>
    </section>
  );
};

export default page;
