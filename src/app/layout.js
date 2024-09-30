
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: "D ART",
  description: "Digital Artworks sharing flatform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <NextTopLoader
          color="red"
        />
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
