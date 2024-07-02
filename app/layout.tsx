import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Features from "./components/Features";
import StarknetProvider from "./components/StarknetProvider";

export const metadata: Metadata = {
  title: "Demo",
  description: "Demo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <StarknetProvider>
          {children}
          <Features />
          <Footer />
        </StarknetProvider>
      </body>
    </html>
  );
}
