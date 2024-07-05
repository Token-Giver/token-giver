import GiveIcon from "@/svgs/GiveIcon";
import GrowIcon from "@/svgs/GrowIcon";
import LoveIcon from "@/svgs/LoveIcon";

const Features = () => {
  return (
    <div className="py-10 px-4 md:p-10 bg-off-white">
      <div className="mb-[5rem]">
        <h2>Fundraising on logo. only takes a few minutes</h2>
      </div>
      <div
        id="feat-section"
        className="flex flex-col md:flex-row bg-yellow-100 rounded-[20px]"
      >
        <div className="flex flex-col gap-4 md:items-center md:justify-center p-4 md:p-8 lg:p-12">
          <div className="bg-theme-green w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center text-amber-400">
            <LoveIcon />
          </div>
          <div className=" md:text-center">
            <h5 className="mb-2">Love</h5>
            <p>
              Lorem ipsum dolor nctio sit aliquam praesentium animi cum
              quibusdam voluptate, harum optio.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-center md:justify-center p-4  md:p-8  lg:p-12 ">
          <div className="bg-theme-green w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center text-amber-400">
            <GiveIcon />
          </div>
          <div className=" md:text-center">
            <h5 className="mb-2">Give</h5>
            <p>
              Lorem ipsum dolor nctio sit aliquam praesentium animi cum
              quibusdam voluptate, harum optio.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-center md:justify-center p-4  md:p-8  lg:p-12">
          <div className="bg-theme-green w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center text-amber-400">
            <GrowIcon />
          </div>
          <div className=" md:text-center">
            <h5 className="mb-2">Grow</h5>
            <p>
              Lorem ipsum dolor nctio sit aliquam praesentium animi cum
              quibusdam voluptate, harum optio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
