import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { GenerateCoverLetterPayload } from '../../../../core/types/models';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputHintComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'generator-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputHintComponent, ButtonComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="jobTitle" class="ui-label"
            >Job title <span class="font-normal text-slate-400">(optional)</span></label
          >
          <input
            id="jobTitle"
            formControlName="jobTitle"
            type="text"
            class="ui-input"
            placeholder="Senior Product Manager"
          />
        </div>

        <div>
          <label for="companyName" class="ui-label"
            >Company name <span class="font-normal text-slate-400">(optional)</span></label
          >
          <input
            id="companyName"
            formControlName="companyName"
            type="text"
            class="ui-input"
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div>
        <label for="jobDescription" class="ui-label">Job description</label>
        <textarea
          id="jobDescription"
          formControlName="jobDescription"
          rows="8"
          class="ui-textarea"
          placeholder="Paste the full job description..."
        ></textarea>
        <ui-input-hint
          [error]="jobDescriptionError()"
          hint="Include responsibilities and required qualifications for best results."
        />
      </div>

      <div>
        <label for="resumeText" class="ui-label">Resume text</label>
        <textarea
          id="resumeText"
          formControlName="resumeText"
          rows="8"
          class="ui-textarea"
          placeholder="Paste relevant resume content..."
        ></textarea>
        <ui-input-hint
          [error]="resumeTextError()"
          hint="Include measurable achievements to make the letter more persuasive."
        />
      </div>

      <div class="grid gap-4 sm:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] sm:items-end">
        <div>
          <label for="tone" class="ui-label">Tone</label>
          <select id="tone" formControlName="tone" class="ui-select">
            <option value="professional">Professional</option>
            <option value="confident">Confident</option>
            <option value="concise">Concise</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>

        <ui-button
          type="submit"
          size="lg"
          class="w-full"
          [loading]="loading()"
          [disabled]="form.invalid || loading()"
        >
          Generate Cover Letter
        </ui-button>
      </div>
    </form>
  `,
})
export class GeneratorFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly loading = input(false);

  @Output() readonly submitted = new EventEmitter<GenerateCoverLetterPayload>();

  readonly form = this.fb.nonNullable.group({
    jobTitle: [''],
    companyName: [''],
    jobDescription: ['', [Validators.required, Validators.minLength(40)]],
    resumeText: ['', [Validators.required, Validators.minLength(40)]],
    tone: ['professional', [Validators.required]],
  });

  jobDescriptionError(): string | null {
    const control = this.form.controls.jobDescription;
    if (!control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Job description is required';
    if (control.errors['minlength']) return 'Add at least 40 characters for better output quality';
    return null;
  }

  resumeTextError(): string | null {
    const control = this.form.controls.resumeText;
    if (!control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Resume text is required';
    if (control.errors['minlength']) return 'Add at least 40 characters for better output quality';
    return null;
  }

  submit(): void {
    if (this.loading() || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.submitted.emit({
      jobTitle: value.jobTitle.trim() || undefined,
      companyName: value.companyName.trim() || undefined,
      jobDescription: value.jobDescription,
      resumeText: value.resumeText,
      tone: value.tone,
    });
  }
}
