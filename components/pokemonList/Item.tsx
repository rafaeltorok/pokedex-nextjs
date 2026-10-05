"use client";

import Link from "next/link";
import Image from "next/image";

// Utils
import capitalize from "@/utils/capitalize";

// TypeScript types
import type { PokemonApiResource } from "@/types/pokemon";
import { useState } from "react";

interface ItemProps {
  pokemon: PokemonApiResource;
  regionName: string;
  id: number;
}

export default function Item({ pokemon, regionName, id }: ItemProps) {
  const [isIconLoading, setIsIconLoading] = useState(true);

  return (
    <>
      {/* Clickable Pokédex list item */}
      <Link
        href={`/${regionName}/${pokemon.name}`}
        className="
          flex flex-col
          border-1 border-gray-500 rounded-xl
          bg-gray-900/75
          font-bold
          hover:bg-gray-700/75 active:bg-gray-600/75
          h-[150px] w-[150px]
        "
      >
        {/* Wrapper for the thumbnail picture */}
        <div className="h-5/7 relative w-full">
          {isIconLoading && (
            // Display a placeholder skeleton while the icon is loading
            <div
              className="
                absolute
                animate-pulse
                w-full h-full
                rounded-t-xl
                bg-gray-500 dark:bg-gray-800
              "
            />
          )}

          {/* Pokémon sprite thumbnail */}
          <Image
            src={
              id ?
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : 
                "/pokeball_icon.png"
            }
            alt="Pokémon sprite thumbnail"
            width={100}
            height={100}
            onLoad={() => setIsIconLoading(false)}
            className="mx-auto"
          />
        </div>

        {/* Pokémon name */}
        <li
          className="
            h-2/7 w-full
            bg-black/35
            text-xl overflow-hidden
            rounded-b-xl
            [-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)]
          "
        >
          {capitalize(pokemon.name)}
        </li>
      </Link>
    </>
  );
}
