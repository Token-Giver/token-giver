import Icon from "./icons/icon";

export default function DonateBanner({
  handleDonate,
}: {
  handleDonate: () => void;
}) {
  return (
    <div className="lg:p-24 py-12 px-5 bg-tkg-primary text-white gap-24">
      <h1 className="mb-5 text-center text-[24px] font-bold">
        Donate and help push campaigns
      </h1>
      <span className="mb-10 block text-center">
        Your donation will help push the cause of various campaigns such as
        education, healthcare and relief
      </span>
      <button
        onClick={handleDonate}
        className="border border-white py-3 px-6 rounded-full text-white flex items-center gap-2.5 max-h-11 leading-none mx-auto"
      >
        Donate now <Icon name="north_east_arrow_in_circle" />
      </button>
    </div>
  );
}
