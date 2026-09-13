import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://likhith-portfolio-sage.vercel.app";

export const viewport: Viewport = {
  themeColor: "#06070B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jadagam Likhith — Full Stack Developer × Product UI/UX Designer",
    template: "%s | Jadagam Likhith",
  },
  description:
    "Personal portfolio of Jadagam Likhith: Computer Science Engineer & Product Designer building resilient backend systems and refined Material Design 3 interfaces.",
  keywords: [
    "Jadagam Likhith",
    "Full Stack Developer",
    "Product UI/UX Designer",
    "Kotlin",
    "Jetpack Compose",
    "React.js",
    "Node.js",
    "Flask",
    "MySQL",
    "Material Design 3",
  ],
  authors: [{ name: "Jadagam Likhith" }],
  creator: "Jadagam Likhith",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Jadagam Likhith — Full Stack Developer × Product UI/UX Designer",
    description:
      "Bridging backend engineering logic and human-centered product craft.",
    siteName: "Jadagam Likhith Portfolio",
    images: [
      {
        url: "/images/logo.png",
        width: 300,
        height: 80,
        alt: "Jadagam Likhith — Full Stack Developer × Product UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jadagam Likhith — Full Stack Developer × Product UI/UX Designer",
    description:
      "Bridging backend engineering logic and human-centered product craft.",
    creator: "@ZenMaestro",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-canvas text-content-primary antialiased selection:bg-brand-indigo/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
