import { SITE_TITLE, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";

import "./globals.css";
import { Layout } from "@/components/Layout";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: `Homepage and blog by InDieTasten.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png?v=2" />
        <link rel="manifest" href="/icons/site.webmanifest?v=2" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg?v=2" color="#00ff00" />
        <link rel="shortcut icon" href="/icons/favicon.ico?v=2" />
        <meta name="msapplication-TileColor" content="#535353" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml?v=2" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="flex h-full bg-zinc-900 md:bg-black">
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
