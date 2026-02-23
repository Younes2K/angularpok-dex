import { NgModule } from '@angular/core';
import { PokemonListRoutingModule } from './pokemon-list-routing.module';
import { PokemonListComponent } from './pokemon-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PokemonListComponent],
  imports: [SharedModule, PokemonListRoutingModule],
})
export class PokemonListModule {}
