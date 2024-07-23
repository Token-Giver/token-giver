import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
