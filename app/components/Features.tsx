"use client";
import { usePathname } from "next/navigation";

const Features = () => {
  const pathname = usePathname();
  const isDonationPage = pathname?.endsWith("/donate");

  return (
    <section
      className={`${
        isDonationPage ? "hidden" : "block"
      } py-10 px-4 md:p-10 bg-background`}
    >
      <div className="grid grid-cols-3 items-center">
       <div className="col-span-2">
       <h1>Why Token Giver</h1>
        <p className="pt-10">
          Imagine a world where every cause, big or small, is supported by the
          power of blockchain technology. Token Giver is more than just a
          platform, it's a revolution in fundraising. By using NFTs and Token
          Bound Accounts (TBAs), we ensure that every donation is secure,
          transparent, and traceable. Whether you’re creating a campaign or
          contributing to one, Token Giver makes the process seamless and
          user-friendly, even for those new to crypto. This is the future of
          giving: a place where trust, control, and innovation come together to
          empower causes and change lives.
        </p>
       </div>
      </div>
    </section>
  );
};

export default Features;
