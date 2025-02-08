"use client";
import CampaignLoader from "@/app/components/loading/CampaignLoader";
import Container from "@/app/components/util/Container";
import CalenderIcon from "@/svgs/CalenderIcon";
import ShareIcon from "@/svgs/ShareIcon";
import WithdrawIcon from "@/svgs/WithdrawIcon";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import WithdrawalForm from "./components/WithdrawalForm";
import { fetchCampaign } from "@/app/utils/helper";
import { useAccount } from "@starknet-react/core";
import { redirect } from "next/navigation";

const page = ({
  params
}: {
  params: { name: string; address: string; cid: string };
}) => {
  const { address } = useAccount();

  const [withdrawalFormOpen, setWithdrawalFormOpen] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    image: "/default-image.webp",
    description: "",
    date: "",
    organizer: "",
    beneficiary: "",
    location: "",
    target: "",
    address: ""
  });
  const [donationCount, setDonationCount] = useState(0);
  const [withdrawalInputs, setWithdrawalInputs] = useState({
    beneficiary: "",
    amount: ""
  });
  const [balance, setBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);

  useEffect(() => {
    if (params.address && params.cid) {
      fetchCampaign(
        params.cid,
        setBalance,
        setDonationCount,
        setCampaignDetails,
        setAvailableBalance
      );
    }
  }, []);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const walletAddress = getCookie("walletAddress");

    if (!walletAddress) {
      redirect("/");
    }
  }, [address]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    const updatedValue =
      name === "amount" && parseFloat(value) > availableBalance
        ? availableBalance.toString()
        : value;

    setWithdrawalInputs((prev) => ({
      ...prev,
      [name]: updatedValue
    }));
  };

  const width = `${Math.min(
    (balance / parseInt(campaignDetails.target)) * 100,
    100
  )}%`;

  return (
    <>
      {campaignDetails.name ? (
        <section className="mt-[4rem] min-h-[100svh] bg-background">
          <Container className="mx-auto px-4 py-10 md:px-10 md:py-16">
            <div className="relative mx-auto max-w-[500px] gap-8 md:mx-0 md:max-w-none lg:flex">
              <div className="mx-auto flex flex-col gap-12 lg:w-[60%]">
                <h2 className="font-bold">{campaignDetails.name}</h2>
                <div className="relative mx-auto h-[400px] w-full rounded-[10px] object-contain md:w-[80%]">
                  <Image
                    className="h-full w-full rounded-[10px]"
                    loader={() => campaignDetails.image}
                    src={campaignDetails.image}
                    unoptimized
                    priority
                    fill
                    alt=""
                  />
                </div>
                <div className="flex w-full flex-col gap-8 md:mx-auto md:w-[85%] lg:hidden">
                  <div className="flex flex-col gap-4">
                    <p>
                      <span className="text-[2rem]">
                        {balance.toFixed(2)} STRK
                      </span>{" "}
                      raised of {campaignDetails.target || 0}STRK target
                    </p>
                    <div className="">
                      <div className="relative mb-2 h-[.25rem] w-full">
                        <div className="mb-4 h-[1vw] max-h-[.25rem] w-full rounded-full bg-[#127c5548]"></div>
                        <div
                          style={{
                            width: width
                          }}
                          className={`absolute top-0 mb-4 h-[1vw] max-h-[.25rem] rounded-full bg-[#127C56]`}
                        ></div>
                      </div>
                      <p>
                        {donationCount || 0} donation
                        {donationCount === 1 ? "" : "s"}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">
                          Available balance:
                        </span>{" "}
                        <span className="text-l">
                          {availableBalance.toFixed(2)} STRK
                        </span>
                      </p>
                    </div>
                  </div>
                  <WithdrawalForm
                    handleChange={handleChange}
                    withdrawalInputs={withdrawalInputs}
                    withdrawalFormOpen={withdrawalFormOpen}
                    setWithdrawalFormOpen={setWithdrawalFormOpen}
                    campaignAddress={campaignDetails.address}
                    availableBalance={availableBalance}
                  />
                  {!withdrawalFormOpen && (
                    <div className="flex flex-col gap-4 text-white md:flex-row">
                      <button
                        onClick={() => setWithdrawalFormOpen(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-theme-green p-3 disabled:cursor-not-allowed md:w-1/2"
                      >
                        <span>withdraw</span>{" "}
                        <span className="text-theme-yellow">
                          <WithdrawIcon />
                        </span>
                      </button>
                      <button className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-theme-green p-3 md:w-1/2">
                        <span>Share</span>
                        <span className="text-theme-yellow">
                          <ShareIcon />
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-full md:mx-auto md:w-[85%] lg:w-full">
                  <p>{campaignDetails.description}</p>
                </div>
                <div className="flex w-full flex-col gap-4 md:mx-auto md:w-[85%] md:flex-row lg:w-full">
                  <button
                    onClick={() => setWithdrawalFormOpen(true)}
                    className="w-full rounded-[5px] border-[1px] border-solid border-theme-green p-3 font-bold disabled:cursor-not-allowed md:w-1/2"
                  >
                    Withdraw
                  </button>
                  <button className="w-full rounded-[5px] border-[1px] border-solid border-theme-green p-3 font-bold md:w-1/2">
                    Share
                  </button>
                </div>

                <div className="flex items-center gap-4 border-t-[1px] border-solid border-gray-100 py-6">
                  <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-100">
                    <CalenderIcon />
                  </span>{" "}
                  <p>{campaignDetails.date}</p>
                </div>
              </div>
              <div className="sticky top-8 hidden h-fit w-[35%] flex-col gap-4 rounded-[10px] bg-background p-8 shadow-small lg:flex">
                <div className="flex flex-col gap-4">
                  <p>
                    <span className="text-[2rem]">
                      {balance.toFixed(2)} STRK
                    </span>{" "}
                    raised of {campaignDetails.target || "0"} STRK target
                  </p>
                  <div className="">
                    <div className="relative mb-2 h-[.25rem] w-full">
                      <div className="mb-4 h-[1vw] max-h-[.25rem] w-full rounded-full bg-[#127c5548]"></div>
                      <div
                        style={{
                          width: width
                        }}
                        className={`absolute top-0 mb-4 h-[1vw] max-h-[.25rem] rounded-full bg-[#127C56]`}
                      ></div>
                    </div>
                    <p>
                      {" "}
                      {donationCount} donation{donationCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Available balance:</span>{" "}
                      <span className="text-l">
                        {availableBalance.toFixed(2)} STRK
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <WithdrawalForm
                    handleChange={handleChange}
                    withdrawalInputs={withdrawalInputs}
                    withdrawalFormOpen={withdrawalFormOpen}
                    setWithdrawalFormOpen={setWithdrawalFormOpen}
                    campaignAddress={campaignDetails.address}
                    availableBalance={availableBalance}
                  />
                  {!withdrawalFormOpen && (
                    <>
                      <button
                        onClick={() => setWithdrawalFormOpen(true)}
                        className={`flex w-full items-center justify-center gap-2 rounded-[5px] bg-theme-green p-2 text-white disabled:cursor-not-allowed`}
                      >
                        <span>Withdraw</span>{" "}
                        <span className="text-theme-yellow">
                          <WithdrawIcon />
                        </span>
                      </button>

                      <button className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-theme-green p-2 text-white">
                        <span>Share</span>
                        <span className="text-theme-yellow">
                          <ShareIcon />
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <CampaignLoader />
      )}
    </>
  );
};

export default page;
