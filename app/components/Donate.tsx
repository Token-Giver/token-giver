import DonateIcon from "@/svgs/DonateIcon";
import Link from "next/link";
import React from "react";

export default function Donate() {
  return (
    <div className="bg-theme-green w-full px-5 lg:px-0 py-[100px] flex flex-col items-center justify-center">
      <div>
        <h1 className="text-white text-center font-semibold text-[1.6rem]">
          Donate and help push campaigns
        </h1>
        <p className="text-center text-base font-normal text-white py-5">
          Your donation will help push the cause of various campaigns such as
          education, healthcare and relief
        </p>
      </div>
      <div>
        <Link href="/create">
          <button className="bg-transparent flex items-center gap-x-2 border border-white  text-white px-3 py-2 mt-4 rounded-full">
            Donate now <DonateIcon />
          </button>
        </Link>
      </div>
    </div>
  );
}
