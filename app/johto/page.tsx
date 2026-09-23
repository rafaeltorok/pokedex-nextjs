import type { Metadata } from "next";

// Components
import List from "@/components/PokemonList/List";

export const metadata: Metadata = {
  title: "Johto Pokédex | Pokédex App",
};

export default async function JohtoList(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // Define the region API link
  const baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100";

  // Extract the query search term
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const page = Number(searchParams?.page) || 1;

  return (
    <>
      <h1 className="mx-auto mt-8 mb-2 text-2xl font-bold [text-shadow:1px_1px_0_#000]">
        Johto Pokédex
      </h1>

      <List
        query={query}
        requestedPage={page}
        baseUrl={baseUrl}
        regionName="johto"
      />
    </>
  );
}
