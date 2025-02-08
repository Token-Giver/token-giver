const CardLoader = () => {
  return (
    <div className="animate-pulse space-y-3">
      <div className="col-span-2 h-[150px] w-[16.4rem] overflow-hidden rounded-[10px] bg-gray-200" />
      <div className="w-[16.4rem] space-y-3">
        <div className="h-3 w-full rounded-full bg-gray-200" />
        <div className="h-3 w-full rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default CardLoader;

export const BigCardLoader = () => {
  return (
    <div className="mx-auto grid max-w-[1200px] animate-pulse grid-cols-2 gap-8">
      <div className="h-[22rem] w-full overflow-clip rounded-[10px] bg-gray-200"></div>
      <div className="space-y-3">
        <div className="h-6 w-full rounded-[5px] bg-gray-200" />
        <div className="h-[5rem] w-full rounded-[10px] bg-gray-200" />
      </div>
    </div>
  );
};
