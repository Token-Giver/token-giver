"use client";
import { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import StepTwo from "./components/StepTwo";
import { InputDateType } from "@/types";
import StepThree from "./components/StepThree";
import { CallData } from "starknet";
import {
  BEARER_TOKEN,
  IMPLEMENTATION_HASH,
  REGISTRY_HASH,
  TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
  campaign_contract,
  nft_contract,
  provider
} from "../utils/data";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import { useRouter } from "next/navigation";
import Connect from "../components/Connect";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Stepper from "./components/Stepper";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { StepThreeSchema, StepTwoSchema } from "@/types/create";

// Create union type of both schema types
type FormData = z.infer<typeof StepTwoSchema> | z.infer<typeof StepThreeSchema>;

// Create union type for all form fields
export type StepTwoFields = z.infer<typeof StepTwoSchema> & {
  additionalImages?: FileList;
};
export type StepThreeFields = z.infer<typeof StepThreeSchema>;
export type AllFormFields = StepTwoFields & StepThreeFields;

const Page = () => {
  const { address } = useAccount();
  const account: any = useAccount();
  const [campaignStep, setCampaignStep] = useState(0);
  const [creatingCampaign, setCreatingCampaign] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [campaignUrl, setCampaignUrl] = useState("/");
  const [currentStep, setCurrentStep] = useState(1);
  const [showReview, setShowReview] = useState(false);

  const [inputData, setInputData] = useState<InputDateType>({
    name: "",
    description: "",
    image: null,
    target: "",
    organizer: "",
    beneficiary: "",
    location: ""
  });

  // Add state to store combined form data
  const [formData, setFormData] = useState<AllFormFields>({} as AllFormFields);

  // Create separate form instances for each step
  const stepTwoForm = useForm<StepTwoFields>({
    resolver: zodResolver(StepTwoSchema)
  });

  const stepThreeForm = useForm<StepThreeFields>({
    resolver: zodResolver(StepThreeSchema)
  });

  // Update how currentForm is used
  const currentForm = currentStep === 2 ? stepTwoForm : stepThreeForm;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = currentForm;

  const currentValues = watch();

  const handleNextStep = async () => {
    const isValid = await stepTwoForm.trigger();
    if (isValid) {
      const stepTwoData = stepTwoForm.getValues();
      setFormData((prev) => ({ ...prev, ...stepTwoData }));
      setCurrentStep(3);
    }
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
          account.address
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
            Authorization: `Bearer ${BEARER_TOKEN}`
          },
          body: formData
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
        created_at: new Date()
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
            Authorization: `Bearer ${BEARER_TOKEN}`
          },
          body: new_metadata
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
            `ipfs://${metadata_upload_resData.IpfsHash}/`
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
          location: ""
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

  const onSubmit = async (data: FormData) => {
    if (currentStep === 3) {
      const stepThreeData = data as StepThreeFields;
      const finalFormData = { ...formData, ...stepThreeData };
      console.log("Complete form data:", finalFormData);
      // createCampaign()
    }
  };

  const isWalletConnected = !!address;

  useEffect(() => {
    if (address && currentStep === 1) {
      setCurrentStep(2);
    } else if (!address) {
      setCurrentStep(1);
    }
  }, [address]);

  return (
    <>
      <main className="grid h-screen grid-cols-7 2xl:h-[calc(100vh-39.1rem)]">
        <div className="relative col-span-3 grid h-full place-content-center bg-accent-green">
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
        <div className="col-span-4 h-full space-y-8 overflow-y-auto px-16 pt-8">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            {currentStep === 3 && (
              <button
                onClick={() => setCurrentStep(2)}
                className="flex animate-fadeIn items-center text-accent-green"
              >
                <span className="inline-block rotate-180 text-lg">
                  <RightArrowIcon />
                </span>
                Back
              </button>
            )}
            <div className="ml-auto w-fit text-sm">
              <Connect />
            </div>
          </div>
          <div>
            <Stepper currentStep={currentStep} />
            <div className="mx-auto max-w-2xl">
              <h2 className="font-agrandir font-bold text-foreground-primary">
                Create your Campaign
              </h2>
              <p className="text-foreground-secondary">
                Fill in the appropriate details for your campaign and let's get
                started.
              </p>
            </div>

            <form className="" onSubmit={handleSubmit(onSubmit)}>
              {currentStep !== 3 && (
                <StepTwo
                  disabled={!isWalletConnected || currentStep === 1}
                  onNextStep={handleNextStep}
                  register={register as UseFormRegister<StepTwoFields>}
                  errors={errors as FieldErrors<StepTwoFields>}
                  currentValues={currentValues as StepTwoFields}
                />
              )}

              {currentStep === 3 && (
                <StepThree
                  register={register as UseFormRegister<StepThreeFields>}
                  errors={errors as FieldErrors<StepThreeFields>}
                  disabled={!isWalletConnected}
                />
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Review Overlay */}
    </>
  );
};

export default Page;
