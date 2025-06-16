const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="relative mx-auto mb-8 flex max-w-2xl items-center justify-between">
      <div
        className={`absolute top-[1.3rem] h-[1px] w-full transition-colors duration-500 ${
          currentStep >= 3 ? "bg-accent-green" : "bg-[#D9D9D9]"
        }`}
      />

      {/* Background line */}
      <div className="absolute top-[1.3rem] h-[1px] w-full bg-[#D9D9D9]" />

      {/* Progress line */}
      <div
        className="absolute top-[1.3rem] h-[1px] bg-accent-green transition-all duration-500"
        style={{
          width: `${((currentStep - 1) / 2) * 100}%`,
          maxWidth: "100%"
        }}
      />

      {/* Steps */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          className={`mb-3 grid h-[40px] w-[40px] place-content-center rounded-full ${currentStep >= 1 ? "bg-accent-green" : "bg-gray-300"} font-agrandir font-bold text-white`}
        >
          1
        </div>
        <p className="absolute bottom-[-1rem] ml-4 hidden whitespace-nowrap text-foreground-secondary md:block">
          Connect Wallet
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          className={`mb-3 grid h-[40px] w-[40px] place-content-center rounded-full ${currentStep >= 2 ? "bg-accent-green" : "bg-gray-300"} font-agrandir font-bold text-white`}
        >
          2
        </div>
        <p className="absolute bottom-[-1rem] hidden whitespace-nowrap text-foreground-secondary md:block">
          Campaign Details
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          className={`mb-3 grid h-[40px] w-[40px] place-content-center rounded-full ${currentStep >= 3 ? "bg-accent-green" : "bg-gray-300"} font-agrandir font-bold text-white`}
        >
          3
        </div>
        <p className="absolute bottom-[-1rem] mr-4 hidden whitespace-nowrap text-foreground-secondary md:block">
          Creator Details
        </p>
      </div>
    </div>
  );
};

export default Stepper;
