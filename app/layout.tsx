import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research Workstation | Maria",
  description:
    "A private market research workstation with Maria as the executive research assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
