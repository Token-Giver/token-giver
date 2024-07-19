"use client";
import { ChangeEvent, useEffect, useState } from "react";
import ConnectButton from "../components/ConnectButton";
import { useAccount } from "@starknet-react/core";
import StepTwo from "./components/StepTwo";
import { InputDateType } from "@/types";
import StepThree from "./components/StepThree";
import Logo from "@/svgs/Logo";
import campaign_contract_abi from "../../public/abi/campaign_abi.json";
import nft_contract_abi from "../../public/abi/nft_abi.json";
import { CallData, Contract, RpcProvider, cairo } from "starknet";
import {
  CAMPAIGN_CONTRACT_ADDRESS,
  IMPLEMENTATION_HASH,
  REGISTRY_HASH,
  TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
  bearer,
} from "../utils/data";
const Page = () => {
  const account: any = useAccount();
  const [step, setStep] = useState({
    number: 1,
    text: "First connect your wallet",
  });
  const [inputData, setInputData] = useState<InputDateType>({
    name: "",
    description: "",
    image: null,
    target: "",
    organizer: "",
    beneficiary: "",
    location: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputData((prev) => {
      if (
        name === "image" &&
        e.target instanceof HTMLInputElement &&
        e.target.files
      ) {
        return {
          ...prev,
          image: e.target.files[0],
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  let campaign_contract = new Contract(
    campaign_contract_abi,
    CAMPAIGN_CONTRACT_ADDRESS,
    provider
  );

  let nft_contract = new Contract(
    nft_contract_abi,
    TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
    provider
  );

  useEffect(() => {
    async function dfs() {
      const campaignnnn = await campaign_contract.get_campaigns();

      console.log(campaignnnn, "all campaigns");
    }

    dfs();
  }, []);

  async function testCreate() {
    try {
      campaign_contract.connect(account.account);
      const last_minted_id = await nft_contract.get_last_minted_id();
      const salt = Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0");
      console.log(salt, "salt");

      // CREATE CAMAPAIGN -> campaign address
      const create_campaign_res = await campaign_contract.create_campaign(
        CallData.compile([
          TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
          REGISTRY_HASH,
          IMPLEMENTATION_HASH,
          salt,
          account.address,
        ])
      );
      const txnDet = await provider.waitForTransaction(
        create_campaign_res.transaction_hash
      );
      console.log(txnDet, "txn details");
      console.log(create_campaign_res, "create campaign response");

      // Upload Campaign NFT image to pinata
      if (!inputData.image) {
        alert("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", inputData.image);

      const image_upload_res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
          body: formData,
        }
      );

      const image_upload_resData = await image_upload_res.json();
      console.log(image_upload_resData, "image upload response");

      // Create new Metadata URI JSON
      let new_metadata = JSON.stringify({
        id: Number(last_minted_id) + 1,
        image: `ipfs://${image_upload_resData.IpfsHash}/`,
        name: inputData.name,
        description: inputData.description,
        target: inputData.target,
        organizer: inputData.organizer,
        beneficiary: inputData.beneficiary,
        location: inputData.location,
        campaign_address: txnDet.events.at(1).from_address,
      });

      // Upload new MetadataURI JSON to Pinata
      const metadata_upload_res = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearer}`,
          },
          body: new_metadata,
        }
      );

      const metadata_upload_resData = await metadata_upload_res.json();
      console.log(metadata_upload_resData, "uploaded metadata uri");

      // Call set_metadata_uri function
      campaign_contract.connect(account.account);
      const set_campaign_metadata_res =
        await campaign_contract.set_campaign_metadata_uri(
          CallData.compile([
            txnDet.events.at(1).from_address,
            `ipfs://${metadata_upload_resData.IpfsHash}/`,
          ])
        );

      console.log(set_campaign_metadata_res, "set campaign metadata response");
      const formatAnswer = {
        campaign_address: "string",
        campaign_owner: "string",
        metadata_URI: "string",
      };

      // const gvfdc = await campaign_contract.get_campaign(
      //   txnDet.events.at(1).from_address,
      //   { formatResponse: formatAnswer }
      // );

      // console.log(gvfdc, "hnndg");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (account.address) {
      setStep(() => {
        return {
          text: "Tell us about your campaign",
          number: 2,
        };
      });
    } else {
      setStep(() => {
        return {
          text: "First connect your wallet",
          number: 1,
        };
      });
    }
  }, [account.address]);

  return (
    <main className="min-h-screen  flex justify-between bg-theme-green md:mb-10 relative">
      <div className="w-[40%] items-center justify-center hidden md:flex">
        <div className="flex flex-col gap-8 p-4">
          <p className="font-bold text-white text-[1.5em]">
            <Logo />
          </p>

          <h2 className="text-amber-400">Start your fundraising journey!</h2>
          <div className="flex gap-2 items-center text-white">
            <span className="">
              <span className="text-[1.8em] mr-2">{step.number}</span>/ 3
            </span>
            <p className=" mt-3 ">{step.text}</p>
          </div>
        </div>
      </div>

      <div className=" w-full bg-off-white md:rounded-tl-[50px] md:shadow-hero-shadow py-10 px-4 lg:py-10 lg:px-20 md:w-[60%] flex flex-col justify-between ">
        <ConnectButton />
        <form className="flex flex-col gap-4  md:p-4" action="">
          <h2>Create your campaign</h2>
          <StepTwo
            inputData={inputData}
            handleInputChange={handleInputChange}
            address={account.address}
            step={step}
            setInputData={setInputData}
          />
          <StepThree
            inputData={inputData}
            handleInputChange={handleInputChange}
            address={account.address}
            step={step}
          />
        </form>
        <div
          className={`flex mt-4  md:p-4  ${
            step.number === 2 || step.number === 1
              ? "justify-end"
              : "justify-between"
          }`}
        >
          <button
            disabled={!account.address}
            onClick={() =>
              setStep(() => {
                return {
                  text: "Tell us about your campaign",
                  number: 2,
                };
              })
            }
            className={`text-theme-green text-[2em] ${
              step.number === 2 || step.number === 1 ? "hidden" : "block"
            } `}
          >
            <span>&lt;</span>
          </button>
          <div className="flex">
            <button
              disabled={
                !inputData.name || !inputData.description || !account.address
              }
              onClick={() =>
                setStep(() => {
                  return {
                    text: "Tell us about you and your goals",
                    number: 3,
                  };
                })
              }
              className={`bg-theme-green text-white py-2 px-6 rounded-[10px] w-fit justify-self-end self-end ${
                step.number === 3 ? "hidden" : "block"
              } `}
            >
              Continue
            </button>
            <button
              onClick={() => {
                testCreate();
              }}
              disabled={!inputData.target || !inputData.location}
              className={`bg-theme-green text-white py-2 px-6 rounded-[10px] w-fit justify-self-end self-end ${
                step.number === 3 ? "block" : "hidden"
              } `}
            >
              Mint a campaign
            </button>
          </div>
        </div>
      </div>

      <div className="bg-off-white h-[50px] p-8 w-full absolute bottom-[-64px] left-0 hidden md:block"></div>
    </main>
  );
};

export default Page;
