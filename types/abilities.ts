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
  flavor_text_entries: FlavorText[];
}

export interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface AbilityData {
  name: string;
  description: string;
}
