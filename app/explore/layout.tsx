import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Campaigns | Token Giver - Discover & Support Causes",
  description:
    "Browse and support a variety of impactful campaigns on Token Giver. Find causes that matter to you and make a difference by contributing today."
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
