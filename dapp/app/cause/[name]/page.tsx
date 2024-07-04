"use client";
import Header from "@/app/components/Header";
import CauseLoader from "@/app/loading/CauseLoader";
import CalenderIcon from "@/svgs/CalenderIcon";
import DonateIcon from "@/svgs/DonateIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import ShareIcon from "@/svgs/ShareIcon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    image: "/default-image.jpg",
    description: "",
    date: "",
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const contractAddress = searchParams.get("a");
      const tokenId = searchParams.get("t");
      const apiKey = process.env.NEXT_PUBLIC_ARK_API_KEY || "";
      const endpoint = `https://api.arkproject.dev/v1/tokens/${contractAddress}/${tokenId}`;
      const fetchNFT = async () => {
        try {
          if (contractAddress && tokenId) {
            const response = await fetch(endpoint, {
              method: "GET",
              headers: {
                "x-api-key": apiKey,
              },
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data) {
              const timestamp = data.result.mint_info.timestamp;
              const date = new Date(timestamp * 1000);
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "long" });
              const year = date.getFullYear();
              const formattedDate = `Created ${day} ${month} ${year}`;

              setCampaignDetails({
                name: data.result.metadata.normalized.name || "",
                description: data.result.metadata.normalized.description,
                image: data.result.metadata.normalized.image,
                date: formattedDate,
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchNFT();
    }
  }, []);

  return (
    <>
      <>
        <div className="fixed top-0 left-0  w-screen h-[10vh]  -z-50 bg-header-gradient"></div>

        <header
          id="header-container"
          className="absolute top-0 left-0  w-full flex items-center justify-between h-[3.5rem] z-50 py-8 px-8 md:px-16"
        >
          <Link href="/" className="font-bold text-[#127C56]">
            Logo.
          </Link>
        </header>
      </>

      {campaignDetails.name ? (
        <section className="mt-[4rem] py-10 md:py-16 px-4 md:px-10 lg:px-40 bg-[#fffcf5] ">
          <div className="max-w-[780px] lg:max-w-full mx-auto flex justify-between">
            <div className="lg:w-[60%] flex flex-col gap-12">
              <h2 className="font-bold">{campaignDetails.name}</h2>
              <div className="rounded-[10px] h-[400px] w-full md:w-[80%] mx-auto lg:w-full">
                <img
                  className="rounded-[10px]  h-full w-full"
                  src={campaignDetails.image}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-8 lg:hidden">
                <div className="flex flex-col gap-4">
                  <p>
                    <span className="text-[2rem]">$20</span> raised of $300
                    target
                  </p>
                  <div className="">
                    <div className="w-full h-[.25rem] mb-2 relative">
                      <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
                      <div
                        style={{
                          width: `5%`,
                        }}
                        className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
                      ></div>
                    </div>
                    <p>2 donations</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-white md:flex-row   ">
                  <button className="w-full md:w-1/2 bg-theme-green p-3 rounded-[5px] flex justify-center items-center gap-2 ">
                    <span>Donate now</span>{" "}
                    <span className="text-amber-300">
                      <DonateIcon />
                    </span>
                  </button>
                  <button className="w-full md:w-1/2 bg-theme-green p-3 rounded-[5px]  flex justify-center items-center gap-2">
                    <span>Share</span>
                    <span className="text-amber-300">
                      <ShareIcon />
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <p>{campaignDetails.description}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button className=" w-full md:w-1/2 border-[1px] border-solid border-theme-green p-3 rounded-[5px] font-bold">
                  Donate
                </button>
                <button className="w-full md:w-1/2 border-[1px] border-solid border-theme-green p-3 rounded-[5px] font-bold">
                  Share
                </button>
              </div>

              <div>
                <h4>Organizer and beneficiary</h4>
                <div className="flex flex-col items-center  w-fit md:items-start md:w-full md:flex-row gap-8 md:gap-12 py-8">
                  <div className="flex gap-4">
                    <div className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                      <ProfileIcon />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold">Stephanie Ezinne</p>
                      <p>Organizer</p>
                      <p>Abuja</p>
                    </div>
                  </div>
                  <p className="text-[1.5em] font-extralight hidden md:block">
                    &rarr;
                  </p>
                  <p className="text-[1.5em] font-extralight md:hidden  w-fit">
                    &darr;
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                      <ProfileIcon />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold">Stephanie Ezinne</p>
                      <p>Beneficiary</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-solid border-t-[1px] border-gray-400 py-6 flex gap-4 items-center">
                <span className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                  <CalenderIcon />
                </span>{" "}
                <p>{campaignDetails.date}</p>
              </div>
            </div>
            <div className="hidden sticky top-8 bg-off-white p-8  rounded-[10px] w-[35%] h-fit lg:flex flex-col gap-8 shadow-small ">
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-[2rem]">$20</span> raised of $300 target
                </p>
                <div className="">
                  <div className="w-full h-[.25rem] mb-2 relative">
                    <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
                    <div
                      style={{
                        width: `5%`,
                      }}
                      className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
                    ></div>
                  </div>
                  <p>2 donations</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-white  ">
                <button className="w-full bg-theme-green p-2 rounded-[5px] flex justify-center items-center gap-2 ">
                  <span>Donate now</span>{" "}
                  <span className="text-amber-300">
                    <DonateIcon />
                  </span>
                </button>
                <button className="w-full bg-theme-green p-2 rounded-[5px]  flex justify-center items-center gap-2">
                  <span>Share</span>
                  <span className="text-amber-300">
                    <ShareIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <CauseLoader />
      )}
    </>
  );
};

export default page;
