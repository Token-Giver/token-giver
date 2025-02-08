import { InputDateType } from "@/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Dropzone from "./Dropzone";

const StepTwo = ({
  step,
  inputData,
  handleInputChange,
  address,
  setInputData
}: {
  step: {
    number: number;
    text: string;
  };
  inputData: InputDateType;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  address: string | undefined;
  setInputData: Dispatch<SetStateAction<InputDateType>>;
}) => {
  return (
    <fieldset
      id="step2Fieldset"
      className={`flex-col gap-4 ${
        step.number === 2 || step.number === 1 ? "flex" : "hidden"
      }`}
    >
      <label htmlFor="name">Name:</label>
      <div className="relative">
        <p className="absolute right-[.5em] top-[-1.2rem] text-[.7em] text-red">
          Required*
        </p>
        <input
          type="text"
          name="name"
          required
          value={inputData.name}
          onChange={handleInputChange}
          placeholder="Name of campaign"
          className={`w-full rounded-[10px] border-[1px] border-solid border-gray-300 bg-transparent p-3`}
          disabled={!address}
        />
      </div>
      <label htmlFor="description">Description of campaign:</label>
      <div className="relative">
        <p className="absolute right-[.5em] top-[-1.2rem] text-[.7em] text-red">
          Required*
        </p>
        <textarea
          required
          placeholder="Write your description here..."
          className={`no-scrollbar w-full resize-none overflow-y-auto rounded-[10px] border-[1px] border-solid border-gray-300 bg-transparent p-4 leading-6`}
          disabled={!address}
          onChange={handleInputChange}
          name="description"
          value={inputData.description}
          id=""
          cols={30}
          rows={10}
        ></textarea>
      </div>

      <label htmlFor="image">Upload campaign image:</label>
      <Dropzone address={address} setInputData={setInputData} />
    </fieldset>
  );
};

export default StepTwo;
