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
import { CREATE_CAMPAIGN_ABI } from "@/abi/createCampaign.abi";
import { generateRandomInt } from "@/util";
import { useMutation } from "@apollo/client";
import { CREATE_CAMPAIGN } from "@/graphql/mutations";
import ReviewCampaign from "./components/ReviewCampaign";
import Link from "next/link";

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
    // resolver: zodResolver(StepTwoSchema)
  });

  const stepThreeForm = useForm<StepThreeFields>({
    // resolver: zodResolver(StepThreeSchema)
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
  const router = useRouter();

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
    location,
    additionalImages,
    category = 1
  }: {
    name: string;
    description: string;
    image: null | File;
    target: number;
    organizer: string;
    beneficiary: string;
    location: string;
    socials: { [key: string]: string };
    additionalImages: File[];
    category?: number;
  }) {
    console.log("🚀 Starting campaign creation process...");
    console.log("📋 Campaign details:", {
      name,
      description: description.substring(0, 50) + "...",
      target,
      organizer,
      beneficiary,
      location,
      category,
      hasImage: !!image,
      additionalImagesCount: additionalImages?.length || 0,
      socialsCount: Object.keys(socials || {}).length
    });

    try {
      // Step 1: Validate contract and account
      console.log("🔍 Step 1: Validating contract and account...");
      if (!createCampaignContract) {
        console.error("❌ Campaign contract not initialized");
        throw new Error("Campaign contract not initialized");
      }
      console.log("✅ Campaign contract validated");

      if (!account) {
        console.error("❌ No wallet account found");
        throw new Error("Please connect your wallet to continue");
      }
      console.log("✅ Wallet account validated:", account.address);

      setCreatingCampaign(true);
      setLoadingPercentage(20);

      // Step 2: Generate campaign ID and salt
      console.log("🔢 Step 2: Generating campaign ID and salt...");
      const campaignId = generateRandomInt(6);
      const salt = generateRandomInt(4);
      console.log("✅ Generated campaign ID:", campaignId, "and salt:", salt);

      let bannerUrl = "";
      let additionalImagesUrls = [];

      // Step 3: Upload banner image
      if (image) {
        console.log("📤 Step 3: Uploading banner image...");
        try {
          const formData = new FormData();
          formData.append("files", image);
          console.log("📁 Image file details:", {
            name: image.name,
            size: image.size,
            type: image.type
          });

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_TOKEN_GIVER_BACKEND_URL}/image`,
            {
              method: "POST",
              body: formData
            }
          );

          console.log("📡 Banner upload response status:", response.status);

          if (response.ok) {
            const result = await response.json();
            bannerUrl = result[0].url;
            console.log("✅ Banner upload successful:", {
              url: bannerUrl,
              result: result
            });
          } else {
            const errorText = await response.text();
            console.error("❌ Banner upload failed:", {
              status: response.status,
              statusText: response.statusText,
              error: errorText
            });
            throw new Error(
              `Banner upload failed: ${response.status} ${response.statusText}`
            );
          }
        } catch (uploadError) {
          console.error("❌ Banner upload error:", uploadError);
          throw new Error(
            `Failed to upload banner image: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`
          );
        }
      } else {
        console.log("ℹ️ No banner image provided, skipping upload");
      }

      setLoadingPercentage(40);

      // Step 4: Upload additional images
      if (additionalImages && additionalImages.length > 0) {
        console.log("📤 Step 4: Uploading additional images...");
        console.log("📁 Additional images count:", additionalImages.length);

        try {
          const additionalFormData = new FormData();
          additionalImages.forEach((image, index) => {
            additionalFormData.append("files", image);
            console.log(`📁 Additional image ${index + 1}:`, {
              name: image.name,
              size: image.size,
              type: image.type
            });
          });

          const additionalResponse = await fetch(
            `${process.env.NEXT_PUBLIC_TOKEN_GIVER_BACKEND_URL}/image`,
            {
              method: "POST",
              body: additionalFormData
            }
          );

          console.log(
            "📡 Additional images upload response status:",
            additionalResponse.status
          );

          if (additionalResponse.ok) {
            const additionalResult = await additionalResponse.json();
            additionalImagesUrls = additionalResult.map(
              (item: any) => item.url
            );
            console.log("✅ Additional images upload successful:", {
              urls: additionalImagesUrls,
              result: additionalResult
            });
          } else {
            const errorText = await additionalResponse.text();
            console.error("❌ Additional images upload failed:", {
              status: additionalResponse.status,
              statusText: additionalResponse.statusText,
              error: errorText
            });
            throw new Error(
              `Additional images upload failed: ${additionalResponse.status} ${additionalResponse.statusText}`
            );
          }
        } catch (uploadError) {
          console.error("❌ Additional images upload error:", uploadError);
          throw new Error(
            `Failed to upload additional images: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`
          );
        }
      } else {
        console.log("ℹ️ No additional images provided, skipping upload");
      }

      setLoadingPercentage(60);

      // Step 5: Execute blockchain transaction
      console.log("⛓️ Step 5: Executing blockchain transaction...");
      try {
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

        console.log("📝 Populated transaction call:", {
          method: "create_campaign",
          params: [
            TOKEN_GIVER_Nft_CONTRACT_ADDRESS,
            REGISTRY_HASH,
            IMPLEMENTATION_HASH,
            salt,
            account.address
          ]
        });

        console.log("🔄 Executing transaction...");
        const result = await account.execute(createCampaignCall);
        console.log("✅ Blockchain transaction successful:", result);
      } catch (blockchainError) {
        console.error("❌ Blockchain transaction failed:", blockchainError);
        throw new Error(
          `Blockchain transaction failed: ${blockchainError instanceof Error ? blockchainError.message : "Unknown error"}`
        );
      }

      setLoadingPercentage(80);

      // Step 6: Create campaign in database
      console.log("💾 Step 6: Creating campaign in database...");
      try {
        const campaignData = {
          campaign_id: campaignId,
          campaign_name: name,
          campaign_description: description,
          cover_photo: bannerUrl,
          campaign_images: additionalImagesUrls,
          social_links: socials,
          target_amount: target,
          organizer: organizer,
          beneficiary: beneficiary,
          location,
          category_id: category
        };

        console.log("📊 Campaign data for database:", campaignData);

        const dbResult = await createCampaign({
          variables: {
            campaignData
          }
        });

        console.log("✅ Database creation successful:", dbResult);
      } catch (dbError) {
        console.error("❌ Database creation failed:", dbError);
        throw new Error(
          `Failed to create campaign in database: ${dbError instanceof Error ? dbError.message : "Unknown error"}`
        );
      }

      setLoadingPercentage(100);
      console.log("🎉 Campaign creation completed successfully!");

      return { success: true, campaignId };
    } catch (error) {
      console.error("💥 Campaign creation failed:", error);
      setLoadingPercentage(0);

      if (error instanceof Error) {
        console.error("📝 Error details:", {
          message: error.message,
          stack: error.stack
        });
        throw error;
      } else {
        console.error("📝 Unknown error type:", error);
        throw new Error(
          "An unexpected error occurred while creating the campaign"
        );
      }
    } finally {
      console.log("🏁 Cleaning up campaign creation state...");
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
      formData.customLinks.forEach(({ url }, index) => {
        if (url) {
          links.push({ name: `website ${index + 1}`, url });
        }
      });
    }

    return links;
  };

  const onSubmit = async (data: FormData) => {
    console.log("data in onSubmit", data);

    if (currentStep === 3) {
      const links = transformLinks(formData);

      handleCreateCampaign({
        name: formData.name,
        description: formData.description,
        image: formData.bannerImage,
        target: Number(formData.target),
        organizer: formData.organiser,
        beneficiary: formData.beneficiary,
        location: formData.location,
        socials: Object.fromEntries(links.map((link) => [link.name, link.url])),
        additionalImages: formData.additionalImages,
        category: Number(formData.category)
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
        // console.log("Updated form data in review:", updatedData);
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
      <div className="min-h-screen lg:grid lg:grid-cols-9">
        <div className="col-span-3 bg-accent-green">
          <div className="relative h-full max-h-screen w-full">
            <Image
              src="/create-bg.png"
              alt="Background description"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="p-4 md:p-8 lg:col-span-6">
          <div className="mx-auto flex h-full max-w-4xl flex-col gap-8">
            <div className="mx-auto flex w-full max-w-2xl items-center justify-between lg:max-w-none">
              {currentStep === 3 ? (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex animate-fadeIn items-center text-accent-green"
                >
                  <span className="inline-block rotate-180 text-lg">
                    <RightArrowIcon />
                  </span>
                </button>
              ) : (
                <button onClick={() => router.back()}>
                  {" "}
                  <span className="inline-block rotate-180 text-lg">
                    <RightArrowIcon />
                  </span>
                </button>
              )}
              <div className="ml-auto w-fit text-sm">
                <Connect />
              </div>
            </div>

            <div className="w-full flex-1 2xl:flex 2xl:items-center 2xl:justify-center">
              <div className="h-full w-full space-y-4 2xl:max-h-[896px]">
                <Stepper currentStep={currentStep} />
                <div className="mx-auto max-w-2xl">
                  <h2 className="font-agrandir font-bold text-foreground-primary">
                    Create your Campaign
                  </h2>
                  <p className="text-foreground-secondary">
                    Fill in the appropriate details for your campaign and let's
                    get started.
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
          </div>
        </div>
      </div>

      <ReviewCampaign
        setShowReview={setShowReview}
        showReview={showReview}
        createCampaign={handleCreation}
        formData={formData}
        creatingCampaign={creatingCampaign}
        loadingPercentage={loadingPercentage}
      />
    </>
  );
};

export default Page;
