// Services
import { getPokemons } from "@/services/pokemons";

// Components
import SearchBar from "@/components/SearchBar";
import Pagination from "../Pagination/Pagination";
import Item from "./Item";

// TypeScript types
import type { PokemonApiResource } from "@/types/types";

interface PokemonListProps {
  query: string | undefined;
  requestedPage: number;
  baseUrl: string;
  regionName: string;
}

export default async function List({
  query,
  requestedPage,
  baseUrl,
  regionName,
}: PokemonListProps) {
  let pokemons: PokemonApiResource[] = await getPokemons(baseUrl);

  // Filter the list by Pokémon name
  if (query) {
    pokemons = pokemons.filter((p) => {
      return p.name.includes(query.toLowerCase());
    });
  }

  // Define the total amount of pages to be displayed
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(pokemons.length / ITEMS_PER_PAGE);

  // Get the current page number
  const currentPage =
    Number.isInteger(requestedPage) &&
    requestedPage > 0 &&
    requestedPage <= totalPages
      ? requestedPage
      : 1;

  // Define the offset
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = offset + ITEMS_PER_PAGE;

  // Divide the amount of data based on the pagination number
  const paginatedData = pokemons.slice(offset, endIndex);

  return (
    <div className="mx-auto text-center">
      <SearchBar />

      <ul className="w-[300px] mx-auto text-center">
        {paginatedData.map((p) => (
          <Item key={p.name} pokemon={p} regionName={regionName} />
        ))}
      </ul>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
