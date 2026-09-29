import type { Metadata } from "next";
import "./globals.css";
import { APP } from "@/config/app.config";

export const metadata: Metadata = {
  title: `${APP.name} (${APP.edition}) · ${APP.event}`,
  description: `${APP.tagline} ${APP.subTagline}`,
  icons: {
    icon: "/assests/GDG_Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Noto+Sans+Devanagari:wght@600;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-[#EDB13E] selection:text-[#141414]">
        {children}
      </body>
    </html>
  );
}
