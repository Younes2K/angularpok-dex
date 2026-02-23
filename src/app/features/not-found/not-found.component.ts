import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor(
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('404 — Page introuvable | Pokédex');
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToPokemon(): void {
    this.router.navigate(['/pokemon']);
  }
}
