import Image from "next/image";

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
}: any) => {
  return (
    <div className={`p-6 ${!isLastCard ? "border-b border-dark-gray" : ""}`}>
      <div className="flex items-start justify-between mb-6">
        <button className="px-6 py-2.5 border border-dark-gray rounded-[3rem] text-center">
          {category}
        </button>
        <Image
          src={image}
          alt={title}
          width={125}
          height={84}
          className="rounded-[0.25rem]"
        />
      </div>
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
  );
};

const Project = () => {
  const cardData = [
    {
      category: "Charities",
      image: "/classroom.jpeg",
      title: "Help build a school in Barnawa",
      progress: 50,
      raised: "25,000",
      target: "50,000",
      donorImages: ["/gabby.jpg", "/tima.jpg", "/charlotte.jpg", "/kosuki.jpg"],
      donorCount: 200,
    },
    {
      category: "Urgent",
      image: "/classroom.jpeg",
      title: "Lagos flood victims",
      progress: 2,
      raised: "25,000",
      target: "100,000",
      donorImages: ["/gabby.jpg", "/tima.jpg", "/charlotte.jpg", "/kosuki.jpg"],
      donorCount: 50,
    },
  ];

  return (
    <div className="bg-white">
      {cardData.map((data, index) => (
        <Card
          key={index}
          {...data}
          isLastCard={index === cardData.length - 1}
        />
      ))}
    </div>
  );
};

export default Project;
