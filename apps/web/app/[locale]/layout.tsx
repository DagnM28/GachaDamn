import type { Metadata } from "next";
import localFont from "next/font/local";
import { Exo_2 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "../globals.css";
import { BackgroundAnimation } from "@/components/bgAnimation";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo-2",
});

export const metadata: Metadata = {
  title: "GachaDamn Wiki - Gacha Game",
  description: "Comprehensive wiki for Gacha Game",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${exo2.variable}`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LocaleProvider>
            <ThemeProvider>
              <Header />
              <BackgroundAnimation />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
