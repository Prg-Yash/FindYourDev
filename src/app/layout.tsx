import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import Provider from "./Provider";
import Header from "./header";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FindYourDev",
  description: "GAn app to find developers for your project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Provider>

       
        <NextTopLoader />
           <Header/>
           <div className="container mx-auto">

            {children}
           </div>
        </Provider>
           <Toaster />
          </body>
    </html>
  );
}
