// Services
import { getPokemons, getPokemon } from "@/lib/data";

// Components
import SearchBar from "@/components/SearchBar";
import ListContainer from "./ListContainer";

// TypeScript types
import type { PokemonApiResource } from "@/types/pokemon";
import { generationName } from "@/types/icons";

interface PageProps {
  query: string | undefined;
  requestedPage: number;
  baseUrl: string;
  regionName: string;
  generationIcons: generationName;
}

export default async function Page({
  query,
  requestedPage,
  baseUrl,
  regionName,
  generationIcons,
}: PageProps) {
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

  // Map each sprite icon to the page's respective items
  const paginatedDataWithIcons = await Promise.all(
    paginatedData.map(async (d) => {
      const itemData = await getPokemon(d.url);
      return {
        ...d,
        icon:
          itemData.sprites.versions?.[generationIcons]?.icons.front_default ||
          "",
      };
    }),
  );

  return (
    <div className="mx-auto text-center">
      <SearchBar />

      <ListContainer
        paginatedData={paginatedDataWithIcons}
        regionName={regionName}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
