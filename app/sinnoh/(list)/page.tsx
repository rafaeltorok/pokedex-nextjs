import type { Metadata } from "next";
import itemsPerPageOptions from "@/constants/itemsPerPageOptions";

// Components
import Page from "@/components/pokemonList/Page";

export const metadata: Metadata = {
  title: "Sinnoh Pokédex | Pokédex App",
};

export default async function SinnohList(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  // Define the region API link
  const baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107";

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
        Sinnoh Pokédex
      </h1>

      <Page
        query={query}
        requestedPage={page}
        baseUrl={baseUrl}
        regionName="sinnoh"
        itemsPerPage={Number(itemsPerPage)}
      />
    </>
  );
}
