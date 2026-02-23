import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'pokedex-favorites';
  private readonly favorites$ = new BehaviorSubject<number[]>(this.load());

  readonly favorites = this.favorites$.asObservable();

  private load(): number[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  private save(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites$.value));
  }

  isFavorite(id: number): boolean {
    return this.favorites$.value.includes(id);
  }

  toggle(id: number): void {
    const current = this.favorites$.value;
    const updated = current.includes(id)
      ? current.filter(f => f !== id)
      : [...current, id];
    this.favorites$.next(updated);
    this.save();
  }

  get count(): number {
    return this.favorites$.value.length;
  }
}
