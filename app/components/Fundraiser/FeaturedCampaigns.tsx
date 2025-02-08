const FeaturedCampaigns = () => {
  return (
    <div className="bg-r w-[1100px] 2xl:mx-auto">
      <p className="mb-4 text-foreground-secondary">Featured projects</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative h-[600px] w-full rounded-[10px] bg-debug">
          <div className="absolute bottom-8 left-1/2 h-[9rem] w-[calc(100%-64px)] -translate-x-1/2 rounded-[10px] bg-white">
            a
          </div>
        </div>
        <div className="grid gap-4">
          <div className="relative h-full w-full max-w-[450px] rounded-[10px] bg-debug">
            <div className="absolute bottom-4 left-1/2 h-[9rem] w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white">
              a
            </div>
          </div>
          <div className="relative h-full w-full max-w-[450px] rounded-[10px] bg-debug">
            <div className="absolute bottom-4 left-1/2 h-[9rem] w-[calc(100%-32px)] -translate-x-1/2 rounded-[10px] bg-white">
              a
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
