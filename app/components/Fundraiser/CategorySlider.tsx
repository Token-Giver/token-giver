import { CATEGORIES } from "@/static";
import Link from "next/link";

const CategorySlider = () => {
  return (
    <div className="relative mx-auto mb-8">
      {/* Gradient indicators for scroll */}
      <div className="absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent"></div>

      {/* Scrollable container */}
      <div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-4 font-poppins [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
        {/* Category buttons */}
        {CATEGORIES.map((category, index) => (
          <Link
            href={`/discover/${category.slug}`}
            key={index}
            className={`shrink-0 rounded-full px-2 py-1 text-sm transition-colors ${
              index === 0
                ? "bg-accent-green text-white hover:bg-[#0f6647]"
                : "bg-[#F7F7F6] text-foreground-primary"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
