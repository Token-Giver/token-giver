import ProfileIcon from "@/svgs/ProfileIcon";

interface CommentProps {
  name: string;
  amount: number;
  timeAgo: string;
  message: string;
}

const Comment = ({ name, amount, timeAgo, message }: CommentProps) => {
  return (
    <div className="flex gap-2">
      <div className="grid h-[40px] w-[40px] place-content-center rounded-full bg-[#F7F7F6]">
        <ProfileIcon />
      </div>
      <div className="space-y-2">
        <p>
          {name}{" "}
          <span className="text-base text-foreground-secondary">
            - {amount} STRK
          </span>
        </p>
        <p className="text-foreground-secondary">{timeAgo}</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Comment;
