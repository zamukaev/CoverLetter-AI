import { Component } from '@angular/core';

@Component({
  selector: 'landing-features-section',
  standalone: true,
  template: `
    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="mb-10 max-w-2xl">
        <h2 class="text-3xl font-bold text-slate-900">Built for high-quality applications</h2>
        <p class="mt-3 text-slate-600">Everything you need from draft to final submission.</p>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @for (feature of features; track feature.title) {
          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_35px_-28px_rgba(15,23,42,0.3)]">
            <h3 class="font-semibold text-slate-900">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ feature.description }}</p>
          </article>
        }
      </div>
    </section>
  `
})
export class FeaturesSectionComponent {
  readonly features = [
    {
      title: 'Role-Targeted Drafts',
      description: 'Generate letters tuned to the job description, not generic templates.'
    },
    {
      title: 'Resume-Aware Writing',
      description: 'Uses your CV details to highlight relevant experience and outcomes.'
    },
    {
      title: 'Fast Editing Workflow',
      description: 'Refine generated text in place with instant save, copy, and export.'
    },
    {
      title: 'Personal History',
      description: 'Keep all previously generated letters organized and searchable.'
    }
  ];
}
