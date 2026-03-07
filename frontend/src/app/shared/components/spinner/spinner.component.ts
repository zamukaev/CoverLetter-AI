import { Component } from '@angular/core';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  template: `
    <div class="flex items-center justify-center py-10">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600"></div>
    </div>
  `
})
export class SpinnerComponent {}
