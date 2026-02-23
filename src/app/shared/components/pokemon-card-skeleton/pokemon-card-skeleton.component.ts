import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card-skeleton',
  templateUrl: './pokemon-card-skeleton.component.html',
})
export class PokemonCardSkeletonComponent {
  @Input() count = 20;

  get items(): number[] {
    return Array(this.count).fill(0);
  }
}
