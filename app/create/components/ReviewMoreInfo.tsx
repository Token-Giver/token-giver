import {
  DiscordIcon,
  FacebookIcon,
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MediumIcon,
  TelegramIcon,
  XIcon,
  YoutubeIcon
} from "@/svgs/social.icons";
const ReviewMoreInfo = ({
  socialLinks
}: {
  socialLinks: { [key: string]: string };
}) => {
  return (
    <div>
      <p className="text-foreground-secondary">More Information</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-foreground-secondary">
        {Object.entries(socialLinks).map(([platform, url]) => (
          <div
            key={platform}
            className="transition-transform hover:scale-110 hover:text-accent-green"
          >
            {(() => {
              switch (platform.toLowerCase()) {
                case "twitter":
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewMoreInfo;
