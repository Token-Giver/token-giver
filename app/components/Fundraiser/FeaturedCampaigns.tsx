import RightArrowIcon from "@/svgs/RightArrowIcon";
import Image from "next/image";

const featuredCampaigns = [
  {
    id: 1,
    title: "Clean Water Initiative in Tanzania",
    description:
      "Help us build sustainable water wells in rural communities, providing clean drinking water to over 10,000 people.",
    image: "/temp-2.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Tech Education for Girls",
    description:
      "Supporting young women in STEM through coding bootcamps and mentorship programs across Southeast Asia.",
    image: "/temp-0.jpg"
  },
  {
    id: 3,
    title: "Reforestation Project Amazon",
    description:
      "Join our mission to plant 100,000 trees in deforested areas of the Amazon rainforest and support local communities.",
    image: "/temp-1.jpg"
  }
];

const FeaturedCampaigns = () => {
  return (
    <div className="w-full max-w-[608px] md:max-w-[clamp(708px,92vw,758px)] lg:max-w-[958px] 2xl:mx-auto">
      <p className="mb-4 text-center text-foreground-secondary lgMobile:text-start">
        Featured projects
      </p>

      <div className="mx-auto flex flex-col items-center gap-x-4 gap-y-2 lgMobile:grid lgMobile:grid-cols-2">
        {featuredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className={`relative ${
              campaign.featured
                ? "h-[300px] w-full max-w-[350px] lgMobile:col-span-1 lgMobile:row-span-2 lgMobile:w-[300px] lgMobile:max-w-none md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
                : "h-[300px] w-full max-w-[350px] lgMobile:ml-auto lgMobile:h-full lgMobile:w-full lgMobile:max-w-[300px] md:max-w-[clamp(300px,calc(50vw-80px),350px)] lg:max-w-[450px]"
            } overflow-clip rounded-[10px]`}
          >
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover"
            />
            <div
              className={`absolute bottom-2 left-1/2 h-fit w-[calc(100%-16px)] -translate-x-1/2 rounded-[8px] bg-white text-sm shadow-sm md:bottom-4 md:w-[calc(100%-32px)] ${
                campaign.featured
                  ? "max-h-[7rem] p-4 lg:bottom-8 lg:w-[calc(100%-64px)]"
                  : "p-2 lgMobile:p-0 lg:p-3"
              }`}
            >
              <h3
                className={`flex items-center justify-between text-sm font-semibold text-foreground-primary md:text-base lg:text-lg ${campaign.featured ? "mb-1 lg:mb-2" : "p-2 lg:mb-1 lg:p-0"}`}
              >
                <span className="max-w-[90%] truncate">{campaign.title}</span>
                <span className="inline-block -rotate-45 rounded-full bg-accent-green p-1.5 text-white">
                  <RightArrowIcon />
                </span>
              </h3>
              <p
                className={`text-foreground-secondary ${
                  campaign.featured
                    ? "line-clamp-2 md:line-clamp-3"
                    : "line-clamp-2 lgMobile:sr-only md:line-clamp-3 lg:not-sr-only"
                }`}
              >
                {campaign.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
