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
