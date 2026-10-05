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
