import { InputDateType } from "@/types";
import { ChangeEvent } from "react";

const StepThree = ({
  step,
  inputData,
  handleInputChange,
  address
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
      className={`flex-col gap-4 ${step.number === 3 ? "flex" : "hidden"}`}
    >
      <label htmlFor="target">Target:</label>
      <div className="relative">
        <p className="absolute right-[.5em] top-[-1.2rem] text-[.7em] text-red">
          Required*
        </p>
        <input
          type="text"
          name="target"
          onChange={handleInputChange}
          value={inputData.target}
          placeholder="STRK"
          className="w-full rounded-[10px] border-[1px] border-solid border-gray-400 bg-transparent p-3"
        />
      </div>

      <label htmlFor="location">Location:</label>
      <div className="relative">
        <p className="absolute right-[.5em] top-[-1.2rem] text-[.7em] text-red">
          Required*
        </p>
        <input
          type="text"
          name="location"
          value={inputData.location}
          onChange={handleInputChange}
          placeholder="Name of organizer"
          className="w-full rounded-[10px] border-[1px] border-solid border-gray-400 bg-transparent p-3"
        />
      </div>
      <label htmlFor="organizer">Organizer:</label>
      <div className="relative">
        <p className="absolute right-[.5em] top-[-1.2rem] text-[.7em] text-red">
          Required*
        </p>
        <input
          type="text"
          name="organizer"
          value={inputData.organizer}
          onChange={handleInputChange}
          placeholder="Name of organizer"
          className="w-full rounded-[10px] border-[1px] border-solid border-gray-400 bg-transparent p-3"
        />
      </div>
      <label htmlFor="beneficiary">Beneficiary:</label>
      <input
        type="text"
        name="beneficiary"
        value={inputData.beneficiary}
        onChange={handleInputChange}
        placeholder="Name of organizer"
        className="rounded-[10px] border-[1px] border-solid border-gray-400 bg-transparent p-3"
      />
    </fieldset>
  );
};

export default StepThree;
