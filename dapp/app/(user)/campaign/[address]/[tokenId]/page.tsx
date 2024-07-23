import CampaignLoader from "@/app/components/loading/CampaignLoader";
import Container from "@/app/components/util/Container";
import CalenderIcon from "@/svgs/CalenderIcon";
import ShareIcon from "@/svgs/ShareIcon";
import WithdrawIcon from "@/svgs/WithdrawIcon";
import Image from "next/image";

const page = () => {
  return (
    <>
      {/* {campaignDetails.name ? ( */}
      <section className=" mt-[4rem]  bg-background">
        <Container className="mx-auto py-10 md:py-16 px-4 md:px-10">
          <div className="lg:flex gap-8  max-w-[500px] mx-auto md:mx-0  md:max-w-none relative">
            <div className="lg:w-[60%] mx-auto flex flex-col gap-12">
              <h2 className="font-bold">{"Rain"}</h2>
              <div className="rounded-[10px] h-[400px] relative w-full object-contain md:w-[80%] mx-auto">
                <Image
                  className="rounded-[10px] h-full w-full"
                  src={"/2.webp"}
                  //   loader={() => campaignDetails.image}
                  //   src={campaignDetails.image}
                  unoptimized
                  priority
                  fill
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-8 w-full md:w-[85%] md:mx-auto  lg:hidden">
                <div className="flex flex-col gap-4">
                  <p>
                    <span className="text-[2rem]">{30} STRK</span> raised of{" "}
                    {100 || 4000}STRK target
                  </p>
                  <div className="">
                    <div className="w-full h-[.25rem] mb-2 relative">
                      <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
                      <div
                        style={{
                          width: "30%",
                          // width: `${
                          //   (balance / parseInt(campaignDetails.target)) * 100
                          // }%`,
                        }}
                        className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
                      ></div>
                    </div>
                    <p>
                      2 donations
                      {/* {donationCount || 0} donation
                    {donationCount === 1 ? "" : "s"} */}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-white md:flex-row   ">
                  <button className="w-full md:w-1/2 bg-theme-green p-3 rounded-[5px] disabled:cursor-not-allowed flex justify-center items-center gap-2 ">
                    <span>withdraw</span>{" "}
                    <span className="text-theme-yellow">
                      <WithdrawIcon />
                    </span>
                  </button>
                  <button className="w-full md:w-1/2 bg-theme-green p-3 rounded-[5px]  flex justify-center items-center gap-2">
                    <span>Share</span>
                    <span className="text-theme-yellow">
                      <ShareIcon />
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-[85%] md:mx-auto lg:w-full">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
                  ipsam dignissimos aperiam, dolor laboriosam aspernatur
                  praesentium quaerat dolores. Minima officia voluptatibus
                  temporibus accusantium voluptates laborum sit expedita nobis,
                  fugiat error?
                </p>
                {/* <p>{campaignDetails.description}</p> */}
              </div>
              <div className="flex flex-col w-full md:w-[85%] md:mx-auto md:flex-row gap-4 lg:w-full">
                <button className=" w-full md:w-1/2 border-[1px] disabled:cursor-not-allowed border-solid border-theme-green p-3 rounded-[5px] font-bold">
                  Withdraw
                </button>
                <button className="w-full md:w-1/2 border-[1px] border-solid border-theme-green p-3 rounded-[5px] font-bold">
                  Share
                </button>
              </div>

              <div className="border-solid border-t-[1px] border-gray-100 py-6 flex gap-4 items-center">
                <span className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                  <CalenderIcon />
                </span>{" "}
                <p>Created 23 July 2024</p>
              </div>
            </div>
            <div className="hidden sticky top-8 bg-background p-8  rounded-[10px] w-[35%] h-fit lg:flex flex-col gap-8 shadow-small ">
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-[2rem]">{30} STRK</span> raised out of{" "}
                  {100 || 0} STRKs
                </p>
                <div className="">
                  <div className="w-full h-[.25rem] mb-2 relative">
                    <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
                    <div
                      style={{
                        width: `30%`,
                        //   width: `${
                        //     balance >= parseInt(campaignDetails.target)
                        //       ? "100"
                        //       : (balance / parseInt(campaignDetails.target)) * 100
                        //   }%`,
                      }}
                      className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
                    ></div>
                  </div>
                  <p>{2} donations</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-white  ">
                <button className="w-full bg-theme-green p-2 rounded-[5px] flex disabled:cursor-not-allowed justify-center items-center gap-2 ">
                  <span>Withdraw</span>{" "}
                  <span className="text-theme-yellow">
                    <WithdrawIcon />
                  </span>
                </button>
                <button className="w-full bg-theme-green p-2 rounded-[5px]  flex justify-center items-center gap-2">
                  <span>Share</span>
                  <span className="text-theme-yellow">
                    <ShareIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* ) : (
        <CampaignLoader />
      )} */}
    </>
  );
};

export default page;
