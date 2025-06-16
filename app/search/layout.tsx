import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Campaign on token giver | Token Giver",
  description:
    "Easily create and launch your own campaign on Token Giver. Join our community to raise funds and support your cause with our innovative token system."
};

export default function SearchRootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="mx-auto max-w-[1536px]">{children}</main>;
}
