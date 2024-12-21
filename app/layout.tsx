import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer2";
import Features from "./components/Features";
import StarknetProvider from "./components/StarknetProvider";
import Header from "./components/Header2";
import { Rethink_Sans } from "next/font/google";
const rethink_sans = Rethink_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--rethink-font",
});

export const metadata: Metadata = {
  title: "Token Giver",
  description:
    "Token Giver: Revolutionizing Fundraising with NFT and Token-Bound Accounts. Empower your campaigns with secure, innovative blockchain technology. Join us to transform donations into digital assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rethink_sans.variable} font-rethink-sans bg-tkg-gray-400`}>
        <StarknetProvider>
          <Header />
          {children}
          {/* <Features /> */}
          <Footer />
        </StarknetProvider>
      </body>
    </html>
  );
}
