import type { Metadata } from "next";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bharadwaj B R | Portfolio",
  description: "The professional portfolio of Bharadwaj B R.",
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
