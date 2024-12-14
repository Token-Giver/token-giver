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

  const timezones = ["GMT", "UTC"];

  return (
    <fieldset
      className={`flex-col gap-4  ${step.number === 3 ? "flex" : "hidden"}`}
    >
      <label htmlFor="target">Target:</label>
      <div className="relative">
        <p className="absolute top-[-1.2rem] right-[.5em] text-red text-[.7em]">
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
        <p className="text-red  absolute top-[-1.2rem] right-[.5em] text-[.7em]">
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
      <div className="relative">
        <p className="text-red  absolute top-[-1.2rem] right-[.5em] text-[.7em]">
          Required*
        </p>
        <input
          type="text"
          name="organizer"
          value={inputData.organizer}
          onChange={handleInputChange}
          placeholder="Name of organizer"
          className="w-full bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
        />
      </div>
      <label htmlFor="beneficiary">Beneficiary:</label>
      <input
        type="text"
        name="beneficiary"
        value={inputData.beneficiary}
        onChange={handleInputChange}
        placeholder="Name of organizer"
        className="bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px]"
      />
      <label htmlFor="lockUntilTime">Lock Until: </label>
      <div className="p-6 bg-gray-100 rounded-md">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col">
          Date
          <input
            type="date"
            name="day"
            value={inputData.day}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Hour (Optional)
          <input
            type="number"
            name="hour"
            value={inputData.hour}
            onChange={handleInputChange}
            min="0"
            max="23"
            className="border border-gray-300 p-2 rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Minute (Optional)
          <input
            type="number"
            name="minute"
            value={inputData.minute}
            onChange={handleInputChange}
            min="0"
            max="59"
            className="border border-gray-300 p-2 rounded-md"
          />
        </label>
        <label className="flex flex-col">
          Second (Optional)
          <input
            type="number"
            name="second"
            value={inputData.second}
            onChange={handleInputChange}
            min="0"
            max="59"
            className="border border-gray-300 p-2 rounded-md"
          />
        </label>
        <label className="flex flex-col col-span-2">
          Timezone
          <select
            name="timezone"
            // value={inputData.timezone}
            // onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* <div className="mt-4">
        <p className="text-gray-700">Unix Timestamp: {unixTimestamp}</p>
      </div> */}
    </div>
    </fieldset>
  );
};

export default StepThree;
