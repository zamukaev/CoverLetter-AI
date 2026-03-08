import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-toast',
  standalone: true,
  template: `
    @if (message()) {
      <div
        [class]="
          variant() === 'error'
            ? 'rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700'
            : variant() === 'success'
              ? 'rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700'
              : 'rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700'
        "
      >
        {{ message() }}
      </div>
    }
  `
})
export class ToastComponent {
  readonly message = input<string | null>(null);
  readonly variant = input<'success' | 'error' | 'info'>('info');
}
