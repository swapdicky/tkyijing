import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "TK Yijing",
  description: "TK Yijing Exhibition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Navigation /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
