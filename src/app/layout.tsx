import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AZURE Tower Jakarta | Ultra-Luxury Minimalist Residences",
  description:
    "Redefining minimalism in luxury living. Azure Tower Jakarta offers ultra-premium residences with Tadao Ando-inspired architecture in the heart of Jakarta.",
  keywords: [
    "Azure Tower Jakarta",
    "luxury apartment Jakarta",
    "minimalist residence",
    "premium penthouse Jakarta",
    "ultra luxury living",
  ],
  openGraph: {
    title: "AZURE Tower Jakarta",
    description: "Redefining minimalism in luxury living.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
