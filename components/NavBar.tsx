"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div>
      <nav
        className="
          flex gap-2
          font-bold
          bg-gray-700
          w-full
          justify-center
          p-2
          [text-shadow:1px_1px_0_#000]
          overflow-auto
        "
      >
        <section className="MOBILE-MENU flex lg:hidden w-full">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => (!prev))}
          >
            <span className="block h-0.5 w-8 bg-gray-500"></span>
            <span className="block h-0.5 w-8 bg-gray-500"></span>
            <span className="block h-0.5 w-8 bg-gray-500"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            <div
              className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-content min-h-[250px] space-y-10"
              onClick={() => setIsNavOpen(false)}
            >
              <Link href="/">Home</Link>
              <Link href="/kanto">Gen I (Kanto)</Link>
              <Link href="/johto">Gen II (Johto)</Link>
              <Link href="/hoenn">Gen III (Hoenn)</Link>
              <Link href="/sinnoh">Gen IV (Sinnoh)</Link>
            </div>
          </div>
        </section>

        <div className="DESKTOP-MENU hidden lg:flex items-center w-full">
          <div className="space-x-8">
            <Link href="/">Home</Link>
            <Link href="/kanto">Gen I (Kanto)</Link>
            <Link href="/johto">Gen II (Johto)</Link>
            <Link href="/hoenn">Gen III (Hoenn)</Link>
            <Link href="/sinnoh">Gen IV (Sinnoh)</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
