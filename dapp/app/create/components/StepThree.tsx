import { InputDateType } from "@/types";
import { ChangeEvent } from "react";

const StepThree = ({
  step,
  inputData,
  handleInputChange,
  address,
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
}) => {
  return (
    <fieldset
      className={`flex-col gap-4  ${step.number === 3 ? "flex" : "hidden"}`}
    >
      <label htmlFor="target">Target:</label>
      <div className="relative">
        <p className="absolute top-[-1.2rem] right-[.5em] text-red-600 text-[.7em]">
          Required*
        </p>
        <input
          type="text"
          name="target"
          onChange={handleInputChange}
          value={inputData.target}
          placeholder="STRK"
          className="w-full bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
        />
      </div>

      <label htmlFor="location">Location:</label>
      <div className="relative">
        <p className="text-red-600  absolute top-[-1.2rem] right-[.5em] text-[.7em]">
          Required*
        </p>
        <input
          type="text"
          name="location"
          value={inputData.location}
          onChange={handleInputChange}
          placeholder="Name of organizer"
          className="w-full bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
        />
      </div>
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
    </fieldset>
  );
};

export default StepThree;
