import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PricingCardComponent } from '../../../../shared/components/pricing-card/pricing-card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';

@Component({
  selector: 'landing-pricing-section',
  standalone: true,
  imports: [RouterLink, PricingCardComponent, ButtonComponent, SectionContainerComponent],
  template: `
    <ui-section-container>
      <div class="mb-10 max-w-3xl">
        <p class="ui-kicker">Pricing</p>
        <h2 class="ui-title-lg">Simple pricing for every application stage</h2>
        <p class="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Start free, upgrade when you need more volume, speed, and advanced controls.</p>
      </div>

      <div class="grid gap-5 lg:grid-cols-2">
        <ui-pricing-card
          plan="Free"
          price="$0"
          description="Ideal for getting started and applying to a few roles each month."
          [features]="[
            'Up to 5 cover letters per month',
            'Full editor and tone selection',
            'Save history plus copy and download'
          ]"
        >
          <a routerLink="/register" class="block">
            <ui-button variant="secondary" class="w-full">Choose Free</ui-button>
          </a>
        </ui-pricing-card>

        <ui-pricing-card
          plan="Pro"
          price="$19/mo"
          description="Built for active job seekers applying to many opportunities every week."
          [features]="[
            'Unlimited cover letters',
            'Faster generation queue',
            'Advanced tone and style controls',
            'Priority customer support'
          ]"
          [featured]="true"
        >
          <a routerLink="/register" class="block">
            <ui-button class="w-full">Start Pro</ui-button>
          </a>
        </ui-pricing-card>
      </div>
    </ui-section-container>
  `
})
export class PricingSectionComponent {}
