"use client";
import { useState } from "react";

const Status = ({ status }: { status: string }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    setIsSelected((prev: boolean) => !prev); // Toggle the selected state
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className={`whitespace-nowrap px-6 py-2.5 border rounded-[3rem] text-center ${
          isSelected
            ? "border-pantone-green bg-pantone-green text-white"
            : "border-dark-gray"
        }`}
      >
        {status}
      </button>
    </div>
  );
};

export default Status;
