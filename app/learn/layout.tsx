import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn About Token Giver",
  description:
    "Discover how Token Giver works. Learn how token-bound accounts and NFTs enhance your campaigns. Get started with our comprehensive guide.",
};

export default function LearnRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main>{children}</main>;
}
