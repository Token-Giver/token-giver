import { Campaign } from "@/types";
import React from "react";
import Card from "../Fundraiser/Card";
import CampaignCard from "./Card";

export default function Categories() {
  const categories = [
    "All",
    "Just launched",
    "Urgent",
    "Charities",
    "Close to target",
    "Needs push",
  ];

  const campaigns: Campaign[] = [
    {
      beneficiary: "Save the Children",
      campaign_address: "0x1234567890abcdef1234567890abcdef12345678",
      cid: "QmYfj7z89dsfhT7l6dKjuhfnsf7s7jsdhsjhshj",
      created_at: "2024-01-01T00:00:00Z",
      description: "A campaign to help children in need across the world.",
      id: "1",
      image: "/3.webp",
      location: "Worldwide",
      name: "Save the Children",
      target: "2334444",
      organizer: "",
    },
    {
      beneficiary: "Clean Water Initiative",
      campaign_address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
      cid: "QmWqsdhfjgWErter4gfg7erfgeddf7rfTGH3tsrT",
      created_at: "2024-02-01T00:00:00Z",
      description: "Providing clean water to communities in Africa.",
      id: "2",
      image: "/4.webp",
      location: "Africa",
      name: "Clean Water Initiative",
      organizer: "",
      target: "900000000",
    },
    {
      beneficiary: "Health for All",
      campaign_address: "0x9876543210abcdef9876543210abcdef98765432",
      cid: "QmUo3t4Jk5sGsFgH5tsr34hjdsjhsd23fdj0jsdf",
      created_at: "2024-03-01T00:00:00Z",
      description: "Providing healthcare services to underprivileged areas.",
      id: "3",
      image: "/5.webp",
      location: "Asia",
      name: "Health for All",
      organizer: "",
      target: "900000000",
    },
    {
      beneficiary: "Food for Hunger",
      campaign_address: "0xabcdefabcdefabcdefabcdefabcdefabcdef123456",
      cid: "QmTf6d3Hs6d7gTrr7hsddhsdfsdjfhsd8dsfhsdf",
      created_at: "2024-04-01T00:00:00Z",
      description:
        "A campaign to provide food for the hungry during the pandemic.",
      id: "4",
      image: "/6.webp",
      location: "South America",
      name: "Food for Hunger",
      organizer: "",
      target: "900000000",
    },
    {
      beneficiary: "Education for All",
      campaign_address: "0xdefabc1234567890abcdef1234567890abcdefab",
      cid: "QmX1e34JjF3sdjFfd9dsf8f6sdfs8dfdsf7sfgxas",
      created_at: "2024-05-01T00:00:00Z",
      description: "Helping children get access to education across the globe.",
      id: "5",
      image: "/7.webp",
      location: "Global",
      name: "Education for All",
      organizer: "",
      target: "900000000",
    },
  ];

  return (
    <div className="">
      <p className="font-semibold text-[24px]">Browse on going campaign</p>
      <div className="py-5">
        <div className="flex items-center gap-x-4">
          {categories.map((category, i) => (
            <button
              key={i}
              className="w-fit px-4 h-[41px] border border-[#ABABAB] rounded-full place-content-center"
            >
              <p>{category}</p>
            </button>
          ))}
         
        </div>
        <div className="py-20">
        <div className=" grid grid-cols-4 gap-8">
            {campaigns.map((campaign) => (
              <CampaignCard campaign={campaign} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
