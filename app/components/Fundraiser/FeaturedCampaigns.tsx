import Image from "next/image";

const featuredCampaigns = [
  {
    id: 1,
    title: "Clean Water Initiative in Tanzania",
    description:
      "Help us build sustainable water wells in rural communities, providing clean drinking water to over 10,000 people.",
    image: "/default-image.webp",
    featured: true
  },
  {
    id: 2,
    title: "Tech Education for Girls",
    description:
      "Supporting young women in STEM through coding bootcamps and mentorship programs across Southeast Asia.",
    image: "/default-image.webp"
  },
  {
    id: 3,
    title: "Reforestation Project Amazon",
    description:
      "Join our mission to plant 100,000 trees in deforested areas of the Amazon rainforest and support local communities.",
    image: "/default-image.webp"
  }
];

const FeaturedCampaigns = () => {
  return (
    <div className="bg-r w-full max-w-[1100px] 2xl:mx-auto">
      <p className="mb-4 text-foreground-secondary">Featured projects</p>

      <div className="grid gap-4 lgMobile:grid-cols-2">
        {featuredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className={`relative ${
              campaign.featured
                ? "col-span-1 h-[400px] w-full max-md:max-w-[450px] max-xMobile:h-[350px] md:row-span-2 xTablet:h-[480px] lg:h-[600px]"
                : "h-full w-full max-w-[450px] max-md:h-[400px]"
            } overflow-clip rounded-[10px]`}
          >
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover"
            />
            <div
              className={`absolute bottom-4 left-1/2 h-fit w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-3 ${
                campaign.featured
                  ? "mobile:p-5 md:bottom-8 xTablet:h-[9rem] xTablet:w-[calc(100%-64px)] xTablet:p-8"
                  : "mobile:p-4 xTablet:h-[9rem] xTablet:p-6"
              }`}
            >
              <h3 className="mb-2 font-semibold text-foreground-primary">
                {campaign.title}
              </h3>
              <p className="text-foreground-secondary">
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
