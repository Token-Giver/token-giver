import Link from "next/link";
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

type SocialLinks = {
  [key: string]: string;
};

const socialLinks: SocialLinks = {
  x: "https://x.com/example",
  linkedin: "https://linkedin.com/in/example",
  instagram: "https://instagram.com/example",
  youtube: "https://youtube.com/example",
  telegram: "https://t.me/example",
  medium: "https://medium.com/@example",
  github: "https://github.com/example",
  website: "https://example.com",
  facebook: "https://facebook.com/example",
  discord: "https://discord.gg/example",
  substack: "https://example.substack.com",
  mirror: "https://mirror.xyz/example",
  lens: "https://lenster.xyz/u/example",
  farcaster: "https://warpcast.com/example"
};

const MoreInfo = () => {
  return (
    <div>
      <p className="text-foreground-secondary">More Information</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-foreground-secondary">
        {Object.entries(socialLinks).map(([platform, url]) => (
          <Link
            key={platform}
            href={url}
            target="_blank"
            className="transition-transform hover:scale-110 hover:text-accent-green"
          >
            {(() => {
              switch (platform.toLowerCase()) {
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
    </div>
  );
};

export default MoreInfo;
