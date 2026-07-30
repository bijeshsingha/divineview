import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divine View | Guwahati",
  description: "Clean, affordable, and centrally located in the heart of Paltan Bazar—just steps from the Guwahati Railway Station.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Divine View Group of Hotels",
  "description": "Clean, affordable, and centrally located hotels in the heart of Paltan Bazar, Guwahati.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Paltan Bazar",
    "addressLocality": "Guwahati",
    "addressRegion": "Assam",
    "addressCountry": "IN"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.2",
    "reviewCount": "184"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
