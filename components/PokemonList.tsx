import Link from "next/link";

// Services
import { getPokemons } from "@/services/pokemons";

// Components
import SearchBar from "@/components/SearchBar";

// Utils
import capitalize from "@/utils/capitalize";

// TypeScript types
import type { PokemonApiResource } from "@/types/types";

interface PokemonListProps {
  query: string | undefined;
  baseUrl: string;
  regionName: string;
};

export default async function PokemonList({ query, baseUrl, regionName }: PokemonListProps) {
  let pokemons: PokemonApiResource[] = await getPokemons(baseUrl);

  // Filter the list by Pokémon name
  if (query) {
    pokemons = pokemons.filter((p) => {
      return p.name.includes(query.toLowerCase());
    });
  }

  return (
    <div className="mx-auto text-center">
      <SearchBar />

      <ul className="w-[300px] mx-auto text-center">
        {pokemons.map((p) => (
          <li
            key={p.name}
            className="border-1 border-gray-500 rounded bg-gray-900 p-2 m-2 font-bold hover:bg-gray-700"
          >
            <Link href={`/${regionName}/${p.name}`}>
              <span className="[-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)]">
                {capitalize(p.name)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
