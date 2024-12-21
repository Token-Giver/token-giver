import { useViewPort } from "../hooks/useViewport";
import Icon from "./icons/icon";

export default function WhyTokenGiver() {
  const { width } = useViewPort();
  return (
    <div className="lg:p-24 py-12 px-5 bg-tkg-tint-100 flex flex-col lg:flex-row items-center lg:gap-24">
      <div>
        <h1 className="mb-10 text-[24px] font-bold text-center lg:text-start">
          Why Token Giver
        </h1>
        <p className="leading-5 text-center lg:text-start">
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
      <div className="min-w-max">
        <Icon
          name="large_brand_logo_green"
          width={width < 1024 ? 82 : 384}
          height={width < 1024 ? 80 : 378}
        />
      </div>
    </div>
  );
}
