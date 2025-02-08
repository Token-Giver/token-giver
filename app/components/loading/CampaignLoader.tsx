const CampaignLoader = () => {
  return (
    <div className="px-4md:px-10 mx-auto mt-[4rem] flex h-screen w-screen max-w-[550px] animate-pulse cursor-wait py-10 md:py-16 lg:max-w-full lg:px-40">
      <div className="mx-auto flex max-w-[780px] flex-1 flex-col gap-8 lg:max-w-full">
        <div className="mx-10 h-6 w-[80%] rounded-[10px] bg-gray-200 lg:mx-0 lg:w-[80%]"></div>
        <div className="mx-auto h-[60%] w-[80%] self-center rounded-[10px] bg-gray-200 lg:mx-0"></div>
        <div className="mx-10 h-12 w-[80%] self-center rounded-[10px] bg-gray-200 lg:mx-0 lg:w-[80%]"></div>
      </div>
      <div className="hidden h-[35%] w-[35%] rounded-[10px] bg-gray-200 p-8 lg:block"></div>
    </div>
  );
};

export default CampaignLoader;
