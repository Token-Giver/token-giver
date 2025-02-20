"use client";

import RightArrowIcon from "@/svgs/RightArrowIcon";
import WarningIcon from "@/svgs/WarningIcon";
import { useRouter } from "next/navigation";

type Props = {
  campaignStep: number;
  percentage: number;
  url: string;
};

const Creating_Campaign = [
  "Hang tight! Your campaign is being minted. This may take a few moments.",
  "Almost there! We're processing your campaign and will have it ready soon.",
  "Just a bit more patience! We're working hard to mint your campaign.",
  "Congratulations! Your campaign has been successfully minted."
];

const CreateCampaignLoader = ({ campaignStep, percentage, url }: Props) => {
  const router = useRouter();
  return (
    <div
      id="creatingCampaign"
      popover="manual"
      className="mx-auto my-auto bg-transparent"
    >
      <div className="flex h-[90vh] flex-col items-center justify-center gap-4 bg-background p-4">
        <div className="">
          <div className="h-fit w-fit animate-scale-pulse rounded-full bg-theme-green p-2">
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
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-semibold">Minting your campaign</h2>
          <div className="relative mb-2 h-[.15rem] w-full">
            <div className="mb-4 h-[.15rem] w-full rounded-full bg-[#127c5548]"></div>
            <div
              style={{
                width: `${percentage}%`
              }}
              className={`absolute top-0 mb-4 h-[.15rem] rounded-full bg-theme-green transition-all duration-500`}
            ></div>
          </div>
          <p>{Creating_Campaign[campaignStep]}</p>
          {campaignStep === 3 && (
            <div className="mt-4 w-fit">
              <button
                onClick={() => {
                  const loadingPopover = document.querySelector(
                    "#creatingCampaign"
                  ) as HTMLElement;
                  // @ts-ignore
                  loadingPopover.hidePopover();
                  document.body.style.overflow = "auto";
                  router.push("/");
                }}
                className="flex w-full cursor-pointer items-center rounded-[10px] border-[1px] border-solid border-theme-green px-6 py-2 hover:bg-[#e4efe7]"
              >
                <span>view campaigns</span>
                <span className="text-theme-green">
                  <RightArrowIcon />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="flex items-center gap-1">
        <span>
          <WarningIcon />
        </span>
        <span>
          Warning: Please do not refresh, close, or navigate away. Your data
          might be lost.
        </span>
      </p>
    </div>
  );
};

export default CreateCampaignLoader;
