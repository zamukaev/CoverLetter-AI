import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <article class="ui-surface p-6 sm:p-7">
      <ng-content />
    </article>
  `
})
export class CardComponent {}
