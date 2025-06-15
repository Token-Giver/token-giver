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
    <div className="py-8 md:px-8">
      <div className="space-y-6 text-center">
        <h2 className="mb-4 text-center max-lgMobile:text-xl">
          <span className="font-agrandir">Easy</span> Steps{" "}
          <span className="font-agrandir">You Can't Miss</span>
        </h2>
        <p className="text-foreground-secondary">
          Token Giver makes fundraising and donating a seamless experience with
          cutting-edge blockchain technology.
        </p>
      </div>

      <div
        onClick={toggleTab}
        className="relative mx-auto mt-8 flex h-10 w-[280px] cursor-pointer items-center gap-x-2 rounded-full bg-[#F0F0F0] p-0.5 text-lg leading-6 transition-all duration-300 hover:bg-[#E8E8E8]"
      >
        <div
          className={`absolute left-0.5 top-1/2 h-[calc(100%-4px)] w-[calc(50%-3px)] -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-300 ease-in-out ${
            currentTab === "donations"
              ? "translate-x-0"
              : "translate-x-[calc(100%+2px)]"
          }`}
        />
        <span
          className={`relative z-10 flex-1 rounded-full px-4 py-1.5 text-center text-sm transition-colors duration-300 ${
            currentTab === "donations"
              ? "font-semibold text-[#121212]"
              : "text-[#8E9BAE]"
          }`}
        >
          Donations
        </span>
        <span
          className={`relative z-10 flex-1 rounded-full px-4 py-1.5 text-center text-sm transition-colors duration-300 ${
            currentTab === "fundraisers"
              ? "font-semibold text-[#121212]"
              : "text-[#8E9BAE]"
          }`}
        >
          Fundraisers
        </span>
      </div>

      <div className="mx-auto max-w-[400px] py-8 lg:max-w-none">
        <h2 className="font-AgrandirRegular text-foreground-secondary">
          {currentTab === "donations" ? "For Donors" : "For Fundraisers"}
        </h2>

        <div className="flex flex-col">
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
