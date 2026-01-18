import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Setup Inter (Sans)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

// Setup Roboto Mono (Mono) for code/audit hashes
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AuditShield | Tamper-Evident AI Compliance",
  description: "The enterprise standard for AI usage auditing and compliance reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${robotoMono.variable} antialiased font-sans`}
        >
          {children}
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
