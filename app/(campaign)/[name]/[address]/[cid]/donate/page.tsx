"use client";

import Connect from "@/app/components/Connect";
import { H2 } from "@/app/components/util/Headers";
import { fetchBalance, fetchCampaign, handleDonate } from "@/app/utils/helper";
import Logo from "@/svgs/Logo";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import SendIcon from "@/svgs/SendIcon";
import { useAccount } from "@starknet-react/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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
    "send" | "sending..." | "sent"
  >("send");
  const { account, address } = useAccount();
  const [balance, setBalance] = useState("0");

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

  useEffect(() => {
    if (params.address && params.cid) {
      fetchCampaign(params.cid, null, null, setCampaignDetails, null);
    }
  }, []);

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

  const handleTokenSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setToken(event.target.value);
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

  return (
    <section className="flex min-h-screen w-screen justify-between bg-background md:bg-theme-green">
      <div className="hidden w-[40%] flex-col items-center p-4 md:flex">
        <button
          onClick={handleRouteToCampaign}
          className="flex w-fit items-center self-start justify-self-start text-[1.2em] text-white"
        >
          <span className="inline-block rotate-180 transform text-white">
            <RightArrowIcon />
          </span>
          <span>campaign</span>
        </button>
        <div className="my-auto">
          <p className="text-[1.5em] font-bold text-white">
            <Logo />
          </p>

          <H2 style="text-theme-yellow">Every Token Counts!</H2>
          <div className="flex items-center gap-2 text-white">
            <p className="mt-3">Empowering Change Through Generosity</p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[500px] flex-col gap-10 bg-background px-4 py-10 md:w-[60%] md:max-w-none md:gap-20 md:rounded-tl-[50px] md:shadow-hero-shadow lg:px-[5vw] lg:py-10">
        <div className="flex flex-wrap items-center justify-between md:justify-end">
          <button
            onClick={handleRouteToCampaign}
            className="block w-fit self-start justify-self-start text-[1em] md:hidden md:text-[1.2em]"
          >
            &lt; campaign
          </button>
          <Connect />
        </div>
        <div className="mx-auto flex w-full flex-col gap-4 px-4 md:my-auto lg:w-[75%] lg:min-w-[35rem] lg:px-12">
          <div className="md:hidden">
            <p className="flex items-center gap-1 text-[1.5em] font-bold text-theme-green">
              <Logo />
            </p>
            <h2 className="text-theme-yellow">Every Token Counts!</h2>
          </div>
          <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-3 md:gap-4">
            <div className="relative hidden h-[90px] w-[130px] rounded-[5px] md:block">
              <Image
                className="h-full w-full rounded-[5px] object-cover"
                src={campaignDetails.image}
                alt=""
                fill
                sizes="100%"
              />
            </div>
            <div className="col-span-2">
              <p className="text-clamp md:text-[1em]">
                You are supporting{" "}
                <span className="font-semibold"> {campaignDetails.name}</span>
              </p>
              <p className="mt-2 text-[.875em]">
                Your donation will benefit{" "}
                <span className="font-semibold">
                  {campaignDetails.beneficiary}
                </span>
              </p>
            </div>
          </div>
          <div className="mx-auto mt-8 w-fit">
            <h5 className="font-medium">Send STRK</h5>
            <div className="relative mx-auto h-[70px] w-[70px] rounded-full">
              <img
                className="h-full w-full rounded-full"
                src={`${token === "STRK" ? "/strk.webp" : "/eth.svg"}`}
                alt=""
              />
              <div className="absolute right-[-10%] top-[60%] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-theme-green">
                <SendIcon />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-medium">Enter your donation</label>

            <div
              ref={divRef}
              className="relative grid min-h-[5.5rem] w-full grid-cols-10 justify-between rounded-[10px] border-[1px] border-solid border-gray-300 bg-transparent px-5 focus:border-[2px] focus:border-[#159968]"
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
                className="col-span-8 w-full bg-transparent py-5 focus:outline-none"
                placeholder="0"
                onChange={handleInputChange}
              />
              <div className="relative col-span-2 mt-[1.5rem] flex flex-col items-center gap-4">
                <select
                  disabled={!address}
                  onChange={handleTokenSelect}
                  className="w-fit rounded-full border-[1px] border-solid border-gray-400 bg-transparent text-[.875em]"
                  name="token"
                >
                  <option value="STRK">STRK</option>
                </select>
                <p className="absolute bottom-[.5rem] right-0 min-w-[120px] text-[.75em]">
                  Balance: {parseFloat(balance).toFixed(2)} STRK
                </p>
              </div>
            </div>
            <button
              disabled={!amount || sendingState === "sent"}
              onClick={async (e) => {
                e.preventDefault();
                await handleDonate(
                  amount,
                  account,
                  setSendingState,
                  campaignDetails.address,
                  handleRouteToCampaign
                );
              }}
              className="w-full rounded-[10px] bg-theme-green px-6 py-3 text-white"
            >
              {sendingState}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
