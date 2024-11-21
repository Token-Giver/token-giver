import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { name: string; address: string; cid: string };
}): Promise<Metadata> => {
  const campaignName = params.name;

  return {
    title: `Donate to ${campaignName} | Token Giver - Make a Difference Today`,
    description: `Support the ${campaignName} campaign and contribute to a worthy cause. Your donation can help create a positive impact. Join us now and be a part of meaningful change!`,
  };
};

export default function DonateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
