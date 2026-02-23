import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonIdGuard } from './core/guards/pokemon-id.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'pokemon',
    loadChildren: () =>
      import('./features/pokemon-list/pokemon-list.module').then(m => m.PokemonListModule),
  },
  {
    path: 'pokemon/:id',
    canActivate: [PokemonIdGuard],
    loadChildren: () =>
      import('./features/pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(m => m.NotFoundModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
