import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonCard } from '../../../core/models/pokemon.model';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: PokemonCard;

  isFavorite = false;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.isFavorite = this.favoritesService.isFavorite(this.pokemon.id);
  }

  navigate(): void {
    this.router.navigate(['/pokemon', this.pokemon.id]);
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.favoritesService.toggle(this.pokemon.id);
    this.isFavorite = !this.isFavorite;
  }

  get paddedId(): string {
    return String(this.pokemon.id).padStart(4, '0');
  }
}
