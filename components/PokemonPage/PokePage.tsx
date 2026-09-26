// Next.js
import { notFound } from "next/navigation";
import Link from "next/link";

// Services
import {
  getPokemons,
  getPokemon,
  getSpecies,
  getEvolutionChain,
  getAbilityDescription,
} from "@/lib/data";

// Components
import PokeData from "./dataTable/PokeData";

// TypeScript types
import type { Pokemon, AbilityData } from "@/types/types";

interface PokemonPageProps {
  pokeName: string;
  baseUrl: string;
  regionName: string;
}

export default async function PokePage({
  pokeName,
  baseUrl,
  regionName,
}: PokemonPageProps) {
  const pokemonList = await getPokemons(baseUrl);
  const pokemon = pokemonList.find((p) => p.name === pokeName);

  if (!pokemon) {
    return notFound();
  }

  // Get the Pokémon data from the API
  const pokemonData = await getPokemon(pokemon.url);

  // Get the species information
  const pokemonSpecies = await getSpecies(pokemonData.name);

  // Get the evolution chain for the current Pokémon
  const evolutionChain = await getEvolutionChain(
    pokemonSpecies?.evolution_chain.url,
  );

  // Handle the Pokémon abilities
  const normalAbility = await getAbilityData(pokemonData, "normal");
  const hiddenAbility = await getAbilityData(pokemonData, "hidden");

  // Map the type names to define the table gradient colors
  const typeNames = pokemonData.types.map((t) => t.type.name);

  return (
    <div
      className={`
        flex flex-col
        mx-auto
        rounded-xl
        mt-10 mb-5
        justify-center
      `}
    >
      {/* Pokémon data table */}
      <PokeData
        pokemonList={pokemonList}
        pokemonData={pokemonData}
        evolutionChain={evolutionChain}
        typeNames={typeNames}
        normalAbility={normalAbility}
        hiddenAbility={hiddenAbility}
        regionName={regionName}
      />

      {/* Return button */}
      <div className="mx-auto my-5 text-xl">
        <Link
          href={`/${regionName}`}
          className="
            border-1 border-gray-700 rounded
            bg-gray-900
            p-2
            hover:bg-gray-700 active:bg-gray-600
          "
        >
          Return
        </Link>
      </div>
    </div>
  );
}

async function getAbilityData(pokemonData: Pokemon, type: string): Promise<AbilityData> {
  let ability;

  if (type === "normal") {
    ability = pokemonData.abilities.find((ability) => !ability.is_hidden);
  } else if (type === "hidden") {
    ability = pokemonData.abilities.find((ability) => ability.is_hidden === true);
  }

  // Handle the abilities descriptions
  const description = await getAbilityDescription(ability?.ability.url || "");

  return {
    name: ability?.ability.name || "",
    description: description?.flavor_text_entries.find((entry) => {
      return entry.language.name === "en";
    })?.flavor_text || "",
  };
}
