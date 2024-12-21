"use client";
import { usePathname } from "next/navigation";

const WhyTokenGiver = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");

  return (
    <section
      className={`h-[557px] flex items-center px-5 lg:px-[100px] mt-20 ${
        isDonationPage ? "hidden" : "block"
      } py-10 px-4 md:p-10 bg-background`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center lg:gap-[100px]">
        <div className="col-span-2">
          <h1 className="text-[24px]">Why Token Giver</h1>
          <p className="pt-10">
            Imagine a world where every cause, big or small, is supported by the
            power of blockchain technology. Token Giver is more than just a
            platform, it's a revolution in fundraising. By using NFTs and Token
            Bound Accounts (TBAs), we ensure that every donation is secure,
            transparent, and traceable. Whether you’re creating a campaign or
            contributing to one, Token Giver makes the process seamless and
            user-friendly, even for those new to crypto. This is the future of
            giving: a place where trust, control, and innovation come together
            to empower causes and change lives.
          </p>
        </div>
        <div className="col-sapn-1">
          <img src="/token-giver.png" alt="token-giver" />
        </div>
      </div>
    </section>
  );
};

export default WhyTokenGiver;
