import "./globals.css";

// Components
import NavBar from "@/components/NavBar";

// TypeScript types
import type { Metadata } from "next";

// Custom font
import localFont from "next/font/local";

const pokeFont = localFont({
  src: "./fonts/pokemon.ttf",
});

export const metadata: Metadata = {
  title: "Pokédex App",
  description: "A Pokédex-style app built with Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pokeFont.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
