import Image from "next/image";

const FeaturedCampaigns = () => {
  return (
    <div className="bg-r w-[1100px] 2xl:mx-auto">
      <p className="mb-4 text-foreground-secondary">Featured projects</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative h-[600px] w-full overflow-clip rounded-[10px]">
          <Image
            src={"/default-image.webp"}
            alt="temp"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-8 left-1/2 h-[9rem] w-[calc(100%-64px)] -translate-x-1/2 rounded-[10px] bg-white p-8">
            <h3 className="mb-2 font-semibold text-foreground-primary">
              Education in Africa
            </h3>
            <p className="text-foreground-secondary">
              Make donations seamlessly using NFTs and TBAs, ensuring your
              contributions are safely tracked on the blockchain.
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="h-ful relative w-full max-w-[450px] overflow-clip rounded-[10px]">
            <Image
              src={"/default-image.webp"}
              alt="temp"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-1/2 h-[9rem] w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-6">
              <h3 className="mb-2 font-semibold text-foreground-primary">
                Education in Africa
              </h3>
              <p className="text-foreground-secondary">
                Make donations seamlessly using NFTs and TBAs, ensuring your
                contributions are safely tracked on the blockchain.
              </p>
            </div>
          </div>
          <div className="relative h-full w-full max-w-[450px] overflow-clip rounded-[10px]">
            <Image
              src={"/default-image.webp"}
              alt="temp"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-1/2 h-[9rem] w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-6">
              <h3 className="mb-2 font-semibold text-foreground-primary">
                Education in Africa
              </h3>
              <p className="text-foreground-secondary">
                Make donations seamlessly using NFTs and TBAs, ensuring your
                contributions are safely tracked on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
