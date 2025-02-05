const FeaturedCampaigns = () => {
  return (
    <div className=" w-[1100px] bg-r 2xl:mx-auto">
      <p className="text-foreground-secondary mb-4">Featured projects</p>
      <div className="grid grid-cols-2  gap-4 ">
        <div className="bg-debug w-full relative rounded-[10px] h-[600px]">
          <div className="bg-white absolute bottom-8 h-[9rem] left-1/2 -translate-x-1/2 rounded-[10px] w-[calc(100%-64px)]">
            a
          </div>
        </div>
        <div className="grid gap-4">
          <div className="bg-debug relative w-full max-w-[450px] rounded-[10px] h-full">
            <div className="bg-white absolute bottom-4 h-[9rem] left-1/2 -translate-x-1/2 rounded-[10px] w-[calc(100%-32px)]">
              a
            </div>
          </div>
          <div className="bg-debug relative w-full max-w-[450px] rounded-[10px] h-full">
            <div className="bg-white absolute bottom-4 h-[9rem] left-1/2 -translate-x-1/2 rounded-[10px] w-[calc(100%-32px)]">
              a
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
