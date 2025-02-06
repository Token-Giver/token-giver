"use client";
import { CATEGORIES } from "@/static";
import Image from "next/image";

const Categories = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-center text-l">
          <span className=" font-agrandir ">Browse</span> Causes{" "}
          <span className=" font-agrandir">By Categories</span>
        </h2>
        <p className="text-center text-foreground-secondary">
          {" "}
          Explore the World of Fundraising!
        </p>
        <p className="text-center  text-foreground-secondary">
          Dive into curated categories and find a campaign that inspires you:
        </p>
      </div>
      <div>
        <div className="grid max-w-[55rem] mx-auto grid-cols-5  gap-2">
          {CATEGORIES.map((category, index) => (
            <div
              key={category.name}
              className="items-center flex flex-col  justify-center "
            >
              <div className="w-[10em] bg-[#F7F7F6] grid place-content-center  mb-2 rounded-[10px] h-[10rem]">
                <div className="w-[65px]  h-[65px] ">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    height={100}
                    width={100}
                  />
                </div>
              </div>
              <p className="font-medium whitespace-nowrap font-poppins text-sm">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
