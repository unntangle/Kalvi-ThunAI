import { Plus_Jakarta_Sans, Inter, Catamaran } from "next/font/google";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const tamil = Catamaran({
  subsets: ["latin", "tamil"],
  weight: ["500", "700"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata = {
  title: "Kalvi ThunAI — concept learning for classes 6 to 12",
  description:
    "A study app for Tamil Nadu government school students. Pick your class, group and subject, land on the exact concept, and watch the worked example play out.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${tamil.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
