import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PokemonIdGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = Number(route.paramMap.get('id'));
    if (!isNaN(id) && id > 0 && id <= 10000) {
      return true;
    }
    this.router.navigate(['/not-found']);
    return false;
  }
}
