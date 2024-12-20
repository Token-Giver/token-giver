import { InputDateType } from "@/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Dropzone from "./Dropzone";

const StepTwo = ({
  step,
  inputData,
  handleInputChange,
  address,
  setInputData,
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
      className={`flex-col gap-4  ${
        step.number === 2 || step.number === 1 ? "flex" : "hidden"
      }`}
    >
      <label htmlFor="name">Name:</label>
      <div className="relative">
        <p className="absolute top-[-1.2rem] right-[.5em] text-red text-[.7em]">
          Required*
        </p>
        <input
          type="text"
          name="name"
          required
          value={inputData.name}
          onChange={handleInputChange}
          placeholder="Name of campaign"
          className={`w-full bg-transparent border-solid border-[1px] border-gray-300 p-3 rounded-[10px]`}
          disabled={!address}
        />
      </div>
      <label htmlFor="description">Description of campaign:</label>
      <div className="relative">
        <p className="absolute top-[-1.2rem] right-[.5em] text-red text-[.7em]">
          Required*
        </p>
        <textarea
          required
          placeholder="Write your description here..."
          className={`w-full bg-transparent border-solid border-[1px] border-gray-300 p-4  leading-6 rounded-[10px] resize-none overflow-y-auto no-scrollbar`}
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

      <div className="flex flex-col gap-4">
        <div className="form-group">
          <label htmlFor="image">Main Campaign Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">Additional Campaign Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleInputChange}
          />
          <small className="text-gray-500">You can select multiple images</small>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="name">Instagram:</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={inputData.instagram}
              onChange={handleInputChange}
              placeholder="Instagram url"
              className={`w-full bg-transparent border-solid border-[1px] border-gray-300 p-3 rounded-[10px]`}
              disabled={!address}
            />
          </div>
        </div>
        <div>
          <label htmlFor="name">LinkedIn:</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={inputData.linkedin}
              onChange={handleInputChange}
              placeholder="linkedin url"
              className={`w-full bg-transparent border-solid border-[1px] border-gray-300 p-3 rounded-[10px]`}
              disabled={!address}
            />
          </div>
        </div>
        <div>
          <label htmlFor="name">X:</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={inputData.x}
              onChange={handleInputChange}
              placeholder="x url"
              className={`w-full bg-transparent border-solid border-[1px] border-gray-300 p-3 rounded-[10px]`}
              disabled={!address}
            />
          </div>
        </div>
        <div>
          <label htmlFor="name">Youtube:</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={inputData.youtube}
              onChange={handleInputChange}
              placeholder="Youtube url"
              className={`w-full bg-transparent border-solid border-[1px] border-gray-300 p-3 rounded-[10px]`}
              disabled={!address}
            />
          </div>
        </div>
        <div>
          <label htmlFor="name">Website:</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={inputData.website}
              onChange={handleInputChange}
              placeholder="Website url"
              className={`w-full bg-transparent border-solid border-[1px] border-gray-300 p-3 rounded-[10px]`}
              disabled={!address}
            />
          </div>
        </div>
        <div>
          <label htmlFor="name">Github:</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={inputData.github}
              onChange={handleInputChange}
              placeholder="Github url"
              className={`w-full bg-transparent border-solid border-[1px] border-gray-300 p-3 rounded-[10px]`}
              disabled={!address}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default StepTwo;
