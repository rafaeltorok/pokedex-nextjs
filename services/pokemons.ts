import axios from "axios";

import type { PokemonApiResource, Pokemon } from "@/types/types";

export async function getPokemons(): Promise<PokemonApiResource[]> {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=151",
  );
  return response.data.results;
}

export async function getPokemon(url: string): Promise<Pokemon> {
  const response = await axios.get(url);
  return response.data;
}
