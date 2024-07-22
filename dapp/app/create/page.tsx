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
import Container from "../components/util/Container";

const Creating_Campaign = [
  "Hang tight! Your campaign is being minted. This may take a few moments.",
  "Almost there! We're processing your campaign and will have it ready soon.",
  "Just a bit more patience! We're working hard to mint your campaign.",
  "Congratulations! Your campaign has been successfully minted.",
];
const Page = () => {
  const account: any = useAccount();
  const [campaignStep, setCampaignStep] = useState(0);
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

  async function testCreate() {
    try {
      campaign_contract.connect(account.account);
      const last_minted_id = await nft_contract.get_last_minted_id();
      const salt = Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0");

      // CREATE CAMPAIGN -> campaign address (nft)
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
      txnDet.isSuccess() && setCampaignStep(1);
      // console.log(txnDet, "txn details"); // execution_status: "SUCCEEDED"; minted campaign
      // console.log(create_campaign_res, "create campaign response");

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
      // console.log(image_upload_resData, "image upload response"); // IpfsHash: "QmTHJNYBspAccj5BmGUbA34eoWTLsxHTgvauFbKsggS5Tb" iploadinf info

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
        campaign_address:
          txnDet.isSuccess() && txnDet.events.at(1)?.from_address,
        created_at: new Date(),
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
      // console.log(metadata_upload_resData, "uploaded metadata uri"); // uploading image
      metadata_upload_resData.IpfsHash && setCampaignStep(2);

      // Call set_metadata_uri function
      campaign_contract.connect(account.account);
      const set_campaign_metadata_res =
        await campaign_contract.set_campaign_metadata_uri(
          CallData.compile([
            txnDet.isSuccess() && txnDet.events[1].from_address,
            `ipfs://${metadata_upload_resData.IpfsHash}/`,
          ])
        );

      // console.log(set_campaign_metadata_res, "set campaign metadata response");
      setInputData({
        name: "",
        description: "",
        image: null,
        target: "",
        organizer: "",
        beneficiary: "",
        location: "",
      });
      setCampaignStep(3);
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
      <button popoverTarget="creatingCampaign">click</button>
      <Container className="my-auto w-[40%] hidden md:flex">
        <div className="items-center justify-center ">
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
      </Container>

      <div className=" w-full bg-off-white md:rounded-tl-[50px] md:shadow-hero-shadow py-10 px-4 lg:py-10 lg:px-20 md:w-[60%] flex items-center ">
        <Container className=" flex flex-col justify-between">
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
                popoverTarget="creatingCampaign"
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
        </Container>
      </div>

      <div
        id="creatingCampaign"
        popover="auto"
        className="bg-transparent mx-auto my-auto flex flex-col justify-center items-center gap-4"
      >
        <div className="p-4">
          <div className="rounded-full w-fit h-fit bg-theme-green p-2 animate-scale-pulse">
            <span className="text-xl text-theme-yellow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill={"currentColor"}
                  d="M4 21h9.62a3.995 3.995 0 0 0 3.037-1.397l5.102-5.952a1 1 0 0 0-.442-1.6l-1.968-.656a3.043 3.043 0 0 0-2.823.503l-3.185 2.547l-.617-1.235A3.98 3.98 0 0 0 9.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2m0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 0 0 .442-.11l.003-.001l.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001c.01 0 .002-.001.002-.001h.001l.002-.001l.003-.001l.002-.001l.002-.001l.003-.001l.002-.001c.003 0 .001-.001.002-.001l.003-.002l.002-.001l.002-.001l.003-.001l.002-.001h.001l.002-.001h.001l.002-.001l.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 0 0 .11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186l-4.133 4.823a2.029 2.029 0 0 1-1.52.688H4zM16 2h-.017c-.163.002-1.006.039-1.983.705c-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 0 0 1.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0 0 16.002 2zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0 1 11.979 4c.025.001.502.032 1.067.485c.081.065.163.139.247.222l.707.707l.707-.707c.084-.083.166-.157.247-.222c.529-.425.976-.478 1.052-.484a.987.987 0 0 1 .701.292c.189.189.293.44.293.707"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-semibold">Minting your campaign</h2>
          <p>{Creating_Campaign[campaignStep]}</p>
        </div>
      </div>

      <div className="bg-off-white h-[50px] p-8 w-full absolute bottom-[-64px] left-0 hidden md:block"></div>
    </main>
  );
};

export default Page;
