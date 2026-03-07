import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'generator-preview',
  standalone: true,
  template: `
    <div class="rounded-2xl border border-slate-200 bg-white p-5">
      <div class="mb-3 flex items-center justify-between gap-3">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Generated Letter</h3>
        <div class="flex gap-2">
          <button type="button" (click)="copy.emit()" class="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">Copy</button>
          <button type="button" (click)="download.emit()" class="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">Download .txt</button>
          <button type="button" (click)="save.emit()" class="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500">Save</button>
        </div>
      </div>
      <textarea
        [value]="text"
        (input)="textChange.emit(($any($event.target).value))"
        rows="16"
        class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none ring-emerald-500 focus:ring-2"
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
}
