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
      className={`absolute z-[9999] bg-background w-[140%] -left-1/2 transform translate-x-[20%] top-[120%] rounded-[10px] p-4 shadow-hero-shadow ${
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
              localStorage.removeItem("lastUsedConnector");
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
