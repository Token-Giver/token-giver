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
        <div className="mx-auto grid max-w-[25rem] grid-cols-2 gap-2 lgMobile:max-w-[40rem] lgMobile:grid-cols-3 md:max-w-[60rem] md:grid-cols-4 md:gap-3 lg:grid-cols-5">
          {CATEGORIES.map((category, index) => (
            <Link
              href={`/discover/${category.slug}`}
              key={category.name}
              className="group flex flex-col items-center justify-center transition-all duration-300"
            >
              <div className="mb-2 grid h-[10rem] w-full place-content-center rounded-[10px] bg-[#F7F7F6] transition-all duration-300 hover:bg-gray-100 group-hover:scale-105">
                <div className="h-[65px] w-[65px] grayscale group-hover:grayscale-0">
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
