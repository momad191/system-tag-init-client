import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: {
    template: "Faizbot.ai Dashboard Kit",
    default: "Faizbot.ai Dashboard Kit",
  },
  description:
    "Faizbot.ai admin dashboard  .",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  // const token = Cookies.get("token");
  // const userId = Cookies.get("userId");

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
