const CardLoader = () => {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="w-[16.4rem] h-[150px] bg-gray-200  rounded-[10px] col-span-2 overflow-hidden" />
      <div className="w-[16.4rem] space-y-3">
        <div className="w-full h-3 rounded-full bg-gray-200" />
        <div className="w-full h-3 rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default CardLoader;

export const BigCardLoader = () => {
  return (
    <div className="grid grid-cols-2 animate-pulse gap-8  max-w-[1200px] mx-auto">
      <div className="overflow-clip bg-gray-200 h-[22rem] rounded-[10px] w-full"></div>
      <div className="space-y-3">
        <div className="w-full h-6 rounded-[5px] bg-gray-200" />
        <div className="w-full h-[5rem] rounded-[10px] bg-gray-200" />
      </div>
    </div>
  );
};
