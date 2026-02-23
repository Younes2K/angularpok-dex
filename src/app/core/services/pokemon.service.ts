import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, catchError, throwError } from 'rxjs';
import {
  Pokemon,
  PokemonCard,
  PokemonListItem,
  PokemonListResponse,
  PokemonSpecies,
} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly BASE_URL = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit = 20, offset = 0): Observable<{ cards: PokemonCard[]; total: number }> {
    return this.http
      .get<PokemonListResponse>(`${this.BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap(response => {
          const requests = response.results.map(item =>
            this.getPokemonById(this.extractId(item.url))
          );
          return forkJoin(requests).pipe(
            map(pokemons => ({
              cards: pokemons.map(p => this.toCard(p)),
              total: response.count,
            }))
          );
        }),
        catchError(err => throwError(() => new Error(err.message ?? 'Erreur API')))
      );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(`${this.BASE_URL}/pokemon/${id}`)
      .pipe(catchError(err => throwError(() => new Error(err.message ?? 'Pokémon introuvable'))));
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(`${this.BASE_URL}/pokemon/${name.toLowerCase().trim()}`)
      .pipe(catchError(() => throwError(() => new Error(`Pokémon "${name}" introuvable`))));
  }

  getPokemonSpecies(id: number): Observable<PokemonSpecies> {
    return this.http
      .get<PokemonSpecies>(`${this.BASE_URL}/pokemon-species/${id}`)
      .pipe(catchError(err => throwError(() => new Error(err.message ?? 'Erreur espèce'))));
  }

  private extractId(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
  }

  private toCard(pokemon: Pokemon): PokemonCard {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.sprites.other?.['official-artwork']?.front_default ??
        pokemon.sprites.front_default ??
        '',
      types: pokemon.types.map(t => t.type.name),
    };
  }

  getOfficialArtwork(pokemon: Pokemon): string {
    return (
      pokemon.sprites.other?.['official-artwork']?.front_default ??
      pokemon.sprites.front_default ??
      ''
    );
  }

  getFlavorText(species: PokemonSpecies): string {
    const entry = species.flavor_text_entries.find(e => e.language.name === 'en');
    return entry
      ? entry.flavor_text.replace(/\f|\n/g, ' ')
      : 'No description available.';
  }

  getGenus(species: PokemonSpecies): string {
    const genus = species.genera.find(g => g.language.name === 'en');
    return genus?.genus ?? '';
  }
}
