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
      className={`flex gap-8 lg:gap-16 ${
        step.id % 2
          ? "flex-col-reverse lg:flex-row-reverse"
          : "flex-col-reverse lg:flex-row"
      } items-center justify-between pt-5`}
    >
      <div className="relative h-[350px] w-[350px] shrink-0 font-agrandir text-lg leading-8 text-black md:h-[400px] md:w-[400px]">
        <img src={step.illus} alt="" />
        <div
          className={`absolute -top-[10px] hidden items-center gap-1 lg:flex ${
            step.id % 2
              ? "-left-[60px] flex-row-reverse"
              : "-right-[65px] flex-row"
          }`}
        >
          <div className="grid h-10 w-10 place-content-center rounded-full border-[.4px] border-[#D9D9D9] bg-white">
            {step.id + 1}
          </div>
          <div>Step</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-foreground-secondary">
        <p className="flex items-center gap-2 font-agrandir text-base text-foreground-primary">
          Step{" "}
          <span className="grid h-[30px] w-[30px] place-content-center items-center rounded-full border-[.4px] border-[#D9D9D9]">
            {step.id + 1}
          </span>
        </p>
        <h3 className="font-agrandir text-2xl text-foreground-primary">
          {step.title}
        </h3>
        <p className="font-agrandir">{step.subtext}</p>
        <ul className="ml-[20px] list-disc space-y-2 text-sm">
          {step.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StepBlock;
