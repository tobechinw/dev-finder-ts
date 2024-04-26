import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "./header";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Dev Finder",
  description: "Pair Programming Platform for Devs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NextTopLoader showSpinner={false} />
          <Header />
          {/* <div className="container mx-auto">{children}</div> */}
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
