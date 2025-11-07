import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
export const metadata: Metadata = {
  title: "AXTO | Accessories That Move You",
  description:
    "Premium accessories for your EV scooters. Desired for style, safety, and everyday utility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
