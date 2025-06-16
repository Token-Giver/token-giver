import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn About Token Giver",
  description:
    "Discover how Token Giver works. Learn how token-bound accounts and NFTs enhance your campaigns. Get started with our comprehensive guide."
};

export default function LearnRootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mx-auto mt-[5rem] flex max-w-[1100px] flex-col gap-10 px-4 py-8 md:px-8 xl:px-16">
      {children}
    </main>
  );
}
