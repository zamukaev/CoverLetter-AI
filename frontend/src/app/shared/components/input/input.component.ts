import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-input-hint',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (error()) {
      <p class="mt-1 text-xs text-rose-600">{{ error() }}</p>
    } @else if (hint()) {
      <p class="mt-1 text-xs text-slate-500">{{ hint() }}</p>
    }
  `
})
export class InputHintComponent {
  readonly error = input<string | null>(null);
  readonly hint = input<string | null>(null);
}
