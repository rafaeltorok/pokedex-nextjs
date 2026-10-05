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
}

export default function Item({ pokemon, regionName }: ItemProps) {
  const [isIconLoading, setIsIconLoading] = useState(true);

  return (
    <Link
      href={`/${regionName}/${pokemon.name}`}
      className="
        flex
        border-1 border-gray-500 rounded
        bg-gray-900/75
        p-2 my-2
        font-bold
        hover:bg-gray-700/75 active:bg-gray-600/75
        items-center
        h-[50px]
      "
    >
      <div className="w-1/6 h-[40px] w-[40px] relative">
        {isIconLoading && (
          // Display a placeholder skeleton while the icon is loading
          <div
            className="
              absolute
              animate-pulse
              w-[40px] h-[40px]
              gray-600
              dark:bg-gray-800
              rounded-xl"
            />
        )}
        
        {/* Pokémon sprite icon */}
        <Image
          src={pokemon.icon || "/pokeball_icon.png"}
          alt="Pokémon showdown sprite"
          width={40}
          height={40}
          onLoad={() => setIsIconLoading(false)}
          className="absolute"
        />
      </div>

      {/* Clickable Pokémon list item */}
      <li className="w-5/6">
        <span className="[-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)] text-xl">
          {capitalize(pokemon.name)}
        </span>
      </li>
    </Link>
  );
}
