import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinLearn | Master Your Money",
  description: "Accelerate your financial literacy journey with interactive quizzes, interactive flashcards, and gamified learning. Understand budgeting, investing, and saving today.",
  keywords: ["financial literacy", "budgeting", "investing", "saving", "financial education", "gamified learning"],
  authors: [{ name: "FinLearn Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background-app text-text-main selection:bg-primary/30 selection:text-white">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XYZ"} />
    </html>
  );
}
