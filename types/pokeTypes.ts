// Types for the Pokémon data table
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface TypeDetails {
  name: string;
  damage_relations: DamageRelations;
}

export interface DamageRelations {
  no_damage_to: DamageRelation[];
  half_damage_to: DamageRelation[];
  double_damage_to: DamageRelation[];
  no_damage_from: DamageRelation[];
  half_damage_from: DamageRelation[];
  double_damage_from: DamageRelation[];
}

export interface DamageRelation {
  name: string;
  url: string;
}
