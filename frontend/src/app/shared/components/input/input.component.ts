import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-input-hint',
  standalone: true,
  template: `
    @if (error()) {
      <p class="ui-error">{{ error() }}</p>
    } @else if (hint()) {
      <p class="ui-help">{{ hint() }}</p>
    }
  `
})
export class InputHintComponent {
  readonly error = input<string | null>(null);
  readonly hint = input<string | null>(null);
}
