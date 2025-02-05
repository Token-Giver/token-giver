"use client";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is this website about?",
    answer: "This website is [your website description here].",
  },
  {
    question: "How do I get started?",
    answer: "You can get started by [your instructions here].",
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team at [contact information].",
  },
  // Add more FAQ items as needed
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="">
      <div className="mb-8 max-w-[700px] mx-auto">
        <h2 className="text-center mb-2 text-l">
          <span className=" font-agrandir ">Frequently</span> Asked{" "}
          <span className=" font-agrandir">Questions</span>
        </h2>
        <p className="text-center text-foreground-secondary">
          Find quick answers to common queries in our FAQs section, designed to
          address your most pressing questions and provide you with the
          information you need.
        </p>
      </div>

      <div className="space-y-4 mx-auto max-w-[800px]">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b-foreground-secondary border border-x-transparent border-b-solid border-t-transparent"
          >
            <button
              className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium">{item.question}</span>
              <span
                className={`transform transition-transform duration-200 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
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
                <div className="p-4 pt-0 text-gray-600">{item.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
