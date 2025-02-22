import {H3} from "@/app/components/util/Headers";
import {Avatar} from "@/svgs/Avatar";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import React from "react";

const OrganizerandBeneficiary = () => {
   return (
      <div className="px-5 md:px-0 mt-10">
         <H3 style="text-[20px] md:text-[24px] font-[700] text-[#282828] my-3">Organizer and Beneficiary</H3>
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full md:w-[75%] lg:w-[85%]">
            <div className="flex flex-row gap-2 items-center w-full">
               <Avatar />
               <div className="flex flex-col gap-2 items-start w-full">
                  <H3 style="text-[18px] font-[500] text-[#282828]">Alhandro Pedro</H3>
                  <p className="text-[18px] font-[600] text-[#55534e]">Organizer</p>
               </div>
            </div>
            <span className="text-[#8E9BAE] width-[15.39px] h-[13.47px] rotate-90 sm:rotate-0">
               <RightArrowIcon />
            </span>
         
            <div className="flex flex-row gap-2 items-center w-full">
               <Avatar />
               <div className="flex flex-col gap-2 items-start w-full">
                  <H3 style="text-[18px] font-[500] text-[#282828] ">Kenny's Family</H3>
                  <p className="text-[18px] font-[600] text-[#55534e]">Benificiary</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrganizerandBeneficiary;
