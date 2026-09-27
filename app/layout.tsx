import type { Metadata } from "next";
import { VentureSignature } from "@/components/VentureSignature";
import { Geist, Geist_Mono } from "next/font/google";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";
import { MotionBoot } from "@/components/motion/MotionBoot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2" }],
  },

  manifest: "/site.webmanifest?v=2",

  title: "GenoTwin Health — Personal wellness twin dashboard",
  description:
    "Organize wearable, lifestyle, and lab-style wellness data into educational insights, habit ideas, and clinician discussion prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f5f8fc] font-sans text-slate-800">
        <MotionBoot />
        <DisclaimerBanner />
        <div className="motion-nav"><SiteNav /></div>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-teal-900/10 py-8 text-center text-xs text-slate-500">
          GenoTwin Health MVP — educational software only. Emergency? Call your
          local emergency number.
        </footer>
      
        <VentureSignature tone="dark" variant="health" />
      </body>
    </html>
  );
}
