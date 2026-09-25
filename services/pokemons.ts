// services/pokemons.ts
import axios from "axios";

import type {
  PokemonApiResource,
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
} from "@/types/types";

// Get all Pokémons from a particular region/generation
export async function getPokemons(url: string): Promise<PokemonApiResource[]> {
  const response = await axios.get(url);
  return response.data.results;
}

// Get a single Pokémon based on its ID value
export async function getPokemon(url: string): Promise<Pokemon> {
  const response = await axios.get(url);
  return response.data;
}

// Get the species for a single Pokémon
export async function getSpecies(name: string): Promise<PokemonSpecies | null> {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // When a Pokémon has a specific form name, strip the trailing "-form" segment
      const baseName = name.split("-")[0];

      // Try again without the trailing form name
      if (baseName !== name) {
        return getSpecies(baseName);
      }

      // Base name also 404s, return null
      return null;
    }

    throw error;
  }
}

// Get the entire evolution chain for a specific Pokémon species
export async function getEvolutionChain(
  url: string | undefined,
): Promise<EvolutionChain | null> {
  // If no species was found, return null
  if (!url) return null;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // If the chain is not found, return null
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}
