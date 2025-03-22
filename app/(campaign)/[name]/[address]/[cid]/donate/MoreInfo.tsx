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
const MoreInfo = () => {

    return (
      <div>
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
      </div>
    );
  };
  
  export default MoreInfo;