"use client";
import Connect from "@/app/components/Connect";
import { fetchBalance, handleDonate } from "@/app/utils/helper";
import DownChevronIcon from "@/svgs/DownChevronIcon";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import SendIcon from "@/svgs/SendIcon";
import { useAccount } from "@starknet-react/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DonationSuccessModal from "./DonationSuccessModal";
import { useQuery } from "@apollo/client";
import { GET_CAMPAIGN_BY_ID } from "@/graphql/queries";
import { ICampaign } from "@/types/campaigns";

const Donate = ({
  params
}: {
  params: { name: string; address: string; cid: string };
}) => {
  const router = useRouter();

  const [fontSize, setFontSize] = useState(2);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("STRK");
  const [sendingState, setSendingState] = useState<
    "send" | "sending..." | "sent" | "failed"
  >("send");
  const { account, address } = useAccount();
  const [balance, setBalance] = useState("0");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tokens = [
    { symbol: "STRK", icon: "/strk.webp" },
    { symbol: "ETH", icon: "/eth.svg" }
  ];

  useEffect(() => {
    if (!address) {
      return;
    }
    fetchBalance(address, setBalance);
  }, [address]);

  const handleRouteToCampaign = () => {
    if (params.address && params.cid) {
      const campaignAddress = params.address;
      const campaignName = params.name;
      const cid = params.cid;
      router.push(`/${campaignName}/${campaignAddress}/${cid}`);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { scrollWidth, clientWidth, value } = event.target;
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setAmount(value);
    }

    if (value === "") {
      setFontSize(2);
    }
    if (scrollWidth > clientWidth) {
      setFontSize((prev) => Math.max(prev - 0.2, 0.8));
    }
  };
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleDonateClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await handleDonate(
      amount,
      account,
      setSendingState,
      campaign.campaign_address
    );
  };

  const { data, loading } = useQuery(GET_CAMPAIGN_BY_ID, {
    variables: {
      campaignId: Number(params.cid)
    }
  });
  const campaign: ICampaign = data?.getCampaignById;

  return (
    <>
      {loading ? (
        <div className="mx-auto mt-[5rem] grid min-h-[40vh] max-w-[1204px] place-content-center py-8">
          <Image
            alt="loading"
            src={"/logo-sm.png"}
            role="progressbar"
            width={200}
            height={200}
            className="animate-zoom-loading"
          />
        </div>
      ) : (
        <main className="grid h-screen grid-cols-1 lg:max-w-full lg:grid-cols-2">
          <div className="relative hidden h-full place-content-center bg-accent-green lg:grid">
            <div className="relative h-[700px] w-[500px]">
              <Image
                src="/create-bg.png"
                alt="Background description"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="h-full space-y-8 overflow-y-auto bg-white px-5 pt-9 xs:px-2 md:px-16 lg:pt-8">
            <div className="mx-auto hidden max-w-4xl items-center justify-between lg:flex">
              <button
                onClick={() => router.back()}
                className="flex animate-fadeIn items-center gap-1 text-accent-green"
              >
                <RightArrowIcon className="inline-block rotate-180 text-lg" />
                Back
              </button>

              <div className="ml-auto w-fit text-sm">
                <Connect />
              </div>
            </div>
            <div className="md:max-w-2xl lg:mx-auto">
              <h2 className="mb-4 text-center font-agrandir font-bold text-foreground-primary">
                Make a Difference Today
              </h2>
              <p className="mb-10 text-center text-foreground-secondary">
                Your generous donation will help {campaign.beneficiary} achieve
                their goal of {campaign.target_amount} STRK. Every contribution
                counts!
              </p>
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-4">
                <div className="relative hidden h-[95px] w-[122px] flex-shrink-0 rounded-[8px] md:block lg:h-[130px] lg:w-[200px]">
                  {/* <Image
                    className="h-full w-full object-cover"
                    src={campaign.cover_photo}
                    alt=""
                    fill
                    sizes="100%"
                  /> */}
                  <img
                    className="h-full w-full rounded-[8px] object-cover"
                    src={campaign.cover_photo}
                    alt=""
                  />
                </div>
                <div className="col-span-2 tracking-wide text-foreground-primary">
                  <p className="line-clamp-3 text-clamp md:text-[1em]">
                    You are supporting{" "}
                    <span className="font-agrandir font-semibold">
                      {" "}
                      {campaign.campaign_name}
                    </span>
                  </p>
                  <p className="mt-2 line-clamp-2 text-[.875em]">
                    Your donation will directly help{" "}
                    <span className="font-agrandir font-semibold">
                      {campaign.beneficiary}
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="mx-auto mt-8 w-fit">
                <h5 className="mb-4 font-medium">Send STRK</h5>
                <div className="relative mx-auto h-[70px] w-[70px] rounded-full">
                  <img
                    className="h-full w-full rounded-full"
                    src={`${token === "STRK" ? "/strk.webp" : "/eth.svg"}`}
                    alt=""
                  />
                  <div className="absolute right-[-5%] top-[60%] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-theme-green">
                    <SendIcon />
                  </div>
                </div>
              </div>
              <div className="mx-auto flex flex-col gap-4 md:max-w-[500px]">
                <label className="">Enter Amount</label>

                <div
                  ref={divRef}
                  className="relative grid min-h-[7rem] w-full grid-cols-10 gap-5 rounded-[10px] border-[1px] border-solid bg-transparent focus:border-[2px] focus:border-[#159968] md:gap-0 lg:px-5"
                >
                  <input
                    onFocus={() => {
                      if (divRef.current && address) {
                        divRef.current.style.outline = "1px solid #159968";
                      }
                    }}
                    onBlur={() => {
                      if (divRef.current) {
                        divRef.current.style.outline = "none";
                      }
                    }}
                    disabled={!address}
                    type="text"
                    style={{
                      fontSize: `${fontSize}em`
                    }}
                    name="amount"
                    value={amount}
                    className="col-span-8 w-full bg-transparent py-5 placeholder:text-[1.5em] placeholder:text-foreground-secondary focus:outline-none xs:col-span-6 lg:col-span-7 xl:col-span-8"
                    placeholder="0.00"
                    onChange={handleInputChange}
                  />
                  <p className="absolute bottom-[.5rem] left-6 text-foreground-secondary">
                    Balance:{parseFloat(balance).toFixed(2)} STRK
                  </p>
                  <div className="relative col-span-2 mt-[1.5rem] flex flex-col items-center gap-4 md:col-start-8 lg:col-start-auto">
                    <div className="relative w-full">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        disabled={!address}
                        className="flex w-[6.5rem] items-center gap-1 rounded-full border-[1px] border-solid border-gray-400 bg-transparent px-3 py-1.5 text-[.875em]"
                      >
                        <img
                          src={token === "STRK" ? "/strk.webp" : "/eth.svg"}
                          alt={token}
                          className="h-5 w-5 rounded-full"
                        />
                        {token}
                        <span
                          className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                        >
                          <DownChevronIcon />
                        </span>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute left-0 top-full z-10 mt-1 w-full min-w-[120px] rounded-lg border border-gray-200 bg-white shadow-lg">
                          {tokens.map((t) => (
                            <button
                              key={t.symbol}
                              onClick={() => {
                                setToken(t.symbol);
                                setIsDropdownOpen(false);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100"
                            >
                              <img
                                src={t.icon}
                                alt={t.symbol}
                                className="h-5 w-5 rounded-full"
                              />
                              {t.symbol}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  disabled={!amount || sendingState === "sending..."}
                  onClick={handleDonateClick}
                  className={`w-full rounded-[10px] px-6 py-3 text-white ${
                    sendingState === "failed" ? "bg-red/80" : "bg-accent-green"
                  }`}
                >
                  {sendingState}
                </button>
              </div>
            </div>
          </div>
          <DonationSuccessModal
            isOpen={sendingState === "sent"}
            onClose={() => {
              setSendingState("send");
              handleRouteToCampaign();
            }}
            amount={amount}
            campaignDetails={{
              name: campaign.campaign_name,
              beneficiary: campaign.beneficiary,
              image: campaign.cover_photo
            }}
          />
        </main>
      )}
    </>
  );
};

export default Donate;
