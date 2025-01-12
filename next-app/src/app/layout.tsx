import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: `Next.js Blog Example with ${CMS_NAME}`,
    description: `A statically generated blog example using Next.js and ${CMS_NAME}.`,
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
        <html lang="en">
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
            <body
                className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
            >
                <ThemeSwitcher />
                <div className="min-h-screen">{children}</div>
                <Footer />
            </body>
        </html>
    );
}
