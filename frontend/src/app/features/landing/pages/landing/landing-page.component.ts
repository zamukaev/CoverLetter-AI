import { Component, DestroyRef, ElementRef, effect, inject, viewChild } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero/hero-section.component';
import { TrustSectionComponent } from '../../components/trust/trust-section.component';
import { FeaturesSectionComponent } from '../../components/features/features-section.component';
import { HowItWorksSectionComponent } from '../../components/how-it-works/how-it-works-section.component';
import { PricingSectionComponent } from '../../components/pricing/pricing-section.component';
import { FaqSectionComponent } from '../../components/faq/faq-section.component';
import { CtaSectionComponent } from '../../components/cta/cta-section.component';
import { LandingNavigationService } from '../../../../core/services/landing-navigation.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    TrustSectionComponent,
    FeaturesSectionComponent,
    HowItWorksSectionComponent,
    PricingSectionComponent,
    FaqSectionComponent,
    CtaSectionComponent
  ],
  template: `
    <landing-hero-section />
    <landing-trust-section />
    <section #featuresSection class="scroll-mt-28">
      <landing-features-section />
    </section>
    <section #howItWorksSection class="scroll-mt-28">
      <landing-how-it-works-section />
    </section>
    <section #pricingSection class="scroll-mt-28">
      <landing-pricing-section />
    </section>
    <section #faqSection class="scroll-mt-28">
      <landing-faq-section />
    </section>
    <landing-cta-section />
  `
})
export class LandingPageComponent {
  private readonly landingNavigation = inject(LandingNavigationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly featuresSection = viewChild.required<ElementRef<HTMLElement>>('featuresSection');
  readonly howItWorksSection = viewChild.required<ElementRef<HTMLElement>>('howItWorksSection');
  readonly pricingSection = viewChild.required<ElementRef<HTMLElement>>('pricingSection');
  readonly faqSection = viewChild.required<ElementRef<HTMLElement>>('faqSection');

  constructor() {
    effect(() => {
      this.landingNavigation.registerSection('features', this.featuresSection().nativeElement);
      this.landingNavigation.registerSection('how-it-works', this.howItWorksSection().nativeElement);
      this.landingNavigation.registerSection('pricing', this.pricingSection().nativeElement);
      this.landingNavigation.registerSection('faq', this.faqSection().nativeElement);
    });

    this.destroyRef.onDestroy(() => {
      this.landingNavigation.unregisterSection('features');
      this.landingNavigation.unregisterSection('how-it-works');
      this.landingNavigation.unregisterSection('pricing');
      this.landingNavigation.unregisterSection('faq');
    });
  }
}
