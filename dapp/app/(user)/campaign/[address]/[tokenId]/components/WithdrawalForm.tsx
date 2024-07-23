import WithdrawIcon from "@/svgs/WithdrawIcon";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  withdrawalFormOpen: boolean;
  setWithdrawalFormOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  withdrawalInputs: {
    beneficiary: string;
    amount: string;
  };
};

const WithdrawalForm = ({
  withdrawalFormOpen,
  setWithdrawalFormOpen,
  withdrawalInputs,
  handleChange,
}: Props) => {
  return (
    <div
      className={`grid  overflow-hidden ${
        withdrawalFormOpen
          ? "grid-rows-[1fr] transition-all duration-300"
          : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden flex flex-col gap-4 mb-4">
        <h3 className="text-theme-green">Send STRK</h3>
        <div>
          <label htmlFor="">Beneficiary address:</label>
          <input
            onChange={handleChange}
            className="w-full bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px] mt-2"
            type="text"
            placeholder="Enter wallet address"
            value={withdrawalInputs.beneficiary}
            name="beneficiary"
          />
        </div>
        <div>
          <label htmlFor="">Amount:</label>
          <input
            onChange={handleChange}
            className="w-full bg-transparent border-solid border-[1px] border-gray-400 p-3 rounded-[10px] mt-2"
            type="text"
            placeholder="Enter amount"
            value={withdrawalInputs.amount}
            name="amount"
          />
        </div>
        <button
          onClick={() => setWithdrawalFormOpen(true)}
          className={`w-full bg-theme-green p-2 rounded-[5px]  disabled:cursor-not-allowed justify-center items-center text-white  gap-2 flex`}
        >
          <span>Withdraw now</span>{" "}
          <span className="text-theme-yellow">
            <WithdrawIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default WithdrawalForm;
