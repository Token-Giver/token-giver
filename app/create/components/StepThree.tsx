import { UseFormRegister, FieldErrors } from "react-hook-form";
import { StepThreeFields, StepTwoFields } from "../page";
import {
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  DiscordIcon,
  FacebookIcon,
  GithubIcon,
  GlobeIcon,
  TelegramIcon,
  MediumIcon,
  XIcon
} from "@/svgs/social.icons";
import { useState } from "react";

interface StepThreeProps {
  disabled: boolean;
  register: UseFormRegister<StepTwoFields> | UseFormRegister<StepThreeFields>;
  errors: FieldErrors<StepTwoFields> | FieldErrors<StepThreeFields>;
  onReview: () => Promise<void>;
}

const predefinedSocialLinks = [
  {
    name: "twitter",
    icon: <XIcon />,
    placeholder: "https://twitter.com/username"
  },
  {
    name: "linkedin",
    icon: <LinkedinIcon />,
    placeholder: "https://linkedin.com/in/username"
  },
  {
    name: "instagram",
    icon: <InstagramIcon />,
    placeholder: "https://instagram.com/username"
  },
  {
    name: "youtube",
    icon: <YoutubeIcon />,
    placeholder: "https://youtube.com/@channel"
  },
  {
    name: "discord",
    icon: <DiscordIcon />,
    placeholder: "https://discord.gg/invite"
  },
  {
    name: "facebook",
    icon: <FacebookIcon />,
    placeholder: "https://facebook.com/username"
  },
  {
    name: "github",
    icon: <GithubIcon />,
    placeholder: "https://github.com/username"
  },
  {
    name: "telegram",
    icon: <TelegramIcon />,
    placeholder: "https://t.me/username"
  },
  {
    name: "medium",
    icon: <MediumIcon />,
    placeholder: "https://medium.com/@username"
  }
];

const StepThree = ({
  disabled,
  register,
  errors,
  onReview
}: StepThreeProps) => {
  const [selectedSocials, setSelectedSocials] = useState<string[]>([]);
  const [customLinkCount, setCustomLinkCount] = useState(1);

  const handleSocialSelect = (platform: string) => {
    setSelectedSocials((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleAddCustomLink = () => {
    setCustomLinkCount((prev) => prev + 1);
  };

  return (
    <fieldset
      className={`mx-auto h-auto max-w-2xl animate-fadeIn space-y-6 pb-8 md:overflow-y-auto ${
        disabled ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="space-y-2">
        <label
          htmlFor="target"
          className="block text-sm font-medium text-gray-700"
        >
          Fundraising Target <span className="text-[#FF8A25]">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            STRK
          </span>
          <input
            {...(register as UseFormRegister<StepThreeFields>)("target", {
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter numbers only"
              }
            })}
            type="text"
            inputMode="numeric"
            id="target"
            disabled={disabled}
            className={`w-full rounded-[7px] border pl-8 ${
              (errors as FieldErrors<StepThreeFields>).target
                ? "border-red"
                : "border-[#DAE0E6]"
            } py-3 pl-[3.3rem] pr-3 placeholder:text-sm focus:ring-1 focus:ring-accent-green`}
            placeholder="Enter target amount"
          />
        </div>
        {(errors as FieldErrors<StepThreeFields>).target && (
          <p className="mt-1 text-sm text-red">
            {(errors as FieldErrors<StepThreeFields>).target?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location <span className="text-[#FF8A25]">*</span>
        </label>
        <input
          {...(register as UseFormRegister<StepThreeFields>)("location")}
          type="text"
          id="location"
          disabled={disabled}
          className={`w-full rounded-[7px] border ${
            (errors as FieldErrors<StepThreeFields>).location
              ? "border-red"
              : "border-[#DAE0E6]"
          } px-3 py-3 placeholder:text-sm focus:ring-1 focus:ring-accent-green`}
          placeholder="Enter campaign location"
        />
        {(errors as FieldErrors<StepThreeFields>).location && (
          <p className="mt-1 text-sm text-red">
            {(errors as FieldErrors<StepThreeFields>).location?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="organiser"
          className="block text-sm font-medium text-gray-700"
        >
          Organiser Details <span className="text-[#FF8A25]">*</span>
        </label>
        <input
          {...(register as UseFormRegister<StepThreeFields>)("organiser")}
          type="text"
          id="organiser"
          disabled={disabled}
          className={`w-full rounded-[7px] border ${
            (errors as FieldErrors<StepThreeFields>).organiser
              ? "border-red"
              : "border-[#DAE0E6]"
          } px-3 py-3 placeholder:text-sm focus:ring-1 focus:ring-accent-green`}
          placeholder="Enter organiser name or organization"
        />
        {(errors as FieldErrors<StepThreeFields>).organiser && (
          <p className="mt-1 text-sm text-red">
            {(errors as FieldErrors<StepThreeFields>).organiser?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="beneficiary"
          className="block text-sm font-medium text-gray-700"
        >
          Beneficiary <span className="text-[#FF8A25]">*</span>
        </label>
        <input
          {...(register as UseFormRegister<StepThreeFields>)("beneficiary")}
          type="text"
          id="beneficiary"
          disabled={disabled}
          className={`w-full rounded-[7px] border ${
            (errors as FieldErrors<StepThreeFields>).beneficiary
              ? "border-red"
              : "border-[#DAE0E6]"
          } px-3 py-3 placeholder:text-sm focus:ring-1 focus:ring-accent-green`}
          placeholder="Enter beneficiary name or organization"
        />
        {(errors as FieldErrors<StepThreeFields>).beneficiary && (
          <p className="mt-1 text-sm text-red">
            {(errors as FieldErrors<StepThreeFields>).beneficiary?.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Social Links
        </label>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {predefinedSocialLinks.map((social) => (
              <button
                key={social.name}
                type="button"
                onClick={() => handleSocialSelect(social.name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedSocials.includes(social.name)
                    ? "bg-accent-green text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={disabled}
              >
                {social.icon}
                <span className="capitalize">{social.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {selectedSocials.map((platform) => {
              const social = predefinedSocialLinks.find(
                (s) => s.name === platform
              );
              if (!social) return null;

              return (
                <div key={platform} className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary">
                    {social.icon}
                  </span>
                  <input
                    {...(register as UseFormRegister<StepThreeFields>)(
                      `socials.${platform}` as keyof StepThreeFields
                    )}
                    type="url"
                    className="w-full rounded-[7px] border border-[#DAE0E6] px-3 py-3 pl-10 placeholder:text-sm focus:ring-1 focus:ring-accent-green"
                    placeholder={social.placeholder}
                    disabled={disabled}
                  />
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Additional Links
              </label>
              <button
                type="button"
                onClick={handleAddCustomLink}
                disabled={disabled}
                className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
              >
                <span className="text-lg">+</span>
                <span>Add Link</span>
              </button>
            </div>

            {Array.from({ length: customLinkCount }).map((_, index) => (
              <div key={`custom-${index}`} className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary">
                  <GlobeIcon />
                </span>
                <input
                  {...(register as UseFormRegister<StepThreeFields>)(
                    `customLinks.${index}.url`
                  )}
                  type="url"
                  className="w-full rounded-[7px] border border-[#DAE0E6] px-3 py-3 pl-10 placeholder:text-sm focus:ring-1 focus:ring-accent-green"
                  placeholder="https://example.com"
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onReview}
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

export default StepThree;
