import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import Provider from "./Provider";
import Header from "./header";
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
            {children}
        </Provider>
        
          </body>
    </html>
  );
}
