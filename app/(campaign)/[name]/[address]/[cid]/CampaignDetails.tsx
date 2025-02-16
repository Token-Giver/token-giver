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
  beneficiary
}: CampaignProgressProps) => {
  return (
    <div className="max-w-[602px] space-y-8">
      <div className="space-y-8">
        <h3 className="text-2xl text-foreground-primary">
          <span className="font-agrandir font-bold">Campaign </span>
          <span className="font-normal">Highlights</span>
        </h3>
        <p className="leading-8 text-foreground-secondary">{description}</p>
        <div className="flex items-center gap-4">
          <button className="w-full rounded-[25px] px-2 py-2 text-accent-green ring-1 ring-accent-green">
            Donate now
          </button>

          <button className="w-full rounded-[25px] px-2 py-2 text-accent-green ring-1 ring-accent-green">
            share now
          </button>
        </div>
        <div>
          <h3 className="mb-6">Organizer and Beneficiary</h3>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                <ProfileIcon />
              </div>
              <div className="max-w-[180px]">
                <p className="truncate text-base font-bold">{organizer}</p>

                <p>Organizer</p>
              </div>
            </div>
            {beneficiary && (
              <>
                <p className="text-xl text-foreground-secondary">
                  <RightArrowIcon />
                </p>
                <div className="flex items-center gap-2">
                  <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
                    <ProfileIcon />
                  </div>
                  <div className="max-w-[180px]">
                    <p className="truncate text-base font-bold">
                      {beneficiary}
                    </p>
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
        <h4 className="mb-4 font-agrandir text-base font-bold text-foreground-primary/80">
          More Images
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-[11rem] w-full rounded-[5px] bg-red"></div>
          <div className="h-[11rem] w-full rounded-[5px] bg-red"></div>
          <div className="h-[11rem] w-full rounded-[5px] bg-red"></div>
          <div className="h-[11rem] w-full rounded-[5px] bg-red"></div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl text-foreground-primary">
          <span className="font-agrandir font-bold">Wall</span>{" "}
          <span className="font-normal">of</span>{" "}
          <span className="font-agrandir font-bold">Love</span> (
          <span className="text-accent-green">23</span>)
        </h3>
        <p className="text-foreground-secondary">
          A little word of encouragement would go a long way
        </p>
        <div className="flex items-center gap-3">
          <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
            <ProfileIcon />
          </div>
          <input
            type="text"
            placeholder="Add a comment"
            className="h-[35px] w-[80%] rounded-[25px] px-3 ring-1 ring-[#A1A1A1] placeholder:text-sm"
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
          <button className="ml-8 mt-8 w-[7rem] rounded-[25px] px-4 py-2 text-sm text-foreground-primary ring-1 ring-[#808080]">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
