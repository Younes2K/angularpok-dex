import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonCardSkeletonComponent } from './components/pokemon-card-skeleton/pokemon-card-skeleton.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent,
    PokemonCardComponent,
    PokemonCardSkeletonComponent,
    CapitalizePipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NavbarComponent,
    SpinnerComponent,
    PokemonCardComponent,
    PokemonCardSkeletonComponent,
    CapitalizePipe,
  ],
})
export class SharedModule {}
