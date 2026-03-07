import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero/hero-section.component';
import { FeaturesSectionComponent } from '../../components/features/features-section.component';
import { PricingSectionComponent } from '../../components/pricing/pricing-section.component';
import { CtaSectionComponent } from '../../components/cta/cta-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    FeaturesSectionComponent,
    PricingSectionComponent,
    CtaSectionComponent
  ],
  template: `
    <landing-hero-section />
    <landing-features-section />
    <landing-pricing-section />
    <landing-cta-section />
  `
})
export class LandingPageComponent {}
