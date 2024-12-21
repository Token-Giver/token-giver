import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import StarknetProvider from "./components/StarknetProvider";
import Header from "./components/Header";

export const metadata: Metadata = {
	title: "Token Giver",
	description:
		"Token Giver: Revolutionizing Fundraising with NFT and Token-Bound Accounts. Empower your campaigns with secure, innovative blockchain technology. Join us to transform donations into digital assets.",
	icons: {
		icon: "/icon_Full_Color.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-sm lg:text-md">
        <StarknetProvider>
          <Header />
          {children}
          <Footer />
        </StarknetProvider>
      </body>
    </html>
  );
}
