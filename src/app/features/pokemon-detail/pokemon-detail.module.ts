import { NgModule } from '@angular/core';
import { PokemonDetailRoutingModule } from './pokemon-detail-routing.module';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PokemonDetailComponent],
  imports: [SharedModule, PokemonDetailRoutingModule],
})
export class PokemonDetailModule {}
