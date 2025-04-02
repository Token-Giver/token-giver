import Image from "next/image";

const FeaturedCampaigns = () => {
  return (
    <div className="bg-r w-full max-w-[1100px] 2xl:mx-auto">
      <p className="mb-4 text-foreground-secondary">Featured projects</p>

      <div className="lgMobile:grid-cols-2 grid gap-4">
        <div className="xTablet:h-[480px] max-xMobile:h-[350px] relative col-span-1 h-[400px] w-full overflow-clip rounded-[10px] max-md:max-w-[450px] md:row-span-2 lg:h-[600px]">
          <Image
            src={"/default-image.webp"}
            alt="temp"
            fill
            className="object-cover"
          />
          <div className="xTablet:p-8 xTablet:h-[9rem] xTablet:w-[calc(100%-64px)] mobile:p-5 absolute bottom-4 left-1/2 h-fit w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-3 md:bottom-8">
            <h3 className="mb-2 font-semibold text-foreground-primary">
              Education in Africa
            </h3>
            <p className="text-foreground-secondary">
              Make donations seamlessly using NFTs and TBAs, ensuring your
              contributions are safely tracked on the blockchain.
            </p>
          </div>
        </div>

        {/* <div className="grid w-full gap-4"> */}
        <div className="relative h-full w-full max-w-[450px] overflow-clip rounded-[10px] max-md:h-[400px]">
          <Image
            src={"/default-image.webp"}
            alt="temp"
            fill
            className="object-cover"
          />
          <div className="xTablet:p-6 xTablet:h-[9rem] mobile:p-4 absolute bottom-4 left-1/2 h-fit w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-3">
            <h3 className="mb-2 font-semibold text-foreground-primary">
              Education in Africa
            </h3>
            <p className="text-foreground-secondary">
              Make donations seamlessly using NFTs and TBAs, ensuring your
              contributions are safely tracked on the blockchain.
            </p>
          </div>
        </div>

        <div className="relative h-full w-full max-w-[450px] overflow-clip rounded-[10px] max-md:h-[400px]">
          <Image
            src={"/default-image.webp"}
            alt="temp"
            fill
            className="object-cover"
          />
          <div className="xTablet:p-6 xTablet:h-[9rem] mobile:p-4 absolute bottom-4 left-1/2 h-fit w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white p-3">
            <h3 className="mb-2 font-semibold text-foreground-primary">
              Education in Africa
            </h3>
            <p className="text-foreground-secondary">
              Make donations seamlessly using NFTs and TBAs, ensuring your
              contributions are safely tracked on the blockchain.
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
