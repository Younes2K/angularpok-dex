import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'pokedex-theme';
  private readonly darkMode$ = new BehaviorSubject<boolean>(false);

  readonly isDark$ = this.darkMode$.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved !== null ? saved === 'dark' : prefersDark;
    this.applyTheme(isDark);
  }

  toggle(): void {
    this.applyTheme(!this.darkMode$.value);
  }

  private applyTheme(isDark: boolean): void {
    this.darkMode$.next(isDark);
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  get isDark(): boolean {
    return this.darkMode$.value;
  }
}
