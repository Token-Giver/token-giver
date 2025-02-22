import {H1, H3} from "@/app/components/util/Headers";
import {Avatar} from "@/svgs/Avatar";
import React from "react";

const WallofLove = () => {
   const comments = [
      {
         id: 1,
         name: "John Doe",
         comment: "you inspire me everyday",
         havedonated: 30,
         date: "2 days ago",
      },
      {
         id: 2,
         name: "Jane Doe",
         comment: "you inspire me everyday",
         havedonated: 30,
         date: "2 days ago",
      },
      {
         id: 3,
         name: "John Doe",
         comment: "you inspire me everyday",
         havedonated: 30,
         date: "2 days ago",
      },
      {
         id: 4,
         name: "Jane Doe",
         comment: "you inspire me everyday",
         havedonated: 30,
         date: "2 days ago",
      },
   ];
   return (
      <div>
         <H1 style="text-[40px] font-[400]">
            <span className=" text-[#282828] font-[700]">Wall of</span> Love (<span className="text-[#00594c]">23</span>)
         </H1>
         <p className=" text-[#8e9bae] text-[16px] font-[500] my-2">A little word of encouragement would go a long way</p>
         <br />
         <section className="flex flex-row gap-4 items-center justify-start">
            <Avatar />
            <input type="text" className="w-[407px] h-[46px] rounded-[50px] border-[1px] border-solid border-[#A1A1A1] focus:outline-none pl-5" placeholder="Add a comment" />
         </section>
         <ul className="mt-10 flex flex-col gap-10 ml-3">
            {comments.map((comment) => {
               return (
                  <li className=" flex flex-row gap-4 items-start w-[312px] ">
                     <Avatar />
                     <div className="flex flex-col gap-2 items-start flex-grow">
                        <div className="flex flex-row flex-grow gap-2 items-center justify-between w-full">
                           <H3 style="text-[16px] font-[700] text-[#282828]">{comment.name}</H3>
                           <p className="text-[#8E9BAE] text-[16px] font-[600]">- {comment.havedonated} STRK</p>
                        </div>
                        <p className="text-[14px] font-[600] text-[#8E9BAE] pl-2 flex flex-row justify-start items-center gap-4 w-full"> {comment.date}</p>
                        <p className="text-[#282828] text-[16px] font-[400] w-full">{comment.comment}</p>
                     </div>
                  </li>
               );
            })}
            <button className="w-[137px] h-[45px] rounded-[44.98px] border-[#808080] border-solid border-[1px] text-[#282828] font-[600] size-[16px]">See More</button>
         </ul>
      </div>
   );
};

export default WallofLove;
