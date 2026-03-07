import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a routerLink="/" class="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">CL</span>
          CoverLetter AI
        </a>

        @if (isAppShell()) {
          <nav class="hidden items-center gap-6 text-sm md:flex">
            <a routerLink="/dashboard" routerLinkActive="text-emerald-600" class="text-slate-600 hover:text-slate-900">Dashboard</a>
            <a routerLink="/generator" routerLinkActive="text-emerald-600" class="text-slate-600 hover:text-slate-900">Generator</a>
            <a routerLink="/history" routerLinkActive="text-emerald-600" class="text-slate-600 hover:text-slate-900">History</a>
          </nav>
        }

        <div class="flex items-center gap-3">
          @if (authService.isAuthenticated()) {
            <span class="hidden text-sm text-slate-600 sm:block">{{ initials() }}</span>
            <button
              type="button"
              (click)="authService.logout()"
              class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          } @else {
            <a routerLink="/login" class="rounded-lg px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">Login</a>
            <a routerLink="/register" class="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800">Get Started</a>
          }
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
  readonly isAppShell = input(false);

  readonly initials = computed(() => {
    const name = this.authService.user()?.name ?? '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  });
}
