import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { InputHintComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthCardComponent } from '../../../../shared/components/auth-card/auth-card.component';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-login-page',
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
      title="Welcome back"
      subtitle="Log in to continue generating tailored cover letters with AI."
    >
      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
        <div>
          <label for="email" class="ui-label">Email</label>
          <input id="email" formControlName="email" type="email" autocomplete="email" class="ui-input" placeholder="you@company.com" />
          <ui-input-hint [error]="emailError()" />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <label for="password" class="ui-label mb-0">Password</label>
            <a routerLink="/login" class="text-xs font-semibold text-blue-700 hover:text-blue-600">Forgot?</a>
          </div>
          <input id="password" formControlName="password" type="password" autocomplete="current-password" class="ui-input" placeholder="Enter your password" />
          <ui-input-hint [error]="passwordError()" />
        </div>

        <ui-toast [message]="error()" variant="error" />

        <ui-button [loading]="loading()" type="submit" size="lg" class="w-full">Login</ui-button>
      </form>

      <p class="ui-divider"><span>Social sign in coming soon</span></p>

      <p class="text-sm text-slate-600">
        New to CoverLetter AI?
        <a routerLink="/register" class="font-semibold text-blue-700 hover:text-blue-600">Create an account</a>
      </p>
    </ui-auth-card>
  `
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

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

  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/dashboard']);
      },
      error: (err: { error?: { message?: string } }) => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? 'Login failed. Please try again.');
      }
    });
  }
}
