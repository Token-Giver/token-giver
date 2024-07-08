"use client";
import ConnectButton from "@/app/components/ConnectButton";
import Logo from "@/svgs/Logo";
import SendIcon from "@/svgs/SendIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Donate = ({
  params,
}: {
  params: { name: string; token_id: string; address: string };
}) => {
  const router = useRouter();

  const handleRouteToCampaign = () => {
    if (params.token_id && params.address) {
      const tokenId = params.token_id;
      const contractAddress = params.address;
      const campaignName = params.name;
      router.push(`/${campaignName}/${tokenId}/${contractAddress}`);
    }
  };

  return (
    <section className="bg-off-white md:bg-theme-green w-screen min-h-screen   flex justify-between ">
      <div className="hidden w-[40%] md:flex flex-col p-4 items-center ">
        <button
          onClick={handleRouteToCampaign}
          className="w-fit text-[1.2em] self-start justify-self-start text-white"
        >
          &lt; campaign
        </button>
        <div className="my-auto">
          <p className="font-bold text-white text-[1.5em]">
            <Logo />
          </p>

          <h2 className="text-amber-400">Every Token Counts!</h2>
          <div className="flex gap-2 items-center text-white">
            <p className=" mt-3 ">Empowering Change Through Generosity</p>
          </div>
        </div>
      </div>
      <div className="bg-off-white max-w-[500px] mx-auto md:max-w-none py-10 px-4 lg:py-10 lg:px-[5vw] w-full md:w-[60%]  md:rounded-tl-[50px] md:shadow-hero-shadow flex flex-col gap-10 md:gap-20 ">
        <div className="flex flex-wrap items-center justify-between md:justify-end">
          <button
            onClick={handleRouteToCampaign}
            className="block md:hidden w-fit text-[1em] md:text-[1.2em] self-start justify-self-start"
          >
            &lt; campaign
          </button>
          <ConnectButton />
        </div>
        <div className=" w-full lg:min-w-[35rem] lg:w-[75%] md:my-auto mx-auto px-4 lg:px-12 flex flex-col gap-4">
          <div className="md:hidden">
            <p className="font-bold text-[1.5em] text-theme-green flex items-center gap-1">
              <Logo />
            </p>
            <h2 className="text-amber-400">Every Token Counts!</h2>
          </div>
          <div className="flex flex-col-reverse gap-8 md:grid md:grid-cols-3 md:gap-4 ">
            <div className="hidden md:block w-[130px] h-[90px] rounded-[5px] relative">
              <Image
                className="w-full h-full rounded-[5px] object-cover"
                src="/tim-mossholder-kxk3rAa9thw-unsplash.jpg"
                alt=""
                fill
              />
            </div>
            <p className="col-span-2 text-clamp md:text-[1em]">
              You’re supporting{" "}
              <span className="font-semibold"> Help my family evacuate</span>{" "}
              from Rafah
            </p>
          </div>
          <div className="w-fit mx-auto mt-8">
            <h5 className="font-medium">Send ETH</h5>
            <div className="h-[70px] w-[70px]  relative rounded-full mx-auto">
              <img
                className="rounded-full h-full w-full"
                src="/eth.svg"
                alt=""
              />
              <div className="right-[-10%] top-[60%] absolute bg-theme-green h-[30px] w-[30px] flex items-center justify-center rounded-full">
                <SendIcon />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-medium">Enter your donation</label>
            <div className="relative w-full">
              <div className="absolute right-[1rem]  top-[25%] flex flex-col items-end justify-end">
                <select
                  className=" text-[.875em] w-fit  border-solid border-[1px] border-gray-400  bg-transparent rounded-full"
                  name=""
                  id=""
                >
                  {" "}
                  <option value="">ETH</option> <option value="">STRK</option>
                </select>
                <p className="text-[.75em]">Balance: 10.000 ETH</p>
              </div>

              <input
                className="text-[2em] w-full bg-transparent border-solid border-[1px] border-gray-400 p-5 rounded-[10px]"
                type="text"
                placeholder="0"
              />
            </div>
            <button className="bg-theme-green text-white py-3 px-6 rounded-[10px] w-full">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
