import Link from "next/link";

// Services
import { getPokemons } from "@/services/pokemons";

// Utils
import capitalize from "@/utils/capitalize";

// Components
import SearchBar from "@/components/SearchBar";

export default async function PokemonList(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  let pokemons = await getPokemons();

  // Extract the query search term
  const searchParams = await props.searchParams;
  const query = searchParams?.query;

  // Filter the list by Pokémon name
  if (query) {
    pokemons = pokemons.filter((p) => {
      return p.name.includes(query.toLowerCase());
    });
  }

  return (
    <>
      <SearchBar />

      <ul className="w-[300px] mx-auto text-center">
        {pokemons.map((p) => (
          <li
            key={p.name}
            className="border-1 border-gray-500 rounded bg-gray-900 p-2 m-2 font-bold hover:bg-gray-700"
          >
            <Link href={`/pokemon/${p.name}`}>
              <span className="[-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)]">
                {capitalize(p.name)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
