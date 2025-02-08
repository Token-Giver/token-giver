import LogOutIcon from "@/svgs/LogOutIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import { useDisconnect } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isUserMenuOpen: boolean;
  address: string | undefined;
  setUserIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const UserModal = ({ address, isUserMenuOpen, setUserIsMenuOpen }: Props) => {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  return (
    <div
      className={`absolute -left-1/2 top-[120%] z-[9999] w-[140%] translate-x-[20%] transform rounded-[10px] bg-background p-4 shadow-hero-shadow ${
        isUserMenuOpen && address ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            setUserIsMenuOpen(false);
            router.push(`/campaigns/${address}`);
          }}
          className="flex items-center gap-4"
        >
          <span className="">
            <ProfileIcon width="1em" height="1em" />
          </span>
          <span className="">My Campaigns</span>
        </button>
        <button
          onClick={() => {
            if (address) {
              disconnect();
            }
          }}
          className="flex items-center gap-4"
        >
          <span>
            <LogOutIcon />
          </span>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default UserModal;
