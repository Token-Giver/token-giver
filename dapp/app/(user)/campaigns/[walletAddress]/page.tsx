"use client";
import ConnectButton from "@/app/components/ConnectButton";
import Card from "@/app/components/Fundraiser/Card";
import CardLoader from "@/app/components/loading/CardLoader";
import Container from "@/app/components/util/Container";
import { useAccount } from "@starknet-react/core";

const page = () => {
  const { address } = useAccount();
  return (
    <section className="min-h-[100svh] py-[5rem] px-4 lg:px-[10vw]">
      <Container className="flex flex-col gap-8">
        <ConnectButton />
        {!address ? (
          <h2>Connect to see your campaigns</h2>
        ) : (
          <h2>Your current campaigns</h2>
        )}

        {!address ? (
          <div className="grid gap-4 lg:grid-cols-3">
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        ) : (
          <div className="grid gap-4  md:gap-8 lg:grid-cols-3 md:max-w-[800px] lg:max-w-none md:mx-auto  md:justify-center ">
            <Card
              cid={"QmVMdQGZEic4ByfJEXkD44t8XFokiDFT2FtGrt3pZtqsiH"}
              causeName={"Stephanie need a house in Maitama" || "Unknown Cause"}
              imageSrc={
                `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}QmTHJNYBspAccj5BmGUbA34eoWTLsxHTgvauFbKsggS5Tb?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_API_KEY}` ||
                "/default-image.webp"
              }
              location={"Manchester, United Kingdom"}
              progress={0}
              token_id={"4"}
              campaign_address={
                "0x365c1ce0c51f98fc57cbdd225328ef3feb269b2c55a15da10bf4aa4c2fb75aa" ||
                "0x0"
              }
              target={"1"}
              url={`/campaign/${address}/1`}
            />
            {/* <Card
              cid={"QmVMdQGZEic4ByfJEXkD44t8XFokiDFT2FtGrt3pZtqsiH"}
              causeName={"Stephanie need a house in Maitama" || "Unknown Cause"}
              imageSrc={
                `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}QmTHJNYBspAccj5BmGUbA34eoWTLsxHTgvauFbKsggS5Tb?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_API_KEY}` ||
                "/default-image.webp"
              }
              location={"Manchester, United Kingdom"}
              progress={0}
              token_id={"4"}
              campaign_address={
                "0x365c1ce0c51f98fc57cbdd225328ef3feb269b2c55a15da10bf4aa4c2fb75aa" ||
                "0x0"
              }
              target={"1"}
            /> */}
          </div>
        )}
      </Container>
    </section>
  );
};

export default page;
