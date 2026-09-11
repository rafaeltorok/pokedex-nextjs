import type { Metadata } from "next";

// Components
import PokemonPage from "@/components/PokemonPage";

// Utils
import capitalize from "@/utils/capitalize";

export async function generateMetadata(
  { params }: { params: Promise<{ name: string }> }
): Promise<Metadata> {
  const { name } = await params;

  return {
    title: `${capitalize(name)} | Sinnoh Pokédex`,
  };
};

export default async function SinnohPokePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // Get the name from the URL
  const { name } = await params;

  // Create the API url
  const baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107";
  
  return (
    <PokemonPage pokeName={name} baseUrl={baseUrl} />
  );
}
