"use client";
import Categories from "../components/Categories";
import CategoryPreview from "./CategoryPreview";
import { CATEGORIES } from "@/static";

const page = () => {
  return (
    <section className="mx-auto mt-[5rem] min-h-[40vh] animate-fadeIn px-4 py-8 md:px-8 2xl:px-16">
      <div className="mb-8">
        <div className="mx-auto max-w-[1204px] space-y-5 text-center">
          <p className="text-foreground-secondary">
            Browse Campaigns by Category
          </p>
          <h2 className="font-agrandir text-2xl text-foreground-primary md:text-3xl lg:text-4xl xl:text-5xl">
            Find Causes You Care About
          </h2>
          <p className="mx-auto max-w-[900px] text-foreground-secondary">
            Explore meaningful campaigns that make a difference. Whether you're
            passionate about education, healthcare, environment, or community
            development, find and support causes that align with your values.
          </p>
        </div>
      </div>
      <Categories showIntro={false} />
      <div className="mt-12 space-y-8">
        {CATEGORIES.map((category) => (
          <CategoryPreview
            key={category.name}
            categoryName={category.name}
            categorySlug={category.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
