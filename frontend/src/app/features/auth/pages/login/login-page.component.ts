import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { InputHintComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputHintComponent, ButtonComponent],
  template: `
    <section class="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] sm:p-8">
        <h1 class="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p class="mt-2 text-sm text-slate-600">Login to continue generating cover letters.</p>

        <form [formGroup]="form" (ngSubmit)="submit()" class="mt-6 space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input formControlName="email" type="email" class="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none ring-emerald-500 focus:ring-2" />
            <ui-input-hint [error]="emailError()" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input formControlName="password" type="password" class="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none ring-emerald-500 focus:ring-2" />
            <ui-input-hint [error]="passwordError()" />
          </div>

          @if (error()) {
            <p class="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{{ error() }}</p>
          }

          <ui-button [loading]="loading()" type="submit" class="w-full">Login</ui-button>
        </form>

        <p class="mt-4 text-sm text-slate-600">
          New here?
          <a routerLink="/register" class="font-semibold text-emerald-700">Create an account</a>
        </p>
      </div>
    </section>
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
