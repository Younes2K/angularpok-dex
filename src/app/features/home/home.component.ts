import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly features = [
    { title: 'Explorez', desc: 'Parcourez plus de 1000 Pokémon avec une navigation paginée et des filtres par génération' },
    { title: 'Statistiques', desc: 'Consultez les stats précises de chaque Pokémon avec des barres de progression animées' },
    { title: 'Favoris', desc: 'Sauvegardez localement vos Pokémon préférés et retrouvez-les à tout moment' },
  ];

  constructor(private router: Router) {}

  goToPokemon(): void {
    this.router.navigate(['/pokemon']);
  }

  goToSearch(): void {
    this.router.navigate(['/search']);
  }
}
