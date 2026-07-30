import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css"; // Global styles
import ClientLayout from "./client-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "NEXORA - Social Event Planner and Manager",
  description:
    "Design, customize, and share vibrant social events with templates, custom event covers, waitlists, and regional payment options.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body
        suppressHydrationWarning
        className="bg-slate-50 text-slate-900 antialiased font-sans"
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
