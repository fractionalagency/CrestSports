import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { CartProvider } from "@/contexts/CartContext";

const satoshi = localFont({
  src: "../fonts/satoshi/Satoshi-Bold.otf",
  variable: "--font-satoshi",
  weight: "700",
});
const satoshiMedium = localFont({
  src: "../fonts/satoshi/Satoshi-Bold.otf",
  variable: "--font-satoshi-medium",
  weight: "700",
});
const satoshiBold = localFont({
  src: "../fonts/satoshi/Satoshi-Black.otf",
  variable: "--font-satoshi-bold",
  weight: "900",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CrestSports - Premium Sports Gear",
  description: "Your destination for premium sports equipment and apparel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${satoshiMedium.variable} ${satoshiBold.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        <CartProvider>
          <HeaderWrapper />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
