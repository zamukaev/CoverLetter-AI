import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  template: `
    <div class="flex items-center justify-center" [class.py-12]="!inline()" [class.py-0]="inline()">
      <div class="relative h-10 w-10">
        <div class="absolute inset-0 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
        <div class="absolute inset-[6px] rounded-full bg-white"></div>
      </div>
    </div>
  `
})
export class SpinnerComponent {
  readonly inline = input(false);
}
