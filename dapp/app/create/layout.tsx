import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create campaign | Token Giver",
  description: "Create a token giver campaign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
