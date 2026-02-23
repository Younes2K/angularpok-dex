import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { PokemonCard } from '../../core/models/pokemon.model';
import { PokemonService } from '../../core/services/pokemon.service';

interface SearchState {
  result: PokemonCard | null;
  loading: boolean;
  error: string | null;
  searched: boolean;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  searchForm!: FormGroup;
  state: SearchState = { result: null, loading: false, error: null, searched: false };

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get queryControl() {
    return this.searchForm.get('query')!;
  }

  get queryErrors(): { required?: boolean; minlength?: boolean } {
    return this.queryControl.errors ?? {};
  }

  search(): void {
    if (this.searchForm.invalid) return;

    const name = this.queryControl.value.trim() as string;
    this.state = { result: null, loading: true, error: null, searched: true };

    this.pokemonService
      .getPokemonByName(name)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: pokemon => {
          const card: PokemonCard = {
            id: pokemon.id,
            name: pokemon.name,
            image:
              pokemon.sprites.other?.['official-artwork']?.front_default ??
              pokemon.sprites.front_default ??
              '',
            types: pokemon.types.map(t => t.type.name),
          };
          this.state = { result: card, loading: false, error: null, searched: true };
        },
        error: (err: Error) => {
          this.state = { result: null, loading: false, error: err.message, searched: true };
        },
      });
  }

  viewDetail(): void {
    if (this.state.result) {
      this.router.navigate(['/pokemon', this.state.result.id]);
    }
  }

  reset(): void {
    this.searchForm.reset();
    this.state = { result: null, loading: false, error: null, searched: false };
  }
}
