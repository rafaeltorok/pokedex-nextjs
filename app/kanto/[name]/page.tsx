import PokemonPage from "@/components/PokemonPage";

export default async function KantoPokePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // Get the name from the URL
  const { name } = await params;

  // Create the API url
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  
  return (
    <PokemonPage pokeName={name} baseUrl={baseUrl} />
  );
}
