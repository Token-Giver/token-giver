
export const CardLoader = () => {
  return (
    <div className="max-xMobile:min-w-full mx-auto w-full min-w-[15rem] animate-pulse space-y-3 max-[510px]:min-w-[22rem] sm:max-w-[20rem]">
      <div className="col-span-2 h-[150px] w-full overflow-hidden rounded-[10px] bg-gray-200" />
      <div className="w-full space-y-3">
        <div className="h-3 w-full rounded-full bg-gray-200" />
        <div className="h-3 w-full rounded-full bg-gray-200" />
      </div>
    </div>
  );
};


export const BigCardLoader = () => {
  return (
    <div className="mx-auto grid max-w-[1200px] animate-pulse gap-8 md:grid-cols-2">
      <div className="mobile:h-[22rem] h-[18rem] w-full overflow-clip rounded-[10px] bg-gray-200 max-md:max-w-[580px]"></div>
      <div className="space-y-3 max-md:max-w-[580px]">
        <div className="h-6 w-full rounded-[5px] bg-gray-200" />
        <div className="mobile:h-[5rem] h-[4rem] w-full rounded-[10px] bg-gray-200" />
      </div>
    </div>
  );
};
