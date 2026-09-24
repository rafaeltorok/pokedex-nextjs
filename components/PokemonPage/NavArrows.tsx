"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// TypeScript types
import type { PokemonApiResource } from "@/types/types";

interface NavArrowsProps {
  pokemonList: PokemonApiResource[];
  pokemonName: string;
  regionName: string;
}

export default function NavArrows({ pokemonList, pokemonName, regionName }: NavArrowsProps) {
  const router = useRouter();

  // Define the previous and next pages based on the current Pokédex entry position
  const currentPokemonIndex = pokemonList.findIndex(poke => poke.name === pokemonName);
  const previous = pokemonList[currentPokemonIndex - 1]?.name || null;
  const next = pokemonList[currentPokemonIndex + 1]?.name || null;

  // Handles keyboard navigation
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Left arrow key
      if (event.key === "ArrowLeft" && previous) {
        router.push(`/${regionName}/${previous}`);
      }

      // Right arrow key
      if (event.key === "ArrowRight" && next) {
        router.push(`/${regionName}/${next}`);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previous, next, router, regionName]);

  return (
    <div>
      {/* Previous arrow */}
      {previous && (
        <div
          className="
            absolute
            -left-10
            text-4xl
            p-1
            border-1 border-gray-500 rounded
            bg-gray-900
            hover:bg-gray-700 active:bg-gray-600
          "
        >
          <Link href={`/${regionName}/${previous}`}>◀</Link>
        </div>
      )}

      {/* Next arrow */}
      {next && (
        <div
          className="
            absolute
            -right-10
            text-4xl
            p-1
            border-1 border-gray-500 rounded
            bg-gray-900
            hover:bg-gray-700 active:bg-gray-600
          "
        >
          <Link href={`/${regionName}/${next}`}>▶</Link>
        </div>
      )}
    </div>
  );
}
