"use client";
import { ChangeEvent, useEffect, useState } from "react";
import ConnectButton from "../components/ConnectButton";
import { useAccount } from "@starknet-react/core";
type InputDateType = {
  name: string;
  description: string;
  image: null | File;
  target: string;
  organizer: string;
  beneficiary: string;
  location: string;
};

const Page = () => {
  const { address } = useAccount();
  const [step, setStep] = useState({
    number: 1,
    text: "First connect your wallet",
  });
  const [inputData, setInputData] = useState<InputDateType>({
    name: "",
    description: "",
    image: null,
    target: "",
    organizer: "",
    beneficiary: "",
    location: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (address) {
      setStep(() => {
        return {
          text: "Tell us about your campaign",
          number: 2,
        };
      });
    } else {
      setStep(() => {
        return {
          text: "First connect your wallet",
          number: 1,
        };
      });
    }
  }, [address]);

  return (
    <main className="h-screen  flex justify-between bg-theme-green md:mb-10 relative">
      <div className="w-[40%] items-center justify-center hidden md:flex">
        <div className="flex flex-col gap-8 p-4">
          <p className="font-bold text-white text-[1.5em]">Logo.</p>

          <h2 className="text-amber-400">Start your fundraising journey!</h2>
          <div className="flex gap-2 items-center text-white">
            <span className="">
              <span className="text-[1.8em] mr-2">{step.number}</span>/ 3
            </span>
            <p className=" mt-3 ">{step.text}</p>
          </div>
        </div>
      </div>

      <div className=" w-full bg-off-white md:rounded-tl-[50px] md:shadow-hero-shadow py-10 px-4 lg:py-10 lg:px-20 md:w-[60%] flex flex-col justify-between ">
        <ConnectButton />
        <form className="flex flex-col gap-4  md:p-4" action="">
          <h2>Create your campaign</h2>
          <fieldset
            className={`flex-col gap-4  ${
              step.number === 2 || step.number === 1 ? "flex" : "hidden"
            }`}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={inputData.name}
              onChange={handleInputChange}
              placeholder="Name of campaign"
              className={`bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]`}
              disabled={!address}
            />
            <label htmlFor="description">Description of campaign:</label>
            <textarea
              placeholder="Write your description here..."
              className={`bg-transparent border-solid border-[1px] border-gray-400 p-4  leading-6 rounded-[10px] resize-none overflow-y-auto no-scrollbar`}
              disabled={!address}
              onChange={handleInputChange}
              name="description"
              value={inputData.description}
              id=""
              cols={30}
              rows={10}
            ></textarea>

            <label htmlFor="image">Upload campaign image:</label>
            <input
              type="file"
              name="image"
              id=""
              disabled={!address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  setInputData((prev) => {
                    return {
                      ...prev,
                      image: file,
                    };
                  });
                }
              }}
            />
          </fieldset>
          <fieldset
            className={`flex-col gap-4  ${
              step.number === 3 ? "flex" : "hidden"
            }`}
          >
            <label htmlFor="target">Target:</label>
            <input
              type="text"
              name="target"
              onChange={handleInputChange}
              value={inputData.target}
              placeholder="USDT"
              className="bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
            />
            <label htmlFor="organizer">Organizer:</label>
            <input
              type="text"
              name="organizer"
              value={inputData.organizer}
              onChange={handleInputChange}
              placeholder="Name of organizer"
              className="bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
            />
            <label htmlFor="beneficiary">Beneficiary:</label>
            <input
              type="text"
              name="beneficiary"
              value={inputData.beneficiary}
              onChange={handleInputChange}
              placeholder="Name of organizer"
              className="bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              value={inputData.location}
              onChange={handleInputChange}
              placeholder="Name of organizer"
              className="bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
            />
          </fieldset>
        </form>
        <div
          className={`flex  md:p-4  ${
            step.number === 2 || step.number === 1
              ? "justify-end"
              : "justify-between"
          }`}
        >
          <button
            disabled={!address}
            onClick={() =>
              setStep(() => {
                return {
                  text: "Tell us about your campaign",
                  number: 2,
                };
              })
            }
            className={`text-theme-green text-[2em] ${
              step.number === 2 || step.number === 1 ? "hidden" : "block"
            } `}
          >
            <span>&lt;</span>
          </button>
          <button
            disabled={!address}
            onClick={() =>
              setStep(() => {
                return {
                  text: "Tell us about you and your goals",
                  number: 3,
                };
              })
            }
            className="bg-theme-green text-white py-2 px-6 rounded-[10px] w-fit justify-self-end self-end "
          >
            {step.number === 2 ? "Continue" : "Create"}
          </button>
        </div>
      </div>

      <div className="bg-off-white h-[50px] p-8 w-full absolute bottom-[-64px] left-0 hidden md:block"></div>
    </main>
  );
};

export default Page;
