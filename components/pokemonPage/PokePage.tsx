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
  getTypeRelations,
} from "@/lib/data";

// Components
import PokeData from "./dataTable/PokeData";

// TypeScript types
import type { Pokemon } from "@/types/pokemon";
import type { AbilityData, FlavorText } from "@/types/abilities";
import type { TypeDetails } from "@/types/pokeTypes";
import type { generationName } from "@/types/icons";

interface PokemonPageProps {
  pokeName: string;
  baseUrl: string;
  regionName: string;
  generationIcons: generationName;
}

export default async function PokePage({
  pokeName,
  baseUrl,
  regionName,
  generationIcons,
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

  // Map each type name to its respective relations
  const firstPokemonType = await getTypeRelations(
    pokemonData.types[0].type.url,
  );
  const secondPokemonType = pokemonData.types[1]
    ? await getTypeRelations(pokemonData.types[1].type.url)
    : null;

  // Filter out the nulls with a type predicate
  const pokemonTypes = [firstPokemonType, secondPokemonType].filter(
    (t): t is TypeDetails => t !== null,
  );

  return (
    <div
      className="
        flex flex-col
        rounded-xl
        mt-10 mb-5
        justify-center
      "
    >
      {/* Pokémon data table */}
      <PokeData
        pokemonList={pokemonList}
        pokemonData={pokemonData}
        evolutionChain={evolutionChain}
        pokemonTypes={pokemonTypes}
        normalAbility={normalAbility}
        hiddenAbility={hiddenAbility}
        regionName={regionName}
        generationIcons={generationIcons}
      />

      {/* Return button */}
      <Link
        href={`/${regionName}`}
        className="
          w-full p-2
          mx-auto my-5 text-xl text-center
          border-2 border-gray-700 rounded
          bg-gray-900
          hover:bg-gray-700 active:bg-gray-600
        "
      >
        Return
      </Link>
    </div>
  );
}

// Return an object with the ability name and description
async function getAbilityData(
  pokemonData: Pokemon,
  type: string,
): Promise<AbilityData> {
  let ability;

  if (type === "normal") {
    ability = pokemonData.abilities.find((ability) => !ability.is_hidden);
  } else if (type === "hidden") {
    ability = pokemonData.abilities.find(
      (ability) => ability.is_hidden === true,
    );
  }

  // Handle the abilities descriptions
  const description = await getAbilityDescription(ability?.ability.url || "");

  return {
    name: ability?.ability.name || "",
    description:
      description?.flavor_text_entries.find((entry: FlavorText) => {
        return entry.language.name === "en";
      })?.flavor_text || "",
  };
}
