import Categories from "./components/Campaigns";
import Features from "./components/Features";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col gap-10  mt-[5rem] py-10 px-4 md:px-10 lg:px-28">
      <Hero />
      <Categories />
      <Features />
    </main>
  );
}
