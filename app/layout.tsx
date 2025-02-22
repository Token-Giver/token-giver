import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Features from "./components/Features";
import StarknetProvider from "./components/StarknetProvider";
import Header from "./components/Header";

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
      <body>
        <StarknetProvider>
          <Header />
          {children}
          <Footer />
        </StarknetProvider>
      </body>
    </html>
  );
}
