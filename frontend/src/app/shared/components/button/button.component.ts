import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  template: `
    <button
      [disabled]="disabled() || loading()"
      [type]="type()"
      [class]="baseClass + ' ' + sizeClass + ' ' + variantClass"
    >
      @if (loading()) {
        <span class="h-4 w-4 animate-spin rounded-full border-2 border-current/25 border-t-current"></span>
      }
      <span class="truncate"><ng-content /></span>
    </button>
  `
})
export class ButtonComponent {
  readonly type = input<'button' | 'submit'>('button');
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'danger'>('primary');

  readonly baseClass =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/45 disabled:cursor-not-allowed disabled:opacity-55';

  get sizeClass(): string {
    switch (this.size()) {
      case 'sm':
        return 'px-3.5 py-2 text-xs';
      case 'lg':
        return 'px-5.5 py-3 text-sm';
      default:
        return 'px-4.5 py-2.5 text-sm';
    }
  }

  get variantClass(): string {
    switch (this.variant()) {
      case 'secondary':
        return 'border border-slate-300 bg-white text-slate-700 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)] hover:border-slate-400 hover:bg-slate-50';
      case 'ghost':
        return 'bg-transparent text-slate-700 hover:bg-slate-100';
      case 'danger':
        return 'bg-rose-600 text-white shadow-[0_14px_30px_-18px_rgba(225,29,72,0.75)] hover:bg-rose-500';
      default:
        return 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_18px_34px_-20px_rgba(37,99,235,0.95)] hover:from-blue-500 hover:to-blue-500';
    }
  }
}
