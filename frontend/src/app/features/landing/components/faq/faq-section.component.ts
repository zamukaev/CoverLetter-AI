import { Component } from '@angular/core';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';

@Component({
  selector: 'landing-faq-section',
  standalone: true,
  imports: [SectionContainerComponent],
  template: `
    <ui-section-container>
      <div class="mb-8 max-w-3xl">
        <p class="ui-kicker">FAQ</p>
        <h2 class="ui-title-lg">Frequently asked questions</h2>
      </div>

      <div class="grid gap-3">
        @for (item of faqs; track item.question) {
          <details class="ui-surface group p-5 open:border-blue-200 open:bg-blue-50/30 sm:p-6">
            <summary class="cursor-pointer list-none pr-8 text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              {{ item.question }}
            </summary>
            <p class="mt-3 text-sm leading-7 text-slate-600">{{ item.answer }}</p>
          </details>
        }
      </div>
    </ui-section-container>
  `
})
export class FaqSectionComponent {
  readonly faqs = [
    {
      question: 'Can I edit the generated cover letter before sending?',
      answer: 'Yes. Every draft is fully editable, so you can refine tone, structure, and wording before you submit.'
    },
    {
      question: 'Will the letter reflect my actual experience?',
      answer: 'Yes. CoverLetter AI uses your resume context to highlight your relevant skills, achievements, and strengths.'
    },
    {
      question: 'Can I use it for different industries and job types?',
      answer: 'Absolutely. Add any job description and the platform adapts language and emphasis to the specific role.'
    },
    {
      question: 'Can I access my letters later?',
      answer: 'Yes. Saved letters are stored in your history so you can review, edit, and reuse them anytime.'
    }
  ];
}
