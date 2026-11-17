import "./globals.css";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// TypeScript types
import type { Metadata } from "next";

// Custom font
import localFont from "next/font/local";

const pokeFont = localFont({
  src: "./fonts/pokemon.ttf",
});

export const metadata: Metadata = {
  title: "Pokédex Next",
  description: "Your favorite place for Pokémon info",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pokeFont.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NavBar />

        {/* Wraps the main content, to always occupy 100% of the screen height */}
        <main className="flex-1 mx-auto">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
