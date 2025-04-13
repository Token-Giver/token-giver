"use client";
import { CATEGORIES } from "@/static";
import Image from "next/image";
import Link from "next/link";

const Categories = ({ showIntro = true }) => {
  return (
    <div>
      {showIntro && (
        <div className="mb-8">
          <h2 className="mb-4 text-center max-lgMobile:text-xl">
            <span className="font-agrandir">Browse</span> Causes{" "}
            <span className="font-agrandir">By Categories</span>
          </h2>
          <p className="text-center text-foreground-secondary">
            {" "}
            Explore the World of Fundraising!
          </p>
          <p className="text-center text-foreground-secondary">
            Dive into curated categories and find a campaign that inspires you:
          </p>
        </div>
      )}
      <div>
        <div className="mx-auto grid max-w-[55rem] grid-cols-5 gap-2 max-[950px]:grid-cols-4 max-[850px]:grid-cols-3 max-lgMobile:grid-cols-2 max-[340px]:grid-cols-1">
          {CATEGORIES.map((category, index) => (
            <Link
              href={`/discover/${category.slug}`}
              key={category.name}
              className="flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <div className="mb-2 grid h-[10rem] w-full place-content-center rounded-[10px] bg-[#F7F7F6] transition-colors hover:bg-gray-100">
                <div className="h-[65px] w-[65px]">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    height={100}
                    width={100}
                  />
                </div>
              </div>
              <p className="hover:text-primary whitespace-nowrap font-poppins text-sm font-medium transition-colors max-[415px]:text-xs">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
