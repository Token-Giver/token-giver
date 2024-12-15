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
	"Congratulations! Your campaign has been successfully minted.",
];

const CreateCampaignLoader = ({ campaignStep, percentage, url }: Props) => {
	const router = useRouter();
	return (
		<div
			id="creatingCampaign"
			popover="manual"
			className="bg-transparent mx-auto my-auto"
		>
			<div className="flex flex-col bg-background h-[90vh] justify-center items-center gap-4  p-4">
				<div className="">
					<div className="rounded-full w-fit h-fit p-2 animate-scale-pulse">
						<span className="text-xl text-theme-yellow">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="300 300 800 700" /* Adjusted ViewBox */
								width="200"
								height="100"
								role="img"
								aria-label="TokenGiver Logo"
							>
								{/* Background Circle */}
								<path
									fill="#00594c"
									d="M447.56,655.58c0-45.65,9.4-84.75,28.2-117.29,18.8-32.55,45-57.54,78.62-74.97,33.61-17.44,72.6-26.15,116.96-26.15,44.35,0,83.34,8.72,116.96,26.15,33.61,17.44,59.82,42.43,78.62,74.97,18.8,32.54,28.2,71.64,28.2,117.29,0,45.65-9.4,84.8-28.2,117.45-18.8,32.65-45.01,57.7-78.62,75.13-33.62,17.44-72.61,26.15-116.96,26.15-44.36,0-83.35-8.72-116.96-26.15-33.62-17.44-59.83-42.48-78.62-75.13-18.8-32.65-28.2-71.8-28.2-117.45Z"
								/>
								{/* Left Eye */}
								<path
									fill="#ffffff"
									d="M682.18,577.02c12.03-4.48,51.46-19.16,95.68,.61,30.32,13.56,74.14,48.35,71.09,86.15-1.41,17.52-12.37,29.17-14.25,31.11-19.15,19.73-48.08,11.64-60.8,8.09-20.63-5.77-33.23-17.81-44.9-28.96-5.86-5.6-17.47-16.69-15.24-22.43,1.98-5.12,14.05-3.61,16.77-3.27,9.92,1.24,14.93,5.26,24.46,10.25,14.88,7.78,32.44,16.95,43.63,8.82,.88-.64,5.63-4.09,7.02-10.28,3.54-15.83-17.91-36.23-34.4-45.75-24.39-14.07-49.05-10.77-60.13-9.13-30.62,4.55-57.27,21.45-73.68,11.8-1.38-.81-2.92-1.95-3.27-3.78-1.79-9.22,28.39-25.92,48.02-33.22Z"
								/>
								{/* Right Eye */}
								<path
									fill="#ffffff"
									d="M660.51,734.45c-12.03,4.48-51.46,19.16-95.68-.61-30.32-13.56-74.14-48.35-71.09-86.15,1.41-17.52,12.37-29.17,14.25-31.11,19.15-19.73,48.08-11.64,60.8-8.09,20.63,5.77,33.23,17.81,44.9,28.96,5.86,5.6,17.47,16.69,15.24,22.43-1.98,5.12-14.05,3.61-16.77,3.27-9.92-1.24-14.93-5.26-24.46-10.25-14.88-7.78-32.44-16.95-43.63-8.82-.88,.64-5.63,4.09-7.02,10.28-3.54,15.83,17.91,36.23,34.4,45.75,24.39,14.07,49.05,10.77,60.13,9.13,30.62-4.55,57.27-21.45,73.68-11.8,1.38,.81,2.92,1.95,3.27,3.78,1.79,9.22-28.39,25.92-48.02,33.22Z"
								/>
								{/* Yellow Circle */}
								<ellipse
									fill="#fde05d"
									cx="671.29"
									cy="655.82"
									rx="36.94"
									ry="17.24"
									transform="rotate(-28.9 671.29 655.82)"
								/>
							</svg>
						</span>
					</div>
				</div>
				<div className="text-center flex flex-col gap-4 items-center">
					<h2 className="font-semibold">Minting your campaign</h2>
					<div className="w-full h-[.15rem] mb-2 relative">
						<div className="w-full h-[.15rem] bg-[#127c5548] rounded-full mb-4"></div>
						<div
							style={{
								width: `${percentage}%`,
							}}
							className={`h-[.15rem] bg-theme-green rounded-full mb-4 top-0 transition-all duration-500 absolute`}
						></div>
					</div>
					<p>{Creating_Campaign[campaignStep]}</p>
					{campaignStep === 3 && (
						<div className="w-fit mt-4">
							<button
								onClick={() => {
									const loadingPopover = document.querySelector(
										"#creatingCampaign",
									) as HTMLElement;
									// @ts-ignore
									loadingPopover.hidePopover();
									document.body.style.overflow = "auto";
									router.push("/");
								}}
								className="border-solid cursor-pointer border-[1px] border-theme-green py-2 px-6 rounded-[10px] w-full flex items-center hover:bg-[#e4efe7]"
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
