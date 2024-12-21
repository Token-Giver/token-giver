import Campaigns from "./components/Campaigns";
import Donate from "./components/Donate";
import WhyTokenGiver from "./components/Why";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col  mt-[5rem] py-10 ">
      <Hero />
      <Campaigns />
      <WhyTokenGiver />
      <Donate />
    </main>
  );
}
