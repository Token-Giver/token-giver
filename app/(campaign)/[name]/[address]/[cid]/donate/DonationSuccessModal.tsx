import { Dialog, DialogContent, DialogTitle } from "@/app/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const DonationSuccessModal = ({
  isOpen,
  onClose,
  amount,
  campaignDetails
}: {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  campaignDetails: {
    name: string;
    image: string;
    beneficiary: string;
  };
}) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle srOnly>Donation sent</DialogTitle>
          <div className="">
            <div className="h-[200px]">
              <Image
                src={"/donation-sent.png"}
                alt="donation sent"
                width={900}
                height={288}
                className=""
              />
            </div>
            <div className="space-y-8 p-8">
              <div className="text-center font-agrandir text-3xl tracking-tighter">
                <span className="text-accent-green">{amount} STRK</span> Sent
              </div>
              <div className="mx-auto flex max-w-xl flex-col-reverse gap-8 md:flex md:flex-row md:gap-4">
                <div className="relative hidden h-[110px] w-[150px] flex-shrink-0 rounded-[5px] md:block">
                  <Image
                    className="h-full w-full rounded-[5px] object-cover"
                    src={campaignDetails.image}
                    alt=""
                    fill
                    sizes="100%"
                  />
                </div>
                <div className="col-span-2 tracking-wide text-foreground-primary">
                  <p className="line-clamp-3 text-clamp md:text-[1em]">
                    You are supporting{" "}
                    <span className="font-agrandir font-semibold">
                      {" "}
                      {campaignDetails.name}
                    </span>
                  </p>
                  <p className="mt-6 line-clamp-2 text-[.875em]">
                    Your donation will directly help{" "}
                    <span className="font-agrandir font-semibold">
                      {campaignDetails.beneficiary}
                    </span>{" "}
                  </p>
                </div>
              </div>
              <p className="text-center text-foreground-secondary">
                Thank You! Your Donation has been well received{" "}
              </p>
              <Link
                href={"/search"}
                onClick={onClose}
                className="inline-block w-full rounded-[10px] bg-[#F5F5F5] px-6 py-3 text-center text-accent-green"
              >
                Keep Viewing Campaigns
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationSuccessModal;
