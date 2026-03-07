import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'generator-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Job Description</label>
        <textarea
          formControlName="jobDescription"
          rows="7"
          class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-emerald-500 focus:ring-2"
          placeholder="Paste the full job description"
        ></textarea>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Resume / CV Text</label>
        <textarea
          formControlName="resumeText"
          rows="7"
          class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-emerald-500 focus:ring-2"
          placeholder="Paste your resume content"
        ></textarea>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Tone (optional)</label>
        <input
          formControlName="tone"
          type="text"
          class="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2"
          placeholder="e.g. Professional, confident"
        />
      </div>

      <button
        type="submit"
        class="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Generate Cover Letter
      </button>
    </form>
  `
})
export class GeneratorFormComponent {
  private readonly fb = inject(FormBuilder);

  @Output() readonly submitted = new EventEmitter<{
    jobDescription: string;
    resumeText: string;
    tone?: string;
  }>();

  readonly form = this.fb.nonNullable.group({
    jobDescription: ['', [Validators.required, Validators.minLength(20)]],
    resumeText: ['', [Validators.required, Validators.minLength(20)]],
    tone: ['']
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.submitted.emit({
      jobDescription: value.jobDescription,
      resumeText: value.resumeText,
      tone: value.tone?.trim() ? value.tone.trim() : undefined
    });
  }
}
