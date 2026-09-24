export interface PokemonApiResource {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  }
}

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
