import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/SmoothScroller";
import { CustomCursor } from "@/components/CustomCursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shata — India's #1 Event Booking Platform",
  description:
    "India's first online event booking service. Book photographers, caterers, decorators & planners for weddings, birthdays, corporate events and more.",
  keywords: [
    "event booking",
    "wedding planning",
    "photography",
    "catering",
    "event management",
    "India",
    "Shata",
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
      className={`${playfair.variable} ${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <SmoothScroller />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
