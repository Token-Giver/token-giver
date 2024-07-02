const CauseLoader = () => {
  return (
    <div className="h-screen w-screen  bg-off-white mt-[4rem] py-10 md:py-16 px-4 md:px-10 lg:px-40 flex cursor-wait animate-pulse">
      <div className="max-w-[780px] lg:max-w-full flex-1 flex flex-col gap-8 mx-auto">
        <div className="rounded-[10px] bg-gray-200 h-6 w-[60%]"></div>
        <div className="rounded-[10px] bg-gray-200 h-[60%] w-[80%]"></div>
        <div className="rounded-[10px] bg-gray-200 h-[10%] w-[80%]"></div>
      </div>
      <div className="p-8  rounded-[10px] w-[35%] h-[35%] bg-gray-200"></div>
    </div>
  );
};

export default CauseLoader;
