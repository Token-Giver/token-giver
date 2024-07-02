const CardLoader = () => {
  return (
    <div className=" grid grid-cols-6 items-center lg:flex lg:flex-col lg:justify-between  rounded-[10px] lg:h-[26.25rem] gap-8  w-full lg:max-w-[22.8rem] cursor-wait animate-pulse group justify-self-center p-2 card">
      <div className="w-[30vw] h-[30vw] max-w-[15.6rem] max-h-[15.6rem] lg:w-full lg:h-full lg:max-w-[21.8rem] lg:max-h-[21.8rem] bg-gray-200 animate-pulse rounded-[10px] col-span-2 overflow-hidden"></div>
      <div className="col-span-4 py-8 lg:w-full">
        <div className=" flex flex-col gap-4 overflow-hidden ">
          <div className="w-full h-3 rounded-full bg-gray-200"></div>
          <div className="w-1/2 h-3 rounded-full bg-gray-200"></div>
          <div className="w-full h-3 rounded-full bg-gray-200"></div>
          <div className="flex justify-between">
            <div className="w-[20%] h-3 rounded-full bg-gray-200"></div>
            <div className="w-[20%] h-3 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
