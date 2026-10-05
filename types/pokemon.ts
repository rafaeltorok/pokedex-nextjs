import type { PokemonAbility } from "./abilities";
import { PokemonType } from "./pokeTypes";
import { GenerationIcons } from "./icons";

// Type for the Pokémon list
export interface PokemonApiResource {
  name: string;
  url: string;
  icon?: string;
}

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

// Pokémon type for the individual data pages
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
    versions: {
      "generation-i"?: GenerationIcons;
      "generation-ii"?: GenerationIcons;
      "generation-iii"?: GenerationIcons;
      "generation-iv"?: GenerationIcons;
      "generation-v"?: GenerationIcons;
      "generation-vi"?: GenerationIcons;
    };
  };
  types: PokemonType[];
  stats: PokemonStats[];
  abilities: PokemonAbility[];
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
}
