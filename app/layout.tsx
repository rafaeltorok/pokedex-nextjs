import localFont from "next/font/local";
import "./globals.css";

import NavBar from "@/components/NavBar";

const pokeFont = localFont({
  src: "./fonts/pokemon.ttf",
});

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
