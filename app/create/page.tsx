"use client";
import { useEffect, useState } from "react";
import { useAccount, useContract } from "@starknet-react/core";
import StepTwo from "./components/StepTwo";
import { InputDateType } from "@/types";
import StepThree from "./components/StepThree";
import { Call, CallData } from "starknet";
import {
  BEARER_TOKEN,
  CAMPAIGN_CONTRACT_ADDRESS,
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
import ReviewCampaign from "../(campaign)/[name]/[address]/[cid]/ReviewCampaign";
import { CREATE_CAMPAIGN_ABI } from "@/abi/createCampaign.abi";
import { generateRandomInt } from "@/util";
import { useMutation } from "@apollo/client";
import { CREATE_CAMPAIGN } from "@/graphql/mutations";

// Create union type of both schema types
type FormData = z.infer<typeof StepTwoSchema> | z.infer<typeof StepThreeSchema>;

// Create union type for all form fields
export type StepTwoFields = z.infer<typeof StepTwoSchema>;
export type StepThreeFields = z.infer<typeof StepThreeSchema>;
export type AllFormFields = StepTwoFields & StepThreeFields;

const Page = () => {
  const { address, account } = useAccount();

  const [campaignStep, setCampaignStep] = useState(0);
  const [creatingCampaign, setCreatingCampaign] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [campaignUrl, setCampaignUrl] = useState("/");
  const [currentStep, setCurrentStep] = useState(1);
  const [showReview, setShowReview] = useState(false);

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
    watch,
    setValue
  } = currentForm;

  const currentValues = watch();

  const handleNextStep = async () => {
    const isValid = await stepTwoForm.trigger();
    if (isValid) {
      const stepTwoData = stepTwoForm.getValues();
      // Update formData with Step Two values
      setFormData((prev) => ({
        ...prev,
        name: stepTwoData.name,
        description: stepTwoData.description,
        bannerImage: stepTwoData.bannerImage,
        additionalImages: stepTwoData.additionalImages,
        category: stepTwoData.category
      }));
      setCurrentStep(3);
    }
  };

  const { contract: createCampaignContract } = useContract({
    abi: CREATE_CAMPAIGN_ABI,
    address: CAMPAIGN_CONTRACT_ADDRESS
  });

  const [createCampaign] = useMutation(CREATE_CAMPAIGN);

  async function handleCreateCampaign({
    image,
    name,
    description,
    beneficiary,
    organizer,
    target,
    socials,
    location
  }: {
    name: string;
    description: string;
    image: null | File;
    target: number;
    organizer: string;
    beneficiary: string;
    location: string;
    socials: { [key: string]: string };
  }) {
    try {
      setCreatingCampaign(true);
      setLoadingPercentage(10);

      if (!createCampaignContract) {
        throw new Error("Campaign contract not initialized");
      }

      if (!account) {
        throw new Error("Please connect your wallet to continue");
      }

      const campaignId = generateRandomInt(6);
      const salt = generateRandomInt(4);

      setLoadingPercentage(30);
      const { data, errors } = await createCampaign({
        variables: {
          campaignData: {
            campaign_id: campaignId,
            campaign_name: name,
            campaign_description: description,
            cover_photo: "https://picsum.photos/500/300",
            social_links: socials,
            target_amount: target,
            organizer: organizer,
            beneficiary: beneficiary
          }
        }
      });

      if (errors?.length) {
        throw new Error(`Database error: ${errors[0].message}`);
      }

      if (!data) {
        throw new Error("Failed to create campaign in database");
      }

      setLoadingPercentage(60);

      const createCampaignCall: Call = createCampaignContract.populate(
        "create_campaign",
        [
          TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
          REGISTRY_HASH,
          IMPLEMENTATION_HASH,
          salt,
          account.address
        ]
      );

      setLoadingPercentage(80);
      const result = await account.execute(createCampaignCall);

      if (!result) {
        throw new Error("Failed to execute campaign creation transaction");
      }

      setLoadingPercentage(100);
      return { success: true, campaignId };
    } catch (error) {
      setLoadingPercentage(0);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          "An unexpected error occurred while creating the campaign"
        );
      }
    } finally {
      setCreatingCampaign(false);
    }
  }

  const transformLinks = (formData: z.infer<typeof StepThreeSchema>) => {
    const links: { name: string; url: string }[] = [];

    // Add predefined socials
    if (formData.socials) {
      Object.entries(formData.socials).forEach(([name, url]) => {
        if (url) {
          links.push({ name, url });
        }
      });
    }

    // Add custom links
    if (formData.customLinks) {
      formData.customLinks.forEach(({ url }) => {
        if (url) {
          links.push({ name: "website", url });
        }
      });
    }

    return links;
  };

  const onSubmit = async (data: FormData) => {
    if (currentStep === 3) {
      const stepThreeData = data as StepThreeFields;
      const finalFormData = { ...formData, ...stepThreeData };
      const links = transformLinks(finalFormData);
      console.log("Complete form data:", finalFormData);
      console.log(links);

      handleCreateCampaign({
        name: finalFormData.name,
        description: finalFormData.description,
        image: finalFormData.bannerImage,
        target: Number(finalFormData.target),
        organizer: finalFormData.organiser,
        beneficiary: finalFormData.beneficiary,
        location: finalFormData.location,
        socials: Object.fromEntries(links.map((link) => [link.name, link.url]))
      });
    }
  };

  const handleCreation = handleSubmit(onSubmit);

  const isWalletConnected = !!address;

  useEffect(() => {
    if (address && currentStep === 1) {
      setCurrentStep(2);
    } else if (!address) {
      setCurrentStep(1);
    }
  }, [address]);

  const handleReview = async () => {
    const isValid = await stepThreeForm.trigger();
    if (isValid) {
      const stepThreeData = stepThreeForm.getValues();
      // Preserve all existing data and only update Step 3 fields
      setFormData((prev) => {
        const updatedData = {
          ...prev, // Keep all previous data (including Step 2)
          target: stepThreeData.target,
          location: stepThreeData.location,
          organiser: stepThreeData.organiser,
          beneficiary: stepThreeData.beneficiary,
          socials: stepThreeData.socials,
          customLinks: stepThreeData.customLinks
        };
        console.log("Updated form data in review:", updatedData);
        return updatedData;
      });
      setShowReview(true);
    }
  };
  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);
  return (
    <>
      <main className="grid h-screen grid-cols-7 2xl:h-[calc(100vh-39.1rem)]">
        <div className="relative col-span-3 hidden h-full place-content-center bg-accent-green lg:grid">
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

            <form className="">
              {currentStep !== 3 && (
                <StepTwo
                  disabled={!isWalletConnected || currentStep === 1}
                  onNextStep={handleNextStep}
                  register={register as UseFormRegister<StepTwoFields>}
                  errors={errors as FieldErrors<StepTwoFields>}
                  currentValues={currentValues as StepTwoFields}
                  setValue={stepTwoForm.setValue}
                />
              )}

              {currentStep === 3 && (
                <StepThree
                  register={register as UseFormRegister<StepThreeFields>}
                  errors={errors as FieldErrors<StepThreeFields>}
                  disabled={!isWalletConnected}
                  onReview={handleReview}
                />
              )}
            </form>
          </div>
        </div>
      </main>

      <ReviewCampaign
        setShowReview={setShowReview}
        showReview={showReview}
        createCampaign={handleCreation}
        formData={formData}
        creatingCampaign={creatingCampaign}
      />
    </>
  );
};

export default Page;
