export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  stats: PokemonStatSlot[];
  abilities: PokemonAbilitySlot[];
  moves: PokemonMoveSlot[];
  species: NamedResource;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
    dream_world: {
      front_default: string | null;
    };
  };
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedResource;
}

export interface PokemonStatSlot {
  base_stat: number;
  effort: number;
  stat: NamedResource;
}

export interface PokemonAbilitySlot {
  ability: NamedResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMoveSlot {
  move: NamedResource;
}

export interface NamedResource {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
  genera: Genus[];
  generation: NamedResource;
  color: NamedResource;
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedResource;
  version: NamedResource;
}

export interface Genus {
  genus: string;
  language: NamedResource;
}

export interface PokemonCard {
  id: number;
  name: string;
  image: string;
  types: string[];
}
