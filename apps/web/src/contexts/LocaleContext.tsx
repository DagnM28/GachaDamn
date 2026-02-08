"use client";

import { createContext, useContext } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { type Locale, locales } from "@/i18n/config";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const nextIntlLocale = useLocale() as Locale;
  const pathname = usePathname();

  // Parse locale from pathname as fallback
  const pathnameLocale = pathname.split("/")[1] as Locale;
  const locale = locales.includes(pathnameLocale)
    ? pathnameLocale
    : nextIntlLocale;

  const setLocale = (newLocale: Locale) => {
    if (!locales.includes(newLocale)) return;

    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");

    // Use window.location to force full page reload
    if (typeof window !== "undefined") {
      window.location.href = newPath;
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }
  return context;
}
