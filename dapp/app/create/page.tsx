"use client";
import { ChangeEvent, useEffect, useState } from "react";
import ConnectButton from "../components/ConnectButton";
import { useAccount } from "@starknet-react/core";
import StepTwo from "./components/StepTwo";
import { InputDateType } from "@/types";
import StepThree from "./components/StepThree";
import Logo from "@/svgs/Logo";
import { CallData } from "starknet";
import { useRouter } from "next/navigation";
import {
  BEARER_TOKEN,
  IMPLEMENTATION_HASH,
  REGISTRY_HASH,
  TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
  campaign_contract,
  nft_contract,
  provider,
} from "../utils/data";
import Container from "../components/util/Container";
import CreateCampaignLoader from "../components/loading/CreateCampaignLoader";

const Page = () => {
  const { address } = useAccount();
  const account: any = useAccount();
  const [campaignStep, setCampaignStep] = useState(0);
  const [creatingCampaign, setCreatingCampaign] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [campaignUrl, setCampaignUrl] = useState("/");
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

  async function createCampaign() {
    const loadingPopover = document.querySelector(
      "#creatingCampaign"
    ) as HTMLElement;
    // @ts-ignore
    loadingPopover.showPopover();
    document.body.style.overflow = "hidden";

    try {
      setCreatingCampaign(true);
      setLoadingPercentage(10);
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
      setLoadingPercentage(40);

      /////////////////////////////////////////
      // UPLOAD CAMPAIGN NFT IMAGE TO PINATA
      ////////////////////////////////////////
      if (!inputData.image) {
        alert("No Image selected");
        return;
      }
      const formData = new FormData();
      formData.append("file", inputData.image);

      const image_upload_res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
          body: formData,
        }
      );
      const image_upload_resData = await image_upload_res.json();
      setLoadingPercentage(60);

      //////////////////////////////////
      // CREATE NEW METADATA URI JSON
      //////////////////////////////////
      let tokenId = Number(last_minted_id) + 1;
      let new_metadata = JSON.stringify({
        id: tokenId,
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
      setCampaignUrl(`/campaign/${address}/${tokenId}`);
      ////////////////////////////////////////////
      // UPLOAD NEW METADATA_URI JSON TO PINATA
      ////////////////////////////////////////////
      const metadata_upload_res = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
          body: new_metadata,
        }
      );

      const metadata_upload_resData = await metadata_upload_res.json();

      metadata_upload_resData.IpfsHash && setCampaignStep(2);
      setLoadingPercentage(80);

      ///////////////////////////////////////
      // CALL SET_METADATA_URI FUNCTION
      //////////////////////////////////////
      campaign_contract.connect(account.account);
      const set_campaign_metadata_res =
        await campaign_contract.set_campaign_metadata_uri(
          CallData.compile([
            txnDet.isSuccess() && txnDet.events[1].from_address,
            `ipfs://${metadata_upload_resData.IpfsHash}/`,
          ])
        );

      setLoadingPercentage(100);
      setCampaignStep(3);
      setTimeout(() => {
        // @ts-ignore
        loadingPopover.hidePopover();
        document.body.style.overflow = "auto";
        setInputData({
          name: "",
          description: "",
          image: null,
          target: "",
          organizer: "",
          beneficiary: "",
          location: "",
        });
        setStep({
          number: 2,
          text: "Tell us about your campaign",
        });
      }, 10000);
    } catch (err) {
      // @ts-ignore
      loadingPopover.hidePopover();
      document.body.style.overflow = "auto";
    } finally {
      setCreatingCampaign(false);
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
      <Container className="my-auto w-[40%] hidden md:flex">
        <div className="items-center justify-center ">
          <div className="flex flex-col gap-8 p-4">
            <p className="font-bold text-white text-[1.5em]">
              <Logo />
            </p>

            <h2 className="text-theme-yellow">
              Start your fundraising journey!
            </h2>
            <div className="flex gap-2 items-center text-white">
              <span className="">
                <span className="text-[1.8em] mr-2">{step.number}</span>/ 3
              </span>
              <p className=" mt-3 ">{step.text}</p>
            </div>
          </div>
        </div>
      </Container>

      <div className=" w-full bg-background md:rounded-tl-[50px] md:shadow-hero-shadow py-10 px-4 lg:py-10 lg:px-20 md:w-[60%] flex items-center ">
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
                  createCampaign();
                }}
                disabled={
                  !inputData.target || !inputData.location || creatingCampaign
                }
                className={`bg-theme-green text-white py-2 px-6 rounded-[10px] w-fit justify-self-end self-end ${
                  step.number === 3 ? "block" : "hidden"
                } `}
              >
                {creatingCampaign ? "Creating Campaign..." : "Mint Campaign"}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <CreateCampaignLoader
        campaignStep={campaignStep}
        percentage={loadingPercentage}
        url={campaignUrl}
      />

      <div className="bg-background h-[50px] p-8 w-full absolute bottom-[-64px] left-0 hidden md:block"></div>
    </main>
  );
};

export default Page;
