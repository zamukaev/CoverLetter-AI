import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'generator-preview',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="ui-surface p-5 sm:p-6">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 class="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Generated Letter</h3>
          <p class="mt-1 text-xs text-slate-500">Edit before saving or exporting</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <ui-button size="sm" variant="secondary" (click)="copy.emit()">Copy</ui-button>
          <ui-button size="sm" variant="secondary" (click)="download.emit()">Download TXT</ui-button>
          <ui-button size="sm" variant="ghost" (click)="regenerate.emit()">Regenerate (Soon)</ui-button>
          <ui-button size="sm" (click)="save.emit()">Save</ui-button>
        </div>
      </div>

      <textarea
        [value]="text"
        (input)="textChange.emit(($any($event.target).value))"
        rows="18"
        class="ui-textarea"
      ></textarea>
    </div>
  `
})
export class GeneratorPreviewComponent {
  @Input({ required: true }) text = '';
  @Output() readonly textChange = new EventEmitter<string>();
  @Output() readonly copy = new EventEmitter<void>();
  @Output() readonly download = new EventEmitter<void>();
  @Output() readonly save = new EventEmitter<void>();
  @Output() readonly regenerate = new EventEmitter<void>();
}
