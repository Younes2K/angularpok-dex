import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isDark$!: Observable<boolean>;
  menuOpen = false;

  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDark$ = this.themeService.isDark$;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.menuOpen = false;
  }

  isActive(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }
}
