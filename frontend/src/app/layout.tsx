import type { Metadata } from "next";
import { Unbounded, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme";
import { SettingsFab } from "@/components/settings-fab";
import { LanguageProvider } from "@/components/language";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "EmberAI — Unified API for Every Frontier Model",
  description:
    "One OpenAI-compatible endpoint. Access The Model 5, GPT 5.6 Sol, GLM 5.3 and every frontier model with a single token.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${unbounded.variable} ${instrument.variable} ${spaceMono.variable} h-full`}>
      <ThemeProvider>
        <LanguageProvider>
          <body className="noise min-h-full flex flex-col font-sans antialiased">
            {children}
            <SettingsFab />
          </body>
        </LanguageProvider>
      </ThemeProvider>
    </html>
  );
}
