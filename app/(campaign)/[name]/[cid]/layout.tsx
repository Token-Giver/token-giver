import type { Metadata } from "next";

export const generateMetadata = async ({
  params
}: {
  params: { name: string; address: string; cid: string };
}): Promise<Metadata> => {
  const campaignName = params.name;

  return {
    title: `${campaignName} Campaign - Support Now`,
    description: `Join the ${campaignName} campaign. Contribute to our cause and make a difference. Support now and be a part of positive change!`
  };
};

export default function CampaignLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
