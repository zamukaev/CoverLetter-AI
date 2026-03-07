import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'landing-cta-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white">
        <h2 class="text-3xl font-bold">Ready to send better applications?</h2>
        <p class="mt-3 text-slate-300">Create your first tailored cover letter in under two minutes.</p>
        <a routerLink="/register" class="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900">Create Account</a>
      </div>
    </section>
  `
})
export class CtaSectionComponent {}
