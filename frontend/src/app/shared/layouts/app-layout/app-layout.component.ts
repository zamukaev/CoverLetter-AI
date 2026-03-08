import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="min-h-screen bg-slate-50">
      <app-navbar [isAppShell]="true" />
      <main class="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <router-outlet />
      </main>
    </div>
  `
})
export class AppLayoutComponent {}
