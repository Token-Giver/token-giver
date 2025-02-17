"use client";
import React, { useState } from "react";

import StepBlock from "./StepBlock";
import { donorSteps, fundraiserSteps } from "@/static/learn";

function EasySteps() {
  const [currentTab, setCurrentTab] = useState<"donations" | "fundraisers">(
    "donations"
  );
  const toggleTab = () => {
    setCurrentTab((prev) =>
      prev === "donations" ? "fundraisers" : "donations"
    );
  };
  return (
    <div className="px-[100px] py-[90px]">
      <div className="mx-auto max-w-[925px]">
        <h3 className="font-AgrandirBold text-raisin-black mb-4 text-center text-3xl">
          Easy <span className="font-AgrandirRegular">Steps</span> You Can't
          Miss
        </h3>
        <p className="text-ash mb-[30px] text-center text-base leading-8">
          TokenGiver makes fundraising and donating a seamless experience with
          cutting-edge blockchain technology.
        </p>
      </div>

      <div
        onClick={toggleTab}
        className="relative mx-auto flex w-fit cursor-pointer items-center gap-x-[10px] rounded-full bg-[#F0F0F0] p-[10px] text-lg leading-6 transition-colors duration-300"
      >
        <div
          className={`absolute left-0 top-1/2 h-[43px] w-[140px] -translate-y-1/2 rounded-full bg-white shadow-md transition-transform duration-300 ${
            currentTab === "donations"
              ? "translate-x-[10px]"
              : "translate-x-[155px]"
          }`}
        />
        <span
          className={`relative z-10 rounded-full px-[30px] py-2 text-sm font-medium transition-colors duration-300 ${
            currentTab === "donations"
              ? "font-semibold text-[#121212]"
              : "font-medium text-[#8E9BAE]"
          }`}
        >
          Donations
        </span>
        <span
          className={`relative z-10 px-[30px] py-3 text-center text-sm font-medium transition-colors duration-300 ${
            currentTab === "fundraisers"
              ? "font-semibold text-[#121212]"
              : "font-medium text-[#8E9BAE]"
          }`}
        >
          Fundraisers
        </span>
      </div>

      <div className="mt-[38px]">
        <h2 className="font-AgrandirRegular text-ash mb-[14px] text-xl">
          {currentTab === "donations" ? "For Donors" : "For Fundraisers"}
        </h2>

        <div className="flex flex-col gap-y-[50px]">
          {currentTab === "donations"
            ? donorSteps.map((step) => <StepBlock step={step} key={step.id} />)
            : fundraiserSteps.map((step) => (
                <StepBlock step={step} key={step.id} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default EasySteps;
