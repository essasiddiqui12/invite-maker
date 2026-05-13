import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "InviteMaker - Create Beautiful Invitations",
    template: "%s | InviteMaker",
  },
  description: "Create and share beautiful invitation cards for your special events. Free, easy, and no login required.",
  keywords: ["invitation maker", "create invitation", "free invitations", "online invitations", "wedding invitation", "birthday invitation", "event invitation"],
  authors: [{ name: "InviteMaker" }],
  creator: "InviteMaker",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: "InviteMaker",
    title: "InviteMaker - Create Beautiful Invitations",
    description: "Create and share beautiful invitation cards for your special events. Free, easy, and no login required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InviteMaker - Create Beautiful Invitations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InviteMaker - Create Beautiful Invitations",
    description: "Create and share beautiful invitation cards for your special events. Free, easy, and no login required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}