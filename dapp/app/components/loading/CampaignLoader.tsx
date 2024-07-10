const CampaignLoader = () => {
  return (
    <div className="h-screen w-screen max-w-[550px] mx-auto bg-off-white  mt-[4rem] py-10 md:py-16 px-4md:px-10 lg:px-40 lg:max-w-full flex  cursor-wait animate-pulse">
      <div className="max-w-[780px]  lg:max-w-full flex-1 flex flex-col  gap-8 mx-auto">
        <div className="rounded-[10px] bg-gray-200 h-6 w-[80%] lg:w-[80%] mx-10 lg:mx-0"></div>
        <div className="rounded-[10px] bg-gray-200 h-[60%] w-[80%] mx-auto self-center lg:mx-0"></div>
        <div className="rounded-[10px] bg-gray-200 h-12 w-[80%] lg:w-[80%] self-center mx-10 lg:mx-0"></div>
      </div>
      <div className="p-8 hidden  rounded-[10px] w-[35%] h-[35%] bg-gray-200 lg:block"></div>
    </div>
  );
};

export default CampaignLoader;
