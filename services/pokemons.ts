import axios from "axios";

import type { PokemonApiResource, Pokemon } from "@/types/types";

export async function getPokemons(url: string): Promise<PokemonApiResource[]> {
  const response = await axios.get(url);
  return response.data.results;
}

export async function getPokemon(url: string): Promise<Pokemon> {
  const response = await axios.get(url);
  return response.data;
}
