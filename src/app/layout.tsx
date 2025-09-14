import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import ThemeToggle from "@/components/ThemeToggle";
import PWAInstaller from "@/components/PWAInstaller";

const base = Inter({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Daily Sparks of Joy",
  description: "Get daily motivational messages with Bible verses, spiritual insights, and prayers. Find encouragement and inspiration through faith-based content tailored for your spiritual journey.",
  keywords: "bible verses, daily motivation, christian encouragement, spiritual inspiration, prayer, faith, biblical wisdom, devotional, christian app",
  authors: [{ name: "Daily Sparks of Joy" }],
  creator: "Daily Sparks of Joy",
  publisher: "Daily Sparks of Joy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dailysparks.darl.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Daily Sparks of Joy",
    description: "Get daily motivational messages with Bible verses, spiritual insights, and prayers. Find encouragement and inspiration through faith-based content.",
    url: 'https://dailysparks.darl.dev',
    siteName: 'Daily Sparks of Joy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Daily Sparks of Joy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Daily Sparks of Joy",
    description: "Get daily motivational messages with Bible verses, spiritual insights, and prayers.",
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Daily Sparks" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body suppressHydrationWarning
        className={`${base?.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          >
            <PWAInstaller />
            <ThemeToggle />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
