import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';

@Component({
  selector: 'landing-cta-section',
  standalone: true,
  imports: [RouterLink, ButtonComponent, SectionContainerComponent],
  template: `
    <ui-section-container>
      <div class="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 px-6 py-12 text-center text-white shadow-[0_45px_100px_-58px_rgba(15,23,42,0.92)] sm:px-10 sm:py-14">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Submit better applications with less effort</h2>
        <p class="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          Join professionals and students using CoverLetter AI to apply faster with clear, personalized cover letters.
        </p>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a routerLink="/register">
            <ui-button size="lg">Get Started Free</ui-button>
          </a>
          <a routerLink="/login">
            <ui-button variant="secondary" size="lg">Sign In</ui-button>
          </a>
        </div>
      </div>
    </ui-section-container>
  `
})
export class CtaSectionComponent {}
