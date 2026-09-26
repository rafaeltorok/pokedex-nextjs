// Type for the Pokémon list
export interface PokemonApiResource {
  name: string;
  url: string;
}

// Types for the Pokémon data table
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface AbilityDescription {
  name: string;
  flavor_text_entries: FlavorText[]
}

interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  }
}

export interface AbilityData {
  name: string;
  description: string;
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

// Evolution chain types

// Name of the trigger (e.g. level-up, use-item, trade)
export interface EvolutionTrigger {
  name: string;
}

// Define how a Pokémon evolves
export interface EvolutionDetails {
  trigger: EvolutionTrigger;
  min_level: number | null;
  item: {
    name: string;
  } | null;
}

// Single evolution chain link
export interface ChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetails[];
  evolves_to: ChainLink[]; // recursive
}

// Root for the evolution chain
export interface EvolutionChain {
  chain: ChainLink;
}
