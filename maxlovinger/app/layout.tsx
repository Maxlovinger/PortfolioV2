import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Max Lovinger — CS + Applied Math | Data Engineer",
  description: "Portfolio of Max Lovinger — CS + Applied Math at Haverford, MEng Data Science at Penn. Quant meets builder.",
  openGraph: {
    title: "Max Lovinger",
    description: "Data Engineer · Quant Researcher · Builder",
    url: "https://maxlovinger.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-[#242423] text-[#E8EDDF] antialiased">
        {children}
      </body>
    </html>
  );
}
