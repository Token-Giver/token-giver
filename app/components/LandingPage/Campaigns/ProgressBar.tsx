import React from "react";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="space-y-2">
      <p>{percentage}% there</p>
      <div className="relative w-full h-[6px] bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-[6px] bg-theme-green"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
