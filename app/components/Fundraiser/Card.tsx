"use client";
import LocationIcon from "@/svgs/LocationIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CardType = {
  causeName: string;
  imageSrc: string;
  imageAltText?: string;
  location: string;
  progress: number;
  contract_address: string;
  token_id: string;
};

const Card = ({
  causeName,
  imageSrc,
  location,
  progress,
  imageAltText,
  contract_address,
  token_id,
}: CardType) => {
  const router = useRouter();

  const handleRoute = () => {
    const path = causeName
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/ /g, "-")
      .toLocaleLowerCase()
      .replace(/-+/g, "-");
    router.push(`campaign/${path}?a=${contract_address}&t=${token_id}`);
  };

  return (
    <div
      onClick={handleRoute}
      className=" grid grid-cols-6 items-center lg:flex lg:flex-col lg:justify-between  rounded-[10px] lg:h-[26.25rem]  w-full lg:max-w-[22.8rem] cursor-pointer group justify-self-center hover:bg-[#e4efe7] p-2 transition-all card"
    >
      <div className="w-[30vw] h-[30vw] max-w-[15.6rem] max-h-[15.6rem] lg:w-full lg:h-full lg:max-w-[21.8rem] lg:max-h-[21.8rem] bg-gray-100  rounded-[10px] col-span-2 overflow-hidden">
        {imageSrc ? (
          <Image
            className="rounded-t-[10px] w-full h-full group-hover:scale-105 object-cover transition-all"
            loader={() => imageSrc}
            src={imageSrc}
            alt={imageAltText ? imageAltText : ""}
            width={400}
            height={400}
          />
        ) : (
          <div className="w-[30vw] h-[30vw] max-w-[15.6rem] max-h-[15.6rem] lg:w-full lg:h-full lg:max-w-[21.8rem] lg:max-h-[21.8rem] bg-gradient-linear  group-hover:scale-105 transition-all"></div>
        )}
      </div>
      <div className="col-span-4 py-8 px-4 lg:py-4 lg:w-full">
        <div className=" h-[100px] flex flex-col gap-4 overflow-hidden ">
          <h4 className="text-[.9em] overflow-hidden capitalize   line-clamp">
            {causeName}
          </h4>
          <p className=" flex items-center gap-x-1">
            <span>
              <LocationIcon />
            </span>
            <span className="text-[.8rem]">{location}.</span>
          </p>
        </div>

        <div className="">
          <div className="w-full h-[.25rem] mb-2 relative">
            <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
            <div
              style={{
                width: `${progress}%`,
              }}
              className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
            ></div>
          </div>
          <div className="flex justify-between px-2 text-[.875rem]">
            <p>$3466</p>
            <p>{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
