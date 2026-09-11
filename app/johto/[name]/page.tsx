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
    title: `${capitalize(name)} | Johto Pokédex`,
  };
};

export default async function JohtoPokePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // Get the name from the URL
  const { name } = await params;

  // Create the API url
  const baseUrl = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100";
  
  return (
    <PokemonPage pokeName={name} baseUrl={baseUrl} />
  );
}
