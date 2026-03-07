import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p class="text-sm font-semibold uppercase tracking-widest text-emerald-600">404</p>
      <h1 class="mt-3 text-3xl font-semibold text-slate-900">Page not found</h1>
      <p class="mt-3 text-slate-600">The page you requested does not exist.</p>
      <a routerLink="/" class="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">Back home</a>
    </section>
  `
})
export class NotFoundPageComponent {}
