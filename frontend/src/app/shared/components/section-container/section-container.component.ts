import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-section-container',
  standalone: true,
  template: `
    <section [class]="'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ' + spacingClass()">
      <ng-content />
    </section>
  `
})
export class SectionContainerComponent {
  readonly spacing = input<'sm' | 'md' | 'lg'>('md');

  spacingClass(): string {
    switch (this.spacing()) {
      case 'sm':
        return 'py-12';
      case 'lg':
        return 'py-20 sm:py-24';
      default:
        return 'py-14 sm:py-18';
    }
  }
}
