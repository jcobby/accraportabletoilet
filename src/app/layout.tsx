import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { Toaster } from "@/components/ui/sonner";
import { localBusinessSchema, organisationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Portable Toilet Rental, Sale & Manufacture in Ghana`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "portable toilet rental Accra",
    "mobile toilet Ghana",
    "restroom trailer rental Ghana",
    "toilet rental for wedding Accra",
    "portable toilets for sale Ghana",
    "event toilet hire Accra",
    "VIP mobile toilet Ghana",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Portable Toilet Rental, Sale & Manufacture`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Portable Toilet Rental in Ghana`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Sanitation services",
};

export const viewport: Viewport = {
  themeColor: "#1a6fd0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GH"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <JsonLd data={[organisationSchema(), localBusinessSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* Bottom padding clears the fixed mobile action bar. */}
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFab />
        <MobileActionBar />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
