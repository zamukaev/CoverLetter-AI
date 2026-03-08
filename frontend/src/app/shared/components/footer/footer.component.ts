import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingNavigationService } from '../../../core/services/landing-navigation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="mt-8 border-t border-slate-200/70 bg-white/90">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm text-slate-500 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div class="lg:col-span-2">
          <p class="text-lg font-extrabold tracking-tight text-slate-900">CoverLetter AI</p>
          <p class="mt-3 max-w-md leading-6">Generate personalized, professional cover letters in minutes with a workflow designed for real job seekers.</p>
          <p class="mt-5 text-xs">(c) {{ year }} CoverLetter AI. All rights reserved.</p>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-900">Product</p>
          <div class="mt-3 grid gap-2.5">
            <button type="button" (click)="landingNavigation.navigateTo('features')" class="w-fit text-left font-medium transition hover:text-slate-900">Features</button>
            <button type="button" (click)="landingNavigation.navigateTo('pricing')" class="w-fit text-left font-medium transition hover:text-slate-900">Pricing</button>
            <button type="button" (click)="landingNavigation.navigateTo('faq')" class="w-fit text-left font-medium transition hover:text-slate-900">FAQ</button>
          </div>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-900">Company</p>
          <div class="mt-3 grid gap-2.5">
            <a routerLink="/login" class="font-medium transition hover:text-slate-900">Login</a>
            <a routerLink="/register" class="font-medium transition hover:text-slate-900">Sign up</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly landingNavigation = inject(LandingNavigationService);
  readonly year = new Date().getFullYear();
}
