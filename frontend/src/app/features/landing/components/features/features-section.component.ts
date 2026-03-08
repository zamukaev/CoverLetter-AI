import { Component } from '@angular/core';
import { FeatureCardComponent } from '../../../../shared/components/feature-card/feature-card.component';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';

@Component({
  selector: 'landing-features-section',
  standalone: true,
  imports: [FeatureCardComponent, SectionContainerComponent],
  template: `
    <ui-section-container>
      <div class="mb-10 max-w-3xl">
        <p class="ui-kicker">Features</p>
        <h2 class="ui-title-lg">Everything you need to apply smarter and faster</h2>
        <p class="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Built for students, professionals, and active job seekers managing multiple applications.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (feature of features; track feature.title) {
          <ui-feature-card [title]="feature.title" [description]="feature.description" [icon]="feature.icon" />
        }
      </div>
    </ui-section-container>
  `
})
export class FeaturesSectionComponent {
  readonly features = [
    {
      title: 'Job-specific letters',
      description: 'Create personalized drafts tailored to each role and company, not one-size-fits-all templates.',
      icon: 'FIT'
    },
    {
      title: 'Resume-based personalization',
      description: 'Use your real experience and achievements to keep every letter specific and credible.',
      icon: 'CV'
    },
    {
      title: 'Flexible tone control',
      description: 'Choose professional, confident, concise, or friendly voice based on the role and company culture.',
      icon: 'TONE'
    },
    {
      title: 'Quick edit and export',
      description: 'Refine drafts in-app, then save, copy, or download instantly when you are ready to apply.',
      icon: 'EDIT'
    },
    {
      title: 'Searchable history',
      description: 'Keep every saved letter organized so you can reuse and adapt strong versions quickly.',
      icon: 'HIST'
    },
    {
      title: 'Built for high volume',
      description: 'Move from job post to send-ready letter in minutes, even across many applications per day.',
      icon: 'FAST'
    }
  ];
}
