import { InputDateType } from "@/types";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit
} from "react-hook-form";
import Dropzone from "./Dropzone";
import PictureIcon from "@/svgs/PictureIcon";
import { CreateCampaignType } from "../page";
import { useState } from "react";

interface StepTwoProps {
  disabled: boolean;
  onNextStep: () => void;
  register: UseFormRegister<CreateCampaignType>;
  errors: FieldErrors<CreateCampaignType>;
  handleSubmit: UseFormHandleSubmit<CreateCampaignType>;
}

const StepTwo = ({
  disabled,
  onNextStep,
  register,
  errors,
  handleSubmit
}: StepTwoProps) => {
  const [bannerImageName, setBannerImageName] = useState<string>("");
  const [additionalImageNames, setAdditionalImageNames] = useState<string[]>(
    []
  );

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImageName(file.name);
      const event = {
        target: {
          name: "bannerImage",
          value: file
        }
      };
      register("bannerImage").onChange(event);
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    setAdditionalImageNames(files.map((file) => file.name));
  };
  console.log(errors);

  return (
    <fieldset
      className={`mx-auto h-[60vh] max-w-2xl animate-fadeIn space-y-6 overflow-y-scroll pb-8 ${
        disabled ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Campaign Name <span className="text-[#FF8A25]">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          disabled={disabled}
          className={`w-full rounded-[7px] border ${
            errors.name ? "border-red" : "border-[#DAE0E6]"
          } px-3 py-3 placeholder:text-sm focus:ring-1 focus:ring-accent-green`}
          placeholder="Enter campaign name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description <span className="text-[#FF8A25]">*</span>
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={4}
          disabled={disabled}
          className={`w-full rounded-[7px] border ${
            errors.description ? "border-red" : "border-[#DAE0E6]"
          } px-3 py-3 placeholder:text-sm focus:ring-1 focus:ring-accent-green`}
          placeholder="Describe your campaign (minimum 50 characters)"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="bannerImage"
          className="block text-sm font-medium text-gray-700"
        >
          Banner Image (Recommended: 1920x1080px){" "}
          <span className="text-[#FF8A25]">*</span>
        </label>
        <div className="flex w-full items-center justify-center">
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-[1.5px] border-dashed border-[#DAE0E6] hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <PictureIcon />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG or WebP (MAX. 5MB)
              </p>
              {bannerImageName && (
                <p className="mt-2 text-sm text-gray-600">{bannerImageName}</p>
              )}
            </div>
            <input
              {...register("bannerImage")}
              id="bannerImage"
              type="file"
              className="hidden"
              disabled={disabled}
              accept="image/jpeg,image/png,image/webp"
              onChange={handleBannerImageChange}
            />
          </label>
        </div>
        {errors.bannerImage && (
          <p className="mt-1 text-sm text-red">{errors.bannerImage.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p>Additional Campaign Images</p>
          <label className="cursor-pointer text-green-500 hover:text-accent-green/80">
            <span>choose files</span>
            <input
              {...register("additionalImages")}
              type="file"
              className="hidden"
              multiple
              accept="image/jpeg,image/png,image/webp"
              disabled={disabled}
              onChange={handleAdditionalImagesChange}
            />
          </label>
          <p className="text-foreground-secondary">(Limit of 5 images)</p>
        </div>
        {additionalImageNames.length > 0 && (
          <div className="mt-2 space-y-1">
            {additionalImageNames.map((name, index) => (
              <p key={index} className="text-sm text-gray-600">
                {name}
              </p>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          onNextStep();
        }}
        type="button"
        disabled={disabled}
        className={`w-full rounded-[7px] bg-accent-green px-2 py-3 text-white ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      >
        Continue
      </button>
    </fieldset>
  );
};

export default StepTwo;
