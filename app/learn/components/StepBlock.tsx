export type Step = {
  id: number;
  title: string;
  subtext: string;
  points: string[];
  illus: string;
};

import React from "react";

function StepBlock({ step }: { step: Step }) {
  return (
    <div
      className={`flex ${
        step.id % 2 ? "flex-row-reverse" : "flex-row"
      } items-center justify-between pt-5`}
    >
      <div className="relative font-agrandir text-lg leading-8 text-black">
        <img src={step.illus} className="h-[555px] w-[547px]" alt="" />
        <div
          className={`absolute -top-[15px] flex items-center gap-x-[10px] ${
            step.id % 2
              ? "-left-[71px] flex-row-reverse"
              : "-right-[71px] flex-row"
          }`}
        >
          <div className="rounded-full border-[.4px] border-[#D9D9D9] bg-white px-4 py-[7px] text-center">
            {step.id + 1}
          </div>
          <div>Step</div>
        </div>
      </div>
      <div className="max-w-[600px] font-medium text-foreground-secondary">
        <h2 className="text-raisin-black mb-4 font-agrandir text-xl">
          {step.title}
        </h2>
        <p>{step.subtext}</p>
        <ul className="ml-[30px] list-disc text-base leading-8">
          {step.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StepBlock;
