import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'landing-hero-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-6xl px-4 pt-18 pb-14 sm:px-6 lg:px-8 lg:pt-24">
      <div class="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span class="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">AI Writing Assistant</span>
          <h1 class="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Tailored cover letters that sound like you
          </h1>
          <p class="mt-5 max-w-xl text-lg text-slate-600">
            Paste any job description, add your resume, and generate polished letters in seconds. Edit, copy, and export instantly.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/register" class="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Start Free</a>
            <a routerLink="/login" class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Login</a>
          </div>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_55px_-32px_rgba(15,23,42,0.4)] sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">Live Example</p>
          <h3 class="mt-3 text-xl font-bold text-slate-900">Generated for Product Manager role</h3>
          <p class="mt-4 text-sm leading-7 text-slate-600">
            Dear Hiring Manager, I’m excited to apply for the Product Manager role at your company. With experience leading cross-functional teams and shipping user-centered products...
          </p>
          <div class="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-lg bg-slate-100 px-3 py-2 text-slate-600">Tone: Professional</div>
            <div class="rounded-lg bg-slate-100 px-3 py-2 text-slate-600">ETA: ~8 sec</div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent {}
