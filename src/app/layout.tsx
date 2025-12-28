import Navigation from "@/components/navigation";
import ProvidersWrapper from "@/components/wrapper/layout-wrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyAuto Prototype",
  description: "MyAuto Prototype, Explore, Buy and sell Cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <ProvidersWrapper>
          <Navigation />
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
