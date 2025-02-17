"use client";
import { faqs } from "@/static/learn";
import DownChevronIcon from "@/svgs/DownChevronIcon";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="">
      <div className="mx-auto mb-8 max-w-[700px]">
        <h2 className="text-l mb-2 text-center">
          <span className="font-agrandir">Frequently</span> Asked{" "}
          <span className="font-agrandir">Questions</span>
        </h2>
        <p className="text-center text-foreground-secondary">
          Find quick answers to common queries in our FAQs section, designed to
          address your most pressing questions and provide you with the
          information you need.
        </p>
      </div>

      <div className="mx-auto max-w-[800px] space-y-4 text-sm">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border-b-solid cursor-pointer border border-x-transparent border-b-foreground-secondary border-t-transparent"
          >
            <button
              className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium">{item.question}</span>
              <span
                className={`transform transition-transform duration-200 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                <DownChevronIcon />
              </span>
            </button>
            <div
              className={`grid transition-all duration-200 ease-in-out ${
                activeIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 pt-0 text-foreground-secondary">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
