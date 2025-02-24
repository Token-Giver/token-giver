import Categories from "./components/Categories";
import FAQ from "./components/FAQ";
import Fundraisers from "./components/Fundraiser/Fundraisers";
import Hero from "./components/Hero";
import ViewModalImage from "./components/viewImageModal";


export default function Home() {
  return (
    <main className="mt-[5rem] flex flex-col gap-10 px-4 py-10 md:px-10 lg:px-16">
      <Hero />
      <Fundraisers />
      <Categories />
      <FAQ />
    </main>
  );
}
