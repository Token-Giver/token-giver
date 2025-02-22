import { formatNumberCompact } from "@/app/utils";
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
import VerifiedIcon from "@/svgs/VerifiedIcon";
import Link from "next/link";

interface CampaignProgressProps {
  balance: number;
  target: string;
  location: string;
  donationCount: number;
  onDonate: () => void;
}

type SocialLink = {
  name: string;
  url: string;
};

const socialLinks: SocialLink[] = [
  { name: "x", url: "https://x.com/example" },
  { name: "linkedin", url: "https://linkedin.com/in/example" },
  { name: "instagram", url: "https://instagram.com/example" },
  { name: "youtube", url: "https://youtube.com/example" },
  { name: "telegram", url: "https://t.me/example" },
  { name: "medium", url: "https://medium.com/@example" },
  { name: "github", url: "https://github.com/example" },
  { name: "website", url: "https://example.com" },
  { name: "facebook", url: "https://facebook.com/example" },
  { name: "discord", url: "https://discord.gg/example" },
  { name: "substack", url: "https://example.substack.com" },
  { name: "mirror", url: "https://mirror.xyz/example" },
  { name: "lens", url: "https://lenster.xyz/u/example" },
  { name: "farcaster", url: "https://warpcast.com/example" }
];

const CampaignProgress = ({
  balance,
  target,
  location,
  donationCount,
  onDonate
}: CampaignProgressProps) => {
  const width = `${Math.min((balance / parseInt(target)) * 100, 100)}%`;

  return (
    <div className="sticky top-[5rem] flex h-fit max-w-[450px] flex-col gap-4 p-8">
      <p className="flex items-center gap-1 text-accent-green">
        <VerifiedIcon />
        Verified & Protected Campaign{" "}
      </p>
      <p className="text-xl font-medium tracking-tight">
        {formatNumberCompact(balance || 0)} STRK
      </p>
      <p className="text-foreground-secondary">
        Raised till now{" "}
        <span className="text-xs font-bold text-accent-green">
          {" "}
          (Target: {formatNumberCompact(Number(target) || 0)} STRK)
        </span>{" "}
      </p>
      <div className="relative mb-2 h-[.25rem] w-full">
        <div className="mb-4 h-[1.5vw] max-h-[.25rem] w-full rounded-full bg-[#EFEFEF]"></div>
        <div
          style={{
            width: width
          }}
          className={`absolute top-0 mb-4 h-[1vw] max-h-[.25rem] rounded-full bg-[#34AA6D]`}
        ></div>
      </div>
      <p className="text-xl font-medium tracking-tight">
        {formatNumberCompact(Number(target) || 0)} STRK
      </p>
      <p className="text-foreground-secondary">Campaign goal</p>

      <p className="text-xl font-medium tracking-tight">{location}</p>
      <p className="text-foreground-secondary">Campaign location</p>
      <p className="text-accent-green">
        {formatNumberCompact(Number(donationCount) || 0)}{" "}
        {donationCount > 1 ? "donations" : "donation"}
      </p>
      <p className="text-foreground-secondary">More Information on</p>
      <div className="flex flex-wrap items-center gap-3 text-foreground-secondary">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            className="transition-transform hover:scale-110 hover:text-accent-green"
          >
            {(() => {
              switch (link.name.toLowerCase()) {
                case "x":
                  return <XIcon />;
                case "github":
                  return <GithubIcon />;
                case "telegram":
                  return <TelegramIcon />;
                case "youtube":
                  return <YoutubeIcon />;
                case "instagram":
                  return <InstagramIcon />;
                case "medium":
                  return <MediumIcon />;
                case "linkedin":
                  return <LinkedinIcon />;
                case "discord":
                  return <DiscordIcon />;
                case "facebook":
                  return <FacebookIcon />;
                default:
                  return <GlobeIcon />;
              }
            })()}
          </Link>
        ))}
      </div>
      <button
        className="w-full rounded-[25px] bg-accent-green px-2 py-2 text-white"
        onClick={onDonate}
      >
        <span>Donate now</span>
      </button>
    </div>
  );
};

export default CampaignProgress;
