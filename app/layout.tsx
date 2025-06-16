import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Provider from "@/providers/Provider";

export const metadata: Metadata = {
  title: "Token Giver",
  description:
    "Token Giver: Revolutionizing Fundraising with NFT and Token-Bound Accounts. Empower your campaigns with secure, innovative blockchain technology. Join us to transform donations into digital assets."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Provider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
