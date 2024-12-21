import Image from "next/image";

type DonorImage = string;

type Card = {
  category: string;
  image: string;
  title: string;
  progress: number;
  raised: string;
  target: string;
  donorImages: DonorImage[];
  donorCount: number;
};

type ExtendedCard = Card & {
  isLastCard: boolean;
};

const Card = ({
  category,
  image,
  title,
  progress,
  raised,
  target,
  donorImages,
  donorCount,
  isLastCard, // New prop to identify the last card
}: ExtendedCard) => {
  return (
    <div
      className={`p-6 lg:p-0 ${
        !isLastCard ? "border-b border-dark-gray lg:border-b-0" : ""
      } lg:bg-white lg:rounded-b-lg`}
    >
      <div className="flex items-start justify-between mb-6 lg:flex-col lg:gap-6 ">
        <button className="lg:mx-6 px-6 py-2.5 border border-dark-gray rounded-[3rem] text-center lg:order-2">
          {category}
        </button>
        <Image
          src={image}
          alt={title}
          width={125}
          height={84}
          className="rounded-[0.25rem] lg:rounded-b-none lg:rounded-t-lg lg:order-1 lg:w-[377px] lg:h-[253px] "
        />
      </div>
      <div className="lg:mx-6 lg:mb-6">
        <p className="font-medium text-md leading-5">{title}</p>
        <div className="my-6">
          <p className="text-center mb-2.5 font-normal text-md">
            {progress}% there
          </p>
          <div className="w-full bg-[#D9D9D9] rounded-full h-[6px]">
            <div
              className="bg-pantone-green h-[6px] rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between mt-2.5 mb-6">
          <span className="text-sm font-bold">
            {raised} <span className="font-normal">STRK raised</span>
          </span>
          <span>
            Target <span className="text-sm font-bold">{target}</span> STRK
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {donorImages.map((donorImage: any, index: any) => (
              <Image
                key={index}
                src={donorImage}
                alt=""
                width={30}
                height={30}
                className="w-8 h-8 object-cover border-2 border-white rounded-full dark:border-gray-800"
              />
            ))}
          </div>
          <span>Be part of the {donorCount}+ Donors</span>
        </div>
      </div>
    </div>
  );
};

const Project = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="bg-white lg:flex gap-y-10 flex-wrap justify-between lg:bg-transparent">
      {cards.map((data: Card, index: number) => (
        <Card key={index} {...data} isLastCard={index === cards.length - 1} />
      ))}
    </div>
  );
};

export default Project;
