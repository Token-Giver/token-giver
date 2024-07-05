import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: " | Token Giver",
  description: "This page shows all the available campaigns on token giver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <>
        <div className="fixed top-0 left-0  w-screen h-[10vh]  -z-50 bg-header-gradient"></div>
        <header
          id="header-container"
          className="absolute top-0 left-0  w-full flex items-center justify-between h-[3.5rem] z-50 py-8 px-8 md:px-16"
        >
          <Link href="/" className="font-bold text-[1.2em] text-[#127C56]">
            token giver.
          </Link>
        </header>
      </>

      {children}
    </main>
  );
}
