import { Component } from '@angular/core';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';

@Component({
  selector: 'landing-how-it-works-section',
  standalone: true,
  imports: [SectionContainerComponent],
  template: `
    <ui-section-container>
      <div class="ui-surface p-8 sm:p-10">
        <div class="max-w-3xl">
          <p class="ui-kicker">How It Works</p>
          <h2 class="ui-title-lg">Three simple steps from job post to ready-to-send letter</h2>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-3">
          @for (step of steps; track step.title; let i = $index) {
            <article class="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 transition hover:border-blue-200 hover:shadow-[0_20px_50px_-38px_rgba(37,99,235,0.5)]">
              <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">Step {{ i + 1 }}</p>
              <h3 class="mt-3 text-lg font-bold tracking-tight text-slate-900">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-slate-600">{{ step.description }}</p>
            </article>
          }
        </div>
      </div>
    </ui-section-container>
  `
})
export class HowItWorksSectionComponent {
  readonly steps = [
    {
      title: 'Add the job description',
      description: 'Paste the role details so the AI can align your letter with responsibilities and required skills.'
    },
    {
      title: 'Add your resume context',
      description: 'Share your experience, strengths, and achievements so each draft reflects your real profile.'
    },
    {
      title: 'Generate and finalize',
      description: 'Choose a tone, refine wording, then save, copy, or download your final cover letter.'
    }
  ];
}
