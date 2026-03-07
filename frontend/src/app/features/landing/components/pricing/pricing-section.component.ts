import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'landing-pricing-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)]">
        <h2 class="text-3xl font-bold text-slate-900">Simple pricing</h2>
        <p class="mt-2 text-slate-600">Start free and upgrade when needed.</p>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <article class="rounded-2xl border border-slate-200 p-6">
            <p class="text-sm font-semibold text-slate-500">Starter</p>
            <p class="mt-3 text-3xl font-bold text-slate-900">$0</p>
            <p class="mt-3 text-sm text-slate-600">Basic generation, editing, and history access.</p>
          </article>
          <article class="rounded-2xl border border-emerald-300 bg-emerald-50 p-6">
            <p class="text-sm font-semibold text-emerald-700">Pro</p>
            <p class="mt-3 text-3xl font-bold text-slate-900">$19<span class="text-base font-medium text-slate-500">/mo</span></p>
            <p class="mt-3 text-sm text-slate-700">Priority generation and advanced tone controls.</p>
            <a routerLink="/register" class="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Start Pro Trial</a>
          </article>
        </div>
      </div>
    </section>
  `
})
export class PricingSectionComponent {}
