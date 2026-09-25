"use client";

import { useEffect } from "react";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components
import Title from "./sections/Title";
import SpritePicture from "@/components/PokemonPage/dataTable/sections/SpritePicture";
import Types from "./sections/Types";
import Stats from "./sections/Stats";
import Abilities from "./sections/Abilities";
import Evolution from "./sections/Evolution";
import NavArrows from "./NavArrows";

// TypeScript types
import type {
  Pokemon,
  PokemonApiResource,
  EvolutionChain,
} from "@/types/types";

interface PokeDataProps {
  pokemonList: PokemonApiResource[];
  pokemonData: Pokemon;
  evolutionChain: EvolutionChain | null;
  typeNames: string[];
  regionName: string;
}

export default function PokeData({
  pokemonList,
  pokemonData,
  evolutionChain,
  typeNames,
  regionName,
}: PokeDataProps) {
  const router = useRouter();

  // Define the gradient colors based on the Pokémon types
  const strong = (name: string) =>
    `color-mix(in srgb, var(--type-${name}), black 15%)`;

  const gradient = typeNames[1]
    ? `linear-gradient(to bottom right, ${strong(typeNames[0])} 40%, ${strong(typeNames[1])} 60%)`
    : `linear-gradient(to bottom right, ${strong(typeNames[0])} 50%, white 100%)`;

  // Define the previous and next pages based on the current Pokédex entry position
  const currentPokemonIndex = pokemonList.findIndex(
    (poke) => poke.name === pokemonData.name,
  );
  const previous = pokemonList[currentPokemonIndex - 1]?.name || "";
  const next = pokemonList[currentPokemonIndex + 1]?.name || "";

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

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData: SwipeEventData) => {
      // Previous page
      if (eventData.dir === "Right" && previous) {
        router.push(`/${regionName}/${previous}`);
      }

      // Next page
      if (eventData.dir === "Left" && next) {
        router.push(`/${regionName}/${next}`);
      }
    },
  });

  return (
    <div
      style={{ backgroundImage: gradient }}
      className={`
        p-1
        relative
      `}
      {...swipeHandler}
    >
      {/* Corner icons */}
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute -top-2 -left-2"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute -top-2 -right-2"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute -bottom-2 -left-2"
      />
      <Image
        src={"/pokeball_icon.png"}
        width={25}
        height={25}
        alt=""
        className="absolute -bottom-2 -right-2"
      />

      {/* Table title - Pokémon name and ID number */}
      <Title id={pokemonData.id} name={pokemonData.name} />

      {/* Sprite section */}
      <SpritePicture url={pokemonData.sprites.other.home.front_default} />

      {/* Navigation arrows */}
      <NavArrows previous={previous} next={next} regionName={regionName} />

      {/* Pokémon types section */}
      <Types types={pokemonData.types} />

      {/* Stats section */}
      <Stats stats={pokemonData.stats} />

      {/* Abilities section */}
      <Abilities abilities={pokemonData.abilities} />

      {/* Evolution section */}
      <Evolution
        evolutionChain={evolutionChain}
        currentName={pokemonData.name}
      />
    </div>
  );
}
