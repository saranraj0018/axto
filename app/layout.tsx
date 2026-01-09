import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import ToastProvider from "../lib/providers/ToastProvider";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import Script from "next/script";

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
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
                rel="stylesheet"
            />
        </head>

        <body>
        <AuthProvider>
            <AuthModalProvider>
            <ToastProvider />
            <Header />
            {children}
            <Footer />
            </AuthModalProvider>
        </AuthProvider>

        {/* ✅ Cashfree SDK MUST be last */}
        <Script
            src="https://sdk.cashfree.com/js/v3/cashfree.js"
            strategy="afterInteractive"
        />
        </body>
        </html>
    );
}
