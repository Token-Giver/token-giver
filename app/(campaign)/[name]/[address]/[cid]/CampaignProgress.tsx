import VerifiedIcon from "@/svgs/VerifiedIcon";

interface CampaignProgressProps {
  balance: number;
  target: string;
  location: string;
  donationCount: number;
  onDonate: () => void;
}

const CampaignProgress = ({
  balance,
  target,
  location,
  donationCount,
  onDonate,
}: CampaignProgressProps) => {
  const width = `${Math.min((balance / parseInt(target)) * 100, 100)}%`;

  return (
    <div className="max-w-[450px] sticky top-[5rem] flex flex-col gap-4 h-fit  p-8">
      <p className="text-accent-green flex items-center gap-1">
        <VerifiedIcon />
        Verified & Protected Campaign{" "}
      </p>
      <p className="font-medium  tracking-tight text-xl">
        {balance.toFixed(2)} STRK
      </p>
      <p className="text-foreground-secondary">
        Raised till now{" "}
        <span className="font-bold text-xs text-accent-green">
          {" "}
          (Target: {target || 0} STRK)
        </span>{" "}
      </p>
      <div className="w-full h-[.25rem] mb-2 relative">
        <div className="w-full h-[1.5vw] max-h-[.25rem] bg-[#EFEFEF] rounded-full mb-4"></div>
        <div
          style={{
            width: width,
          }}
          className={`h-[1vw] max-h-[.25rem] bg-[#34AA6D] rounded-full mb-4 top-0 absolute`}
        ></div>
      </div>
      <p className="font-medium  tracking-tight text-xl">{target || 0} STRK</p>
      <p className="text-foreground-secondary">Campaign goal</p>

      <p className="font-medium  tracking-tight text-xl">{location}</p>
      <p className="text-foreground-secondary">Campaign location</p>
      <p className="text-accent-green">
        {donationCount || 0} {donationCount === 1 ? "Person" : "People"} have
        donated
      </p>
      <button
        className="bg-accent-green text-white w-full  px-2 py-2 rounded-[25px]"
        onClick={onDonate}
      >
        <span>Donate now</span>
      </button>
    </div>
  );
};

export default CampaignProgress;
