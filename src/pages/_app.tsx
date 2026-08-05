import type { AppProps } from "next/app";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-family",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-family",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sans.variable} ${display.variable} ${mono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
