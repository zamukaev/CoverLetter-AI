import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';
import { LandingNavigationService } from '../../../../core/services/landing-navigation.service';

@Component({
  selector: 'landing-hero-section',
  standalone: true,
  imports: [RouterLink, ButtonComponent, SectionContainerComponent],
  template: `
    <ui-section-container spacing="lg">
      <div class="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span class="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">CoverLetter AI</span>
          <h1 class="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Write job-winning cover letters faster than ever
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Turn any job description and your resume into a polished, role-specific letter in seconds, then edit and submit with confidence.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/register">
              <ui-button size="lg">Get Started Free</ui-button>
            </a>
            <ui-button variant="secondary" size="lg" (click)="landingNavigation.navigateTo('how-it-works')">
              View How It Works
            </ui-button>
          </div>
        </div>

        <div class="ui-surface overflow-hidden p-6 sm:p-8">
          <div class="mb-5 flex items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Sample Output</p>
            <span class="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">Average: 9 seconds</span>
          </div>
          <h3 class="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Product Marketing Manager at NovaPay</h3>
          <p class="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm leading-7 text-slate-700">
            Dear Hiring Team, I am excited to apply for the Product Marketing Manager role at NovaPay. I have led cross-functional launches that increased product adoption by 31% while improving activation quality...
          </p>
          <div class="mt-5 grid gap-3 text-xs font-semibold text-slate-600 sm:grid-cols-2">
            <div class="ui-surface-soft px-3 py-2">Tone: Professional</div>
            <div class="ui-surface-soft px-3 py-2">Ready for ATS submission</div>
          </div>
        </div>
      </div>
    </ui-section-container>
  `
})
export class HeroSectionComponent {
  readonly landingNavigation = inject(LandingNavigationService);
}
