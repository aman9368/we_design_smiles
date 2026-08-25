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
  title: "WE DESIGN SMILES | Center for Aesthetic & Implant Dentistry",
  description:
    "Experience luxury dental care, digital smile design, and guided dental implants with our interactive video clinic tour, before-and-after transformations, and online appointment booking.",
  keywords: [
    "We Design Smiles",
    "Dental Clinic",
    "Cosmetic Dentistry",
    "Dental Implants",
    "Porcelain Veneers",
    "Smile Makeover",
    "Teeth Whitening",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-sky-500 selection:text-white bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
