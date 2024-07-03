import type { Metadata } from "next";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Campaigns | Token Giver",
  description: "This page shows all the available campaigns on token giver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
