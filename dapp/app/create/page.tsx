"use client";
import { ChangeEvent, useEffect, useState } from "react";
import ConnectButton from "../components/ConnectButton";
import { useAccount } from "@starknet-react/core";
import StepTwo from "./components/StepTwo";
import { InputDateType } from "@/types";
import StepThree from "./components/StepThree";
import Logo from "@/svgs/Logo";

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
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputData((prev) => {
      if (
        name === "image" &&
        e.target instanceof HTMLInputElement &&
        e.target.files
      ) {
        return {
          ...prev,
          image: e.target.files[0],
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadFileToPinata = async ({
    fileToUpload,
  }: {
    fileToUpload: File;
  }) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch(
        `https://api.pinata.cloud/pinning/pinFileToIPFS`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
          },
          body: data,
        }
      );
      const resData = await res.json();
      setCid(resData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
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
    <main className="min-h-screen  flex justify-between bg-theme-green md:mb-10 relative">
      <div className="w-[40%] items-center justify-center hidden md:flex">
        <div className="flex flex-col gap-8 p-4">
          <p className="font-bold text-white text-[1.5em]">
            <Logo />
          </p>

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
          <StepTwo
            inputData={inputData}
            handleInputChange={handleInputChange}
            address={address}
            step={step}
            setInputData={setInputData}
          />
          <StepThree
            inputData={inputData}
            handleInputChange={handleInputChange}
            address={address}
            step={step}
          />
        </form>
        <div
          className={`flex mt-4  md:p-4  ${
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
          <div className="flex">
            <button
              disabled={!inputData.name || !inputData.description || !address}
              onClick={() =>
                setStep(() => {
                  return {
                    text: "Tell us about you and your goals",
                    number: 3,
                  };
                })
              }
              className={`bg-theme-green text-white py-2 px-6 rounded-[10px] w-fit justify-self-end self-end ${
                step.number === 3 ? "hidden" : "block"
              } `}
            >
              Continue
            </button>
            <button
              disabled={!inputData.target || !inputData.location}
              className={`bg-theme-green text-white py-2 px-6 rounded-[10px] w-fit justify-self-end self-end ${
                step.number === 3 ? "block" : "hidden"
              } `}
            >
              Mint a campaign
            </button>
          </div>
        </div>
      </div>

      <div className="bg-off-white h-[50px] p-8 w-full absolute bottom-[-64px] left-0 hidden md:block"></div>
    </main>
  );
};

export default Page;
