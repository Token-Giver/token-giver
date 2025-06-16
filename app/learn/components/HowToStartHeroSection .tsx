function HowToStartHeroSection() {
  return (
    <div className="flex flex-col items-center gap-4 px-4 text-center text-foreground-secondary sm:gap-6 sm:px-6 md:gap-8 md:px-8">
      <h4 className="">How to get started on token giver</h4>
      <h1 className="font-agrandir text-3xl leading-[42px] text-foreground-primary sm:text-4xl sm:leading-[48px] md:text-[42px] md:leading-[55px]">
        Start Fundraising With
        <br />
        <span className="text-primary text-accent-green">
          Token Giver Today
        </span>
      </h1>
      <div className="relative w-full max-w-[1000px] md:h-full md:max-h-none">
        <div className="relative h-full w-full">
          <img
            src="/how-to-start.png"
            alt="How to start with TokenGiver"
            className="h-full w-full object-contain md:block"
          />
        </div>
      </div>

      <p className="mx-auto max-w-[600px]">
        At Token Giver, our mission is to revolutionize the world of fundraising
        by merging the best of blockchain technology with the spirit of giving.
        We aim to create a world where every donation is not only impactful but
        also secure, transparent, and accountable.
      </p>

      <button className="rounded-[25px] bg-accent-green px-6 py-2.5 text-sm text-white transition-colors hover:bg-accent-green/90 sm:text-base">
        Create a Campaign
      </button>
    </div>
  );
}

export default HowToStartHeroSection;
