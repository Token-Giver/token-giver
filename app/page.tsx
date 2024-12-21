import Campaigns from "./components/LandingPage/Campaigns";
import Donate from "./components/LandingPage/Donate";
import Hero from "./components/LandingPage/Hero";
import WhyTokenGiver from "./components/LandingPage/Why";


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
