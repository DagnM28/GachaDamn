import type { Metadata } from "next";
import localFont from "next/font/local";
import { Exo_2 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { CustomScrollbar } from "@/components/CustomScrollbar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "../globals.css";

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
  title: "GachaDamn Wiki - Genshin Impact & Honkai: Star Rail",
  description: "Comprehensive wiki for Genshin Impact and Honkai: Star Rail",
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
              <BackgroundAnimation />
              <CustomScrollbar />
              <Header />
              <main style={{ padding: 0, margin: 0 }}>{children}</main>
              <Footer />
            </ThemeProvider>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
