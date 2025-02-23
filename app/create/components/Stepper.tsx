const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="relative mx-auto mb-8 flex max-w-2xl items-center justify-between">
      {/* Line container that spans full width */}
      <div className="absolute left-0 top-5 w-full">
        <div
          className={`absolute left-[80px] h-[1px] w-[calc(50%-110px)] transition-colors duration-500 ${
            currentStep >= 2 ? "bg-accent-green" : "bg-[#D9D9D9]"
          }`}
        />
        <div
          className={`absolute right-[85px] h-[1px] w-[calc(50%-110px)] transition-colors duration-500 ${
            currentStep >= 3 ? "bg-accent-green" : "bg-[#D9D9D9]"
          }`}
        />
      </div>

      {/* Steps */}
      <div className="z-10 flex flex-col items-center justify-center">
        <div
          className={`mb-3 grid h-[40px] w-[40px] place-content-center rounded-full ${currentStep >= 1 ? "bg-accent-green" : "bg-gray-300"} font-agrandir font-bold text-white`}
        >
          1
        </div>
        <p className="text-foreground-secondary">Connect Wallet</p>
      </div>

      <div className="z-10 flex flex-col items-center justify-center">
        <div
          className={`mb-3 grid h-[40px] w-[40px] place-content-center rounded-full ${currentStep >= 2 ? "bg-accent-green" : "bg-gray-300"} font-agrandir font-bold text-white`}
        >
          2
        </div>
        <p className="text-foreground-secondary">Campaign Details</p>
      </div>

      <div className="z-10 flex flex-col items-center justify-center">
        <div
          className={`mb-3 grid h-[40px] w-[40px] place-content-center rounded-full ${currentStep >= 3 ? "bg-accent-green" : "bg-gray-300"} font-agrandir font-bold text-white`}
        >
          3
        </div>
        <p className="text-foreground-secondary">Creator Details</p>
      </div>
    </div>
  );
};

export default Stepper;
