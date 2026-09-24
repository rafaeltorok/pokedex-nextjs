// Next.js
import { notFound } from "next/navigation";
import Link from "next/link";

// Services
import { getPokemons, getPokemon } from "@/services/pokemons";

// Components
import PokeData from "./PokeData";

interface PokemonPageProps {
  pokeName: string;
  baseUrl: string;
  regionName: string;
}

export default async function PokePage({ pokeName, baseUrl, regionName }: PokemonPageProps) {
  const pokemonList = await getPokemons(baseUrl);
  const pokemon = pokemonList.find((p) => p.name === pokeName);

  if (!pokemon) {
    return notFound();
  }

  // Get the Pokémon data from the API
  const pokemonData = await getPokemon(pokemon.url);

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
        typeNames={typeNames}
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
