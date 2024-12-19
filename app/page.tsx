import Fundraisers from "./components/Fundraiser/Fundraisers";
import Hero from "./components/Hero";

export default function Home() {
	return (
		<main className="flex flex-col gap-10 rounded-t-[50px] mt-[5rem] py-10 px-4 md:px-10 lg:px-16">
			<Hero />
			<Fundraisers />
		</main>
	);
}
