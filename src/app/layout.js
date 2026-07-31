import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChipBackground from "./components/ChipBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChipVerse",
  description: "The playground for future silicon minds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ChipBackground />

        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}