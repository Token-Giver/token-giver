import ProfileIcon from "@/svgs/ProfileIcon";
import Comment from "./Comment";
import CalenderIcon from "@/svgs/CalenderIcon";
import RightArrowIcon from "@/svgs/RightArrowIcon";

interface CampaignProgressProps {
  organizer: string;
  description: string;
  beneficiary: string;
  date: string;
}

const CampaignDetails = ({
  organizer,
  date,
  description,
  beneficiary,
}: CampaignProgressProps) => {
  return (
    <div className="max-w-[602px] space-y-8">
      <div className="space-y-8">
        <h3 className="text-2xl  text-foreground-primary">
          <span className="font-agrandir font-bold">Campaign </span>
          <span className="font-normal">Highlights</span>
        </h3>
        <p className="text-foreground-secondary leading-8">{description}</p>
        <div className="flex items-center gap-4">
          <button className="ring-1 ring-accent-green w-full text-accent-green  px-2 py-2 rounded-[25px]">
            Donate now
          </button>

          <button className="ring-1 ring-accent-green w-full text-accent-green  px-2 py-2 rounded-[25px]">
            share now
          </button>
        </div>
        <div>
          <h3 className="mb-6">Organizer and Beneficiary</h3>
          <div className="flex items-center mb-8 justify-between">
            <div className="flex items-center gap-2">
              <div className="h-[40px] grid place-content-center w-[40px] rounded-full bg-[#F7F7F6]">
                <ProfileIcon />
              </div>
              <div>
                <p className="font-bold text-base">{organizer}</p>
                <p>Organizer</p>
              </div>
            </div>
            {beneficiary && (
              <>
                <p className="text-foreground-secondary text-xl">
                  <RightArrowIcon />
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-[40px] grid place-content-center w-[40px] rounded-full bg-[#F7F7F6]">
                    <ProfileIcon />
                  </div>
                  <div>
                    <p className="font-bold text-base">{beneficiary}</p>
                    <p>Beneficiary</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <p className="flex items-center gap-2">
            <span>
              <CalenderIcon />
            </span>{" "}
            {date}
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-foreground-primary/80 mb-4 font-agrandir font-bold text-base">
          More Images
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className=" w-full rounded-[5px] bg-red h-[11rem]"></div>
          <div className=" w-full rounded-[5px] bg-red h-[11rem]"></div>
          <div className=" w-full rounded-[5px] bg-red h-[11rem]"></div>
          <div className=" w-full rounded-[5px] bg-red h-[11rem]"></div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl   text-foreground-primary">
          <span className="font-agrandir font-bold">Wall</span>{" "}
          <span className="font-normal">of</span>{" "}
          <span className="font-agrandir font-bold">Love</span> (
          <span className="text-accent-green">23</span>)
        </h3>
        <p className="text-foreground-secondary ">
          A little word of encouragement would go a long way
        </p>
        <div className="flex items-center gap-3">
          <div className="h-[40px] grid place-content-center w-[40px] rounded-full bg-[#F7F7F6]">
            <ProfileIcon />
          </div>
          <input
            type="text"
            placeholder="Add a comment"
            className="placeholder:text-sm ring-1 ring-[#A1A1A1] w-[80%] rounded-[25px] px-3 h-[35px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Comment
            name="Hailey Talman"
            amount={23}
            timeAgo="2days ago"
            message="We are rooting for you Pedro⚡"
          />
          <Comment
            name="Hailey Talman"
            amount={23}
            timeAgo="2days ago"
            message="We are rooting for you Pedro⚡"
          />
          <Comment
            name="Hailey Talman"
            amount={23}
            timeAgo="2days ago"
            message="We are rooting for you Pedro⚡"
          />
          <button className="ring-1 ml-8 ring-[#808080] w-[7rem]  text-sm px-4 py-2 mt-8 rounded-[25px] text-foreground-primary">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
