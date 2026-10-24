import type { Metadata } from "next";
import { siteUrl } from "@/utils/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";



export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "Property World | Real Estate in Noida & Ghaziabad", template: "%s | Property World" },
  description: "Buy, sell or rent flats, shops, commercial spaces and plots in Noida, Noida Extension, Gaur City and Ghaziabad with Dinesh Pal's 20+ years of experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <Navbar />
          <main id="main-content" style={{ paddingTop: '64px', minHeight: 'calc(100vh - 300px)' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
