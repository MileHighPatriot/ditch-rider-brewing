import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders, Instrument_Serif } from "next/font/google";
import { ViewTransition } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileBar from "@/components/MobileBar";
import ShowBanner, { showBannerScript } from "@/components/ShowBanner";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-big-shoulders",
  weight: ["800"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#16120e",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Greenwood Village Brewpub`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: { icon: { url: asset("/icon.svg"), type: "image/svg+xml" } },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the show-night script below may add data-show to <html> before React loads.
    <html
      lang="en"
      className={`${bigShoulders.variable} ${archivo.variable} ${instrument.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-foam font-sans text-ink">
        <script dangerouslySetInnerHTML={{ __html: showBannerScript }} />
        <JsonLd />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ShowBanner />
        <Header />
        <ViewTransition>
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
