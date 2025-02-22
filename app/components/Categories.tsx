"use client";
import { CATEGORIES } from "@/static";
import Image from "next/image";
import Link from "next/link";

const Categories = ({ showIntro = true }) => {
  return (
    <div>
      {showIntro && (
        <div className="mb-8">
          <h2 className="text-l mb-4 text-center">
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
        <div className="sm:grid-cols-3 md:grid-cols-4 mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-5">
          {CATEGORIES.map((category, index) => (
            <Link
              href={`/discover/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
              key={category.name}
              className="flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <div className="mx-auto mb-2 flex h-[10rem] w-full items-center justify-center rounded-[10px] bg-[#F7F7F6] transition-colors hover:bg-gray-100">
                <div className="h-[56px] w-[56px] xl:h-[64px] xl:w-[64px]">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    height={100}
                    width={100}
                  />
                </div>
              </div>
              <p className="hover:text-primary whitespace-nowrap font-poppins text-[12px] sm:text-xs font-medium transition-colors">
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
