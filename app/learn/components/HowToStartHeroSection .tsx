function HowToStartHeroSection() {
  return (
    <div className="flex flex-col items-center px-[100px] pt-[180px] text-center">
      <h4 className="font-AgrandirRegular text-ash mb-[14px] text-base">
        How to Start TokenGiver
      </h4>
      <h1 className="font-AgrandirBold text-raisin-black mb-10 text-5xl leading-[70px]">
        Start Fundraising with
        <br />
        <span className="text-primary">TokenGiver Today</span>
      </h1>
      <div className="relative mt-[-12px] w-full">
        <img
          src="/how-to-start-illus.jpg"
          className="w-full rounded-[10px]"
          alt=""
        />
        <div className="absolute left-[66px] top-[106px] max-w-[515px] text-left">
          <h3 className="font-AgrandirBold text-raisin-black mb-4 text-3xl">
            Start Your
            <span className="font-AgrandirRegular">
              {" "}
              Fundraising
              <br />{" "}
            </span>
            Journey Today
          </h3>
          <p className="text-dark-grey max-w-[442px] text-base leading-[30px]">
            Join TokenGiver and turn your vision into reality. Together, we can
            make a difference one donation at a time.
          </p>
        </div>
      </div>
      <div className="px-[57px] pt-[42px]">
        <p className="text-ash mb-[30px] text-base leading-[35px]">
          At TokenGiver, our mission is to revolutionize the world of
          fundraising by merging the best of blockchain technology with the
          spirit of giving. We aim to create a world where every donation is not
          only impactful but also secure, transparent, and accountable.
        </p>
        <div className="flex items-center justify-center gap-x-3">
          <button className="bg-primary rounded-full px-10 py-3 text-base font-semibold text-white">
            Create a Fundraiser
          </button>
        </div>
      </div>
    </div>
  );
}

export default HowToStartHeroSection;
