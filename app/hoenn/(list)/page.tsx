import type { Metadata } from "next";
import itemsPerPageOptions from "@/constants/itemsPerPageOptions";

// Components
import Page from "@/components/pokemonList/Page";

export const metadata: Metadata = {
  title: "Hoenn Pokédex | Pokédex App",
};

export default async function HoennList(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  // Define the region API link
  const baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135";

  // Extract the query search term
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const page = Number(searchParams?.page) || 1;
  let itemsPerPage = String(searchParams?.limit);

  // Guards against invalid limits set directly on the URL
  if (!itemsPerPageOptions.includes(itemsPerPage)) {
    itemsPerPage = "8";
  }

  return (
    <>
      <h1
        className="
          mx-auto mt-8 mb-2
          text-2xl text-center
          font-bold
          [text-shadow:1px_1px_0_#000]
        "
      >
        Hoenn Pokédex
      </h1>

      <Page
        query={query}
        requestedPage={page}
        baseUrl={baseUrl}
        regionName="hoenn"
        itemsPerPage={Number(itemsPerPage)}
      />
    </>
  );
}
