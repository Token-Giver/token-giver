import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Campaigns | Token Giver",
  description: "Browse and discover meaningful campaigns on Token Giver. Find causes you care about and support them through our innovative token-based donation system."
};

export default function SearchRootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
