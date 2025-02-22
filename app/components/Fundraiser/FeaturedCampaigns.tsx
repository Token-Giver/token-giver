import Image from "next/image";

const FeaturedCampaigns = () => {
  return (
    <div className="bg-r mx-auto w-full max-w-[1100px]">
      <p className="mb-4 text-foreground-secondary">Featured projects</p>
      <div className="flex h-auto w-full flex-col items-start justify-start space-x-0 space-y-4 sm:h-[600px] sm:flex-row sm:items-stretch sm:justify-between sm:space-x-4 sm:space-y-0">
        <div className="relative h-full w-full overflow-clip rounded-[10px] sm:h-[600px] sm:w-1/2 lg:w-3/5">
          <img
            src={"/default-image.webp"}
            alt="temp"
            className="h-full w-full"
          />
          <div className="absolute bottom-8 left-1/2 w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-3 lg:p-6">
            <h3 className="mb-2 text-sm font-semibold text-foreground-primary sm:text-lg">
              Education in Africa
            </h3>
            <p className="text-xs text-foreground-secondary sm:text-sm">
              Make donations seamlessly using NFTs and TBAs, ensuring your
              contributions are safely tracked on the blockchain.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start space-y-4 sm:w-1/2 lg:w-2/5">
          <div className="relative h-full w-full overflow-clip rounded-[10px] sm:h-[292px]">
            <img
              src={"/default-image.webp"}
              alt="temp"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-3 lg:p-6">
              <h3 className="mb-2 text-sm font-semibold text-foreground-primary sm:text-lg">
                Environmental Protection
              </h3>
              <p className="text-xs text-foreground-secondary sm:text-sm">
                This section will contain a little information about the event
              </p>
            </div>
          </div>
          <div className="relative h-full w-full overflow-clip rounded-[10px] sm:h-[292px]">
            <img
              src={"/default-image.webp"}
              alt="temp"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-3 lg:p-6">
              <h3 className="mb-2 text-sm font-semibold text-foreground-primary sm:text-lg">
                Cancer Research
              </h3>
              <p className="text-xs text-foreground-secondary sm:text-sm">
                This section will contain a little information about the event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
