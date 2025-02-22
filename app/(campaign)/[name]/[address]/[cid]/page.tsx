"use client";
import CampaignLoader from "@/app/components/loading/CampaignLoader";
import {fetchCampaign} from "@/app/utils/helper";
import CalenderIcon from "@/svgs/CalenderIcon";
import DonateIcon from "@/svgs/DonateIcon";
import ProfileIcon from "@/svgs/ProfileIcon";
import ShareIcon from "@/svgs/ShareIcon";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Container from "@/app/components/util/Container";
import {H1, H2, H3} from "@/app/components/util/Headers";
import {campaign_contract} from "@/app/utils/data";
import protect from "@/public/protected.svg";
import RightArrowIcon from "@/svgs/RightArrowIcon";
import {Avatars, Avatar} from "@/svgs/Avatar";
import WallofLove from "@/app/(campaign)/Components/WallofLove";
import OrganizerandBeneficiary from "@/app/(campaign)/Components/OrganizerandBeneficiary";
import MoreInfo from "@/app/(campaign)/Components/MoreInfo";

const page = ({params}: {params: {name: string; address: string; cid: string}}) => {
   const router = useRouter();
   const [balance, setBalance] = useState(0);
   const [donationCount, setDonationCount] = useState(0);

   const donateNow = () => {
      if (params.address && params.cid) {
         const campaignAddress = params.address;
         const campaignName = params.name;
         const cid = params.cid;
         router.push(`/${campaignName}/${campaignAddress}/${cid}/donate`);
      }
   };

   const [campaignDetails, setCampaignDetails] = useState({
      name: "",
      image: "/default-image.webp",
      description: "",
      date: "",
      organizer: "",
      beneficiary: "",
      location: "",
      target: "",
      address: "",
   });
   useEffect(() => {
      if (params.address && params.cid) {
         fetchCampaign(params.cid, setBalance, setDonationCount, setCampaignDetails, null);
      }
   }, [params]);
   const width = `${Math.min((balance / parseInt(campaignDetails.target)) * 100, 100)}%`;

   return (
      <>
         {campaignDetails.name ? (
            <section className=" mt-[4rem] bg-white">
               <Container className="mx-auto py-10 md:py-16 px-4 md:px-10 ">
                  <section className="min-h-[95px]">
                     <H2 style="font-[700] text-[42px] md:text-[50px] text-[#282828]">{campaignDetails.name}</H2>
                  </section>
                  <section className="flex flex-col justify-start md:justify-between md:flex-row gap-1 md:gap-8 ">
                     <div className=" flex items-center gap-2 w-[208px]">
                        <div className="w-[55px] h-[55px] rounded-full border"></div>
                        <span className="text-[12.29px] md:text-[18px] font-[600]">Alhandro Pedro</span>
                     </div>
                     <div className="mt-6 md:mt-2 flex-grow flex flex-row gap-[20px] items-center justify-between ">
                        <div className="text-[#8E9BAE] font-[500] text-[9.51px] md:text-[18px] flex flex-row items-center justify-start gap-2">
                           Category:
                           <span className="h-[26.43px] w-[67.23px] md:w-[127px] md:h-[50px] rounded-[100px] bg-[#F7F7F6] text-black flex items-center justify-center">
                              Education
                           </span>
                        </div>
                        <div className="text-[10px] md:text-[18px] font-[500] text-[#55534e] flex justify-center items-center gap-2">
                           {" "}
                           <span className="text-black">
                              <ShareIcon />
                           </span>
                           share Campaign
                        </div>
                     </div>
                  </section>
                  <section className="md:rounded-[10px] h-[399px] md:h-[503px] relative w-full object-cover mx-auto mt-[25px]">
                     <Image
                        className="md:rounded-[10px] h-full w-full object-cover"
                        loader={() => campaignDetails.image}
                        src={campaignDetails.image}
                        unoptimized
                        priority
                        fill
                        alt=""
                     />
                  </section>
                  <section className="mt-[25px] flex flex-col-reverse xl:flex-row gap-4 items-start justify-center">
                     <div className="flex-grow">
                        <H1 style="text-[30px] md:text-[40px] font-[400]">
                           <span className=" text-[#282828] font-[700]">Campaign</span> Highlights
                        </H1>

                        <div className="w-full md:w-[85%] lg:w-[90%]">
                           <p className="text-[#8E9BAE] text-[16px] font-[500] mt-4 text-left leading-[32px]">{campaignDetails.description}</p>
                        </div>
                        <div className="flex flex-row items-center justify-center md:justify-normal gap-6 mt-6 mx-auto px-4 md:px-0">
                           <button className="text-[#00594c] border-[1px] border-solid w-[50%] md:w-[325px] h-[60px] rounded-[44.98px]">Donate Now</button>
                           <button className="text-[#00594c] border-[1px] border-solid w-[50%] md:w-[325px] h-[60px] rounded-[44.98px]">share</button>
                        </div>
                        <div className="flex md:hidden my-4">
                           <MoreInfo />
                        </div>
                        <OrganizerandBeneficiary />
                        <div className=" py-6 flex gap-4 items-center">
                           <span className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                              <CalenderIcon />{" "}
                           </span>
                           <p>{campaignDetails.date}</p>{" "}
                        </div>
                        <div className="flex flex-col gap-2 mt-10 w-full md:w-[70%] lg:w-[80%] border">
                           <h2 className="font-[700] text-[24px] text-[#55534e] h-[60px]">More Images</h2>
                           <div className="grid-cols-1 sm:grid-cols-2 grid gap-4 w-[100%] border">
                              <div className="border h-[232px] md:h-[342px] rounded-[5px]"></div>
                              <div className="gap-4 grid-cols-2 sm:grid-cols-1 sm:space-y-4">
                                 <div className="border h-[162px] rounded-[5px]"></div>
                                 <div className="border h-[162px] rounded-[5px]"></div>
                              </div>
                           </div>
                        </div>
                        <div className="mt-12">{/* <WallofLove /> */}</div>
                     </div>

                     {/*  */}
                     <div className="w-full px-4 md:px-0 md:w-[505px] md:min-h-[693px] bg-white flex flex-col gap-4 justify-between ">
                        <div className="flex flex-col gap-8 w-full md:w-[85%] md:mx-auto rounded-[5px] md:min-h-[593px] ">
                           <div className="flex flex-col gap-4">
                              <h5 className="text-[#00594c] text-[16px] font-[500] mt-8 flex flex-row gap-2">
                                 <Image src={protect} alt="protected" />
                                 Verified & Protected Campaign
                              </h5>
                              <>
                                 <span className="text-[2rem] mt-4"> {balance.toFixed(2)} STRK </span>
                                 <p className=" text-[#8e9bae] text-[16px] font-[500]">
                                    Raised till now (<span className="text-[#00594c] font-[700] text-[16px] uppercase"> Target: {campaignDetails.target || 0} STRK </span>)
                                 </p>
                              </>
                              <div>
                                 {" "}
                                 <div className="w-full h-[.25rem] mb-2 relative">
                                    {" "}
                                    <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>{" "}
                                    <div
                                       style={{
                                          width: width,
                                       }}
                                       className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
                                    ></div>
                                 </div>
                              </div>
                              <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-normal">
                                 <div className="mt-2">
                                    {" "}
                                    <h2 className="text-black font-[500] text-[20px] md:text-[30px]">{campaignDetails.target || 0} STRK </h2>
                                    <p className=" text-[#8e9bae] text-[16px] font-[500] mt-2">Donation Goal</p>
                                 </div>
                                 <div className="mt-2">
                                    {" "}
                                    <h2 className="text-black font-[500] text-[20px] md:text-[30px]">{campaignDetails.location} </h2>
                                    <p className=" text-[#8e9bae] text-[16px] font-[500] mt-2">Campaign Location</p>
                                 </div>
                              </div>
                              <div className="flex flex-row items-center justify-start gap-2 my-2">
                                 <Avatars />
                                 <h5 className="text-[#00594c] text-[16px] font-[500]">0 people just donated</h5>
                              </div>
                              <div className="hidden md:flex">
                                 {" "}
                                 <MoreInfo />
                              </div>
                           </div>
                        </div>
                        <button className="h-[60px] w-full md:w-[435px] rounded-[44.98px] bg-[#00594c] text-white font-[600] text-[16px] m-auto">Donate Now</button>
                     </div>
                  </section>
               </Container>
            </section>
         ) : (
            <CampaignLoader />
         )}
      </>
   );
};

export default page;

// <Container className="mx-auto py-10 md:py-16 px-4 md:px-10">
// <div className="lg:flex gap-8  max-w-[500px] mx-auto md:mx-0  md:max-w-none relative">
//   <div className="lg:w-[60%] mx-auto flex flex-col gap-12">
//     <H2 style="font-bold">{campaignDetails.name}</H2>
//     <div className="rounded-[10px] h-[400px] relative w-full object-contain md:w-[80%] mx-auto">
//       <Image
//         className="rounded-[10px] h-full w-full"
//         loader={() => campaignDetails.image}
//         src={campaignDetails.image}
//         unoptimized
//         priority
//         fill
//         alt=""
//       />
//     </div>
//     <div className="flex flex-col gap-8 w-full md:w-[85%] md:mx-auto  lg:hidden">
//       <div className="flex flex-col gap-4">
//         <p>
//           <span className="text-[2rem]">
//             {balance.toFixed(2)} STRK
//           </span>{" "}
//           raised of {campaignDetails.target || 0}STRK target
//         </p>
//         <div className="">
//           <div className="w-full h-[.25rem] mb-2 relative">
//             <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
//             <div
//               style={{
//                 width: width,
//               }}
//               className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
//             ></div>
//           </div>
//           <p>
//             {donationCount || 0} donation
//             {donationCount === 1 ? "" : "s"}
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-col gap-4 text-white md:flex-row   ">
//         <button
//           onClick={donateNow}
//           className="w-full md:w-1/2 bg-theme-green p-3 rounded-[5px] flex justify-center items-center gap-2 "
//         >
//           <span>Donate now</span>{" "}
//           <span className="text-theme-yellow">
//             <DonateIcon />
//           </span>
//         </button>
//         <button className="w-full md:w-1/2 bg-theme-green p-3 rounded-[5px]  flex justify-center items-center gap-2">
//           <span>Share</span>
//           <span className="text-theme-yellow">
//             <ShareIcon />
//           </span>
//         </button>
//       </div>
//     </div>

//     <div className="w-full md:w-[85%] md:mx-auto lg:w-full">
//       <p>{campaignDetails.description}</p>
//     </div>
//     <div className="flex flex-col w-full md:w-[85%] md:mx-auto md:flex-row gap-4 lg:w-full">
//       <button
//         onClick={donateNow}
//         className=" w-full md:w-1/2 border-[1px]  border-solid border-theme-green p-3 rounded-[5px] font-bold"
//       >
//         Donate
//       </button>
//       <button className="w-full md:w-1/2 border-[1px] border-solid border-theme-green p-3 rounded-[5px] font-bold">
//         Share
//       </button>
//     </div>

//     <div>
//       <h4>Organizer and beneficiary</h4>
//       <div className="flex flex-col items-center  w-fit md:items-start md:w-full md:flex-row gap-8 md:gap-12 py-8">
//         <div className="flex gap-4">
//           <div className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
//             <ProfileIcon />
//           </div>
//           <div className="flex flex-col gap-2">
//             <p className="font-bold">{campaignDetails.organizer}</p>
//             <p>Organizer</p>
//             <p>{campaignDetails.location}</p>
//           </div>
//         </div>
//         {campaignDetails.beneficiary && (
//           <>
//             <p className="text-[1.5em] font-extralight hidden md:block">
//               &rarr;
//             </p>
//             <div className="flex gap-4">
//               <div className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
//                 <ProfileIcon />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <p className="font-bold">
//                   {campaignDetails.beneficiary}
//                 </p>
//                 <p>Beneficiary</p>
//               </div>
//             </div>{" "}
//           </>
//         )}
//       </div>
//     </div>
//     <div className="border-solid border-t-[1px] border-gray-100 py-6 flex gap-4 items-center">
//       <span className="bg-gray-100 h-[50px] w-[50px] rounded-full flex items-center justify-center">
//         <CalenderIcon />
//       </span>{" "}
//       <p>{campaignDetails.date}</p>
//     </div>
//   </div>
//   <div className="hidden sticky top-8 bg-background p-8  rounded-[10px] w-[35%] h-fit lg:flex flex-col gap-8 shadow-small ">
//     <div className="flex flex-col gap-4">
//       <p>
//         <span className="text-[2rem]">
//           {balance.toFixed(2)} STRK
//         </span>{" "}
//         raised of {campaignDetails.target || "0"} STRK target
//       </p>
//       <div className="">
//         <div className="w-full h-[.25rem] mb-2 relative">
//           <div className="w-full h-[1vw] max-h-[.25rem] bg-[#127c5548] rounded-full mb-4"></div>
//           <div
//             style={{
//               width: width,
//             }}
//             className={`h-[1vw] max-h-[.25rem] bg-[#127C56] rounded-full mb-4 top-0 absolute`}
//           ></div>
//         </div>
//         <p>
//           {donationCount} donation{donationCount === 1 ? "" : "s"}
//         </p>
//       </div>
//     </div>
//     <div className="flex flex-col gap-4 text-white  ">
//       <button
//         onClick={donateNow}
//         className="w-full bg-theme-green p-2 rounded-[5px] flex  justify-center items-center gap-2 "
//       >
//         <span>Donate now</span>{" "}
//         <span className="text-theme-yellow">
//           <DonateIcon />
//         </span>
//       </button>
//       <button className="w-full bg-theme-green p-2 rounded-[5px]  flex justify-center items-center gap-2">
//         <span>Share</span>
//         <span className="text-theme-yellow">
//           <ShareIcon />
//         </span>
//       </button>
//     </div>
//   </div>
// </div>
// </Container>
