import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [disabled]="disabled() || loading()"
      [type]="type()"
      [class]="baseClass + ' ' + variantClass"
    >
      @if (loading()) {
        <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
      }
      <span><ng-content /></span>
    </button>
  `
})
export class ButtonComponent {
  readonly type = input<'button' | 'submit'>('button');
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');

  readonly baseClass =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60';

  get variantClass(): string {
    switch (this.variant()) {
      case 'secondary':
        return 'bg-slate-100 text-slate-800 hover:bg-slate-200';
      case 'ghost':
        return 'bg-transparent text-slate-700 hover:bg-slate-100';
      default:
        return 'bg-emerald-600 text-white hover:bg-emerald-500';
    }
  }
}
