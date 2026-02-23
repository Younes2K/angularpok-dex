import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PokemonCard } from '../../core/models/pokemon.model';
import { PokemonService } from '../../core/services/pokemon.service';

interface PageState {
  pokemons: PokemonCard[];
  total: number;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly PAGE_SIZE = 20;

  state: PageState = { pokemons: [], total: 0, loading: true, error: null };
  currentPage = 1;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPage(page: number): void {
    this.state = { ...this.state, loading: true, error: null };
    const offset = (page - 1) * this.PAGE_SIZE;

    this.pokemonService
      .getPokemonList(this.PAGE_SIZE, offset)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ cards, total }) => {
          this.state = { pokemons: cards, total, loading: false, error: null };
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (err: Error) => {
          this.state = { ...this.state, loading: false, error: err.message };
        },
      });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.loadPage(page);
  }

  get totalPages(): number {
    return Math.ceil(this.state.total / this.PAGE_SIZE);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: number[] = [];

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }

    if (range[0] > 1) {
      if (range[0] > 2) range.unshift(-1);
      range.unshift(1);
    }

    if (range[range.length - 1] < total) {
      if (range[range.length - 1] < total - 1) range.push(-1);
      range.push(total);
    }

    return range;
  }

  retry(): void {
    this.loadPage(this.currentPage);
  }

  trackByPokemon(_: number, pokemon: PokemonCard): number {
    return pokemon.id;
  }
}
