import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  LandingNavigationService,
  type LandingSection,
} from '../../../core/services/landing-navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a routerLink="/" class="flex items-center gap-2 text-sm font-bold text-slate-900">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_12px_24px_-14px_rgba(37,99,235,0.9)]">CL</span>
          CoverLetter AI
        </a>

        @if (!isAppShell()) {
          <nav class="hidden items-center gap-2 text-sm md:flex">
            @for (item of publicNav; track item.section) {
              <button
                type="button"
                (click)="navigateTo(item.section)"
                class="rounded-lg px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                [class.bg-blue-50]="landingNavigation.activeSection() === item.section"
                [class.text-blue-700]="landingNavigation.activeSection() === item.section"
              >
                {{ item.label }}
              </button>
            }
          </nav>
        }

        @if (isAppShell()) {
          <nav class="hidden items-center gap-2 text-sm md:flex">
            <a routerLink="/dashboard" routerLinkActive="bg-blue-50 text-blue-700" class="rounded-lg px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">Dashboard</a>
            <a routerLink="/generator" routerLinkActive="bg-blue-50 text-blue-700" class="rounded-lg px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">Generator</a>
            <a routerLink="/history" routerLinkActive="bg-blue-50 text-blue-700" class="rounded-lg px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">History</a>
          </nav>
        }

        <div class="flex items-center gap-2 sm:gap-3">
          @if (authService.isAuthenticated()) {
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-700"
              [attr.aria-label]="'Logged in as ' + (authService.user()?.name || 'User')"
            >
              {{ initials() || 'U' }}
            </button>
            <button
              type="button"
              (click)="authService.logout()"
              class="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          } @else {
            <a routerLink="/login" class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Sign In</a>
            <a routerLink="/register" class="rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(37,99,235,0.95)] transition hover:from-blue-500 hover:to-blue-500">Start Free</a>
          }

          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 md:hidden"
            (click)="mobileOpen.update((v) => !v)"
            [attr.aria-expanded]="mobileOpen()"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      @if (mobileOpen()) {
        <div class="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div class="flex flex-col gap-2 text-sm">
            @if (isAppShell()) {
              <a routerLink="/dashboard" class="rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-slate-100">Dashboard</a>
              <a routerLink="/generator" class="rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-slate-100">Generator</a>
              <a routerLink="/history" class="rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-slate-100">History</a>
            } @else {
              @for (item of publicNav; track item.section) {
                <button
                  type="button"
                  (click)="navigateTo(item.section)"
                  class="rounded-lg px-3 py-2 text-left font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {{ item.label }}
                </button>
              }
            }
          </div>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
  readonly landingNavigation = inject(LandingNavigationService);
  readonly isAppShell = input(false);
  readonly mobileOpen = signal(false);

  readonly publicNav: Array<{ label: string; section: LandingSection }> = [
    { label: 'Features', section: 'features' },
    { label: 'How It Works', section: 'how-it-works' },
    { label: 'Pricing', section: 'pricing' },
    { label: 'FAQ', section: 'faq' },
  ];

  readonly initials = computed(() => {
    const name = this.authService.user()?.name ?? '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  });

  navigateTo(section: LandingSection): void {
    this.mobileOpen.set(false);
    this.landingNavigation.navigateTo(section);
  }
}
