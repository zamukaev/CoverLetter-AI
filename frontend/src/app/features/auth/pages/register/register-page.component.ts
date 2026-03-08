import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { InputHintComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthCardComponent } from '../../../../shared/components/auth-card/auth-card.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputHintComponent,
    ButtonComponent,
    AuthCardComponent,
    ToastComponent
  ],
  template: `
    <ui-auth-card
      title="Create your account"
      subtitle="Start generating premium cover letters in a few clicks."
    >
      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
        <div>
          <label for="name" class="ui-label">Full name</label>
          <input id="name" formControlName="name" type="text" autocomplete="name" class="ui-input" placeholder="Alex Johnson" />
          <ui-input-hint [error]="nameError()" />
        </div>

        <div>
          <label for="email" class="ui-label">Email</label>
          <input id="email" formControlName="email" type="email" autocomplete="email" class="ui-input" placeholder="you@company.com" />
          <ui-input-hint [error]="emailError()" />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="password" class="ui-label">Password</label>
            <input id="password" formControlName="password" type="password" autocomplete="new-password" class="ui-input" placeholder="At least 8 characters" />
            <ui-input-hint [error]="passwordError()" />
          </div>

          <div>
            <label for="confirmPassword" class="ui-label">Confirm password</label>
            <input id="confirmPassword" formControlName="confirmPassword" type="password" autocomplete="new-password" class="ui-input" placeholder="Repeat password" />
            <ui-input-hint [error]="confirmPasswordError()" />
          </div>
        </div>

        <ui-toast [message]="error()" variant="error" />

        <ui-button [loading]="loading()" type="submit" size="lg" class="w-full">Create account</ui-button>
      </form>

      <p class="mt-6 text-sm text-slate-600">
        Already have an account?
        <a routerLink="/login" class="font-semibold text-blue-700 hover:text-blue-600">Login</a>
      </p>
    </ui-auth-card>
  `
})
export class RegisterPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
    { validators: [passwordMatchValidator] }
  );

  nameError(): string | null {
    const control = this.form.controls.name;
    if (!control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Name is required';
    if (control.errors['minlength']) return 'Name must be at least 2 characters';
    return null;
  }

  emailError(): string | null {
    const control = this.form.controls.email;
    if (!control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Email is required';
    if (control.errors['email']) return 'Enter a valid email address';
    return null;
  }

  passwordError(): string | null {
    const control = this.form.controls.password;
    if (!control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Password is required';
    if (control.errors['minlength']) return 'Password must be at least 8 characters';
    return null;
  }

  confirmPasswordError(): string | null {
    const control = this.form.controls.confirmPassword;
    if (!control.touched && !this.form.touched) return null;
    if (control.errors?.['required']) return 'Confirm password is required';
    if (this.form.errors?.['passwordMismatch']) return 'Passwords do not match';
    return null;
  }

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { name, email, password } = this.form.getRawValue();

    this.authService.register({ name, email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/dashboard']);
      },
      error: (err: { error?: { message?: string } }) => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? 'Registration failed. Please try again.');
      }
    });
  }
}
