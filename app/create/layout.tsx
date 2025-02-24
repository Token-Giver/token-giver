import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Campaign | Token Giver - Launch Your Cause",
  description:
    "Easily create and launch your own campaign on Token Giver. Join our community to raise funds and support your cause with our innovative token system."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
