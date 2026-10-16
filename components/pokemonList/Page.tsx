// Services
import { getPokemons, getPokemon } from "@/lib/data";

// Components
import SearchBar from "@/components/SearchBar";
import ListContainer from "./ListContainer";

// TypeScript types
import type { PokemonApiResource } from "@/types/pokemon";

interface PageProps {
  query: string | undefined;
  requestedPage: number;
  baseUrl: string;
  regionName: string;
  itemsPerPage: number;
}

export default async function Page({
  query,
  requestedPage,
  baseUrl,
  regionName,
  itemsPerPage,
}: PageProps) {
  let pokemons: PokemonApiResource[] = await getPokemons(baseUrl);

  // Filter the list by Pokémon name
  if (query) {
    pokemons = pokemons.filter((p) => {
      return p.name.includes(query.toLowerCase());
    });
  }

  // Define the total amount of pages to be displayed
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  // Get the current page number
  const currentPage =
    Number.isInteger(requestedPage) &&
    requestedPage > 0 &&
    requestedPage <= totalPages
      ? requestedPage
      : 1;

  // Define the offset
  const offset = (currentPage - 1) * itemsPerPage;
  const endIndex = offset + itemsPerPage;

  // Divide the amount of data based on the pagination number
  const paginatedData = pokemons.slice(offset, endIndex);

  // Map each id to the page's respective items
  const paginatedDataWithIds = await Promise.all(
    paginatedData.map(async (d) => {
      const itemData = await getPokemon(d.url);

      return {
        ...d,
        id: itemData.id || 0,
      };
    }),
  );

  return (
    <div className="mx-auto text-center">
      <SearchBar />

      {paginatedDataWithIds.length > 0 ? (
        <ListContainer
          paginatedData={paginatedDataWithIds}
          regionName={regionName}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      ) : (
        <h2 className="my-5">No pokémons were found</h2>
      )}
    </div>
  );
}
