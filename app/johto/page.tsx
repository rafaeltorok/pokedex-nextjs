import type { Metadata } from "next";

// Components
import PokemonList from "@/components/PokemonList";

export const metadata: Metadata = {
  title: "Johto Pokédex | Pokédex App"
};

export default async function JohtoList(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  // Define the region API link
  const baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100";

  // Extract the query search term
  const searchParams = await props.searchParams;
  const query = searchParams?.query;

  return (
    <>
      <h1 className="mx-auto mt-8 mb-2 text-2xl font-bold [text-shadow:1px_1px_0_#000]">
        Johto Pokédex
      </h1>

      <PokemonList query={query} baseUrl={baseUrl} regionName="johto" />
    </>
  );
}
