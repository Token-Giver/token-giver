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
  );
};

export default StepThree;
