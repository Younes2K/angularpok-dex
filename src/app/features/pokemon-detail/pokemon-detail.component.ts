import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { Pokemon, PokemonSpecies } from '../../core/models/pokemon.model';
import { PokemonService } from '../../core/services/pokemon.service';
import { FavoritesService } from '../../core/services/favorites.service';

interface DetailState {
  pokemon: Pokemon | null;
  species: PokemonSpecies | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  state: DetailState = { pokemon: null, species: null, loading: true, error: null };
  isFavorite = false;

  readonly statColors: Record<string, string> = {
    hp: 'bg-green-500',
    attack: 'bg-red-500',
    defense: 'bg-blue-500',
    'special-attack': 'bg-violet-500',
    'special-defense': 'bg-indigo-500',
    speed: 'bg-yellow-500',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = Number(params.get('id'));
      this.load(id);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private load(id: number): void {
    this.state = { pokemon: null, species: null, loading: true, error: null };

    forkJoin({
      pokemon: this.pokemonService.getPokemonById(id),
      species: this.pokemonService.getPokemonSpecies(id),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ pokemon, species }) => {
          this.state = { pokemon, species, loading: false, error: null };
          this.isFavorite = this.favoritesService.isFavorite(pokemon.id);
          this.updateMeta(pokemon);
        },
        error: (err: Error) => {
          this.state = { ...this.state, loading: false, error: err.message };
        },
      });
  }

  private updateMeta(pokemon: Pokemon): void {
    const name = this.capitalize(pokemon.name);
    this.titleService.setTitle(`${name} — Pokédex`);
    this.metaService.updateTag({ name: 'description', content: `Découvrez les statistiques et détails de ${name}` });
  }

  goBack(): void {
    this.router.navigate(['/pokemon']);
  }

  toggleFavorite(): void {
    if (!this.state.pokemon) return;
    this.favoritesService.toggle(this.state.pokemon.id);
    this.isFavorite = !this.isFavorite;
  }

  getArtwork(): string {
    return this.state.pokemon
      ? this.pokemonService.getOfficialArtwork(this.state.pokemon)
      : '';
  }

  getFlavorText(): string {
    return this.state.species ? this.pokemonService.getFlavorText(this.state.species) : '';
  }

  getGenus(): string {
    return this.state.species ? this.pokemonService.getGenus(this.state.species) : '';
  }

  getStatPercent(value: number): number {
    return Math.min(100, Math.round((value / 255) * 100));
  }

  getStatColor(statName: string): string {
    return this.statColors[statName] ?? 'bg-slate-500';
  }

  capitalize(value: string): string {
    return value
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  get paddedId(): string {
    return this.state.pokemon ? String(this.state.pokemon.id).padStart(4, '0') : '';
  }

  get isLegendary(): boolean {
    return this.state.species?.is_legendary ?? false;
  }

  get isMythical(): boolean {
    return this.state.species?.is_mythical ?? false;
  }
}
