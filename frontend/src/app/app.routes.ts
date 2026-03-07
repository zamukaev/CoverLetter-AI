import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/pages/landing/landing-page.component').then(
            (m) => m.LandingPageComponent
          )
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login-page.component').then(
            (m) => m.LoginPageComponent
          )
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register-page.component').then(
            (m) => m.RegisterPageComponent
          )
      }
    ]
  },
  {
    path: '',
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./shared/layouts/app-layout/app-layout.component').then((m) => m.AppLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard-page.component').then(
            (m) => m.DashboardPageComponent
          )
      },
      {
        path: 'generator',
        loadComponent: () =>
          import('./features/generator/pages/generator/generator-page.component').then(
            (m) => m.GeneratorPageComponent
          )
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./features/history/pages/history-list/history-list-page.component').then(
            (m) => m.HistoryListPageComponent
          )
      },
      {
        path: 'history/:id',
        loadComponent: () =>
          import('./features/history/pages/history-detail/history-detail-page.component').then(
            (m) => m.HistoryDetailPageComponent
          )
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found-page.component').then((m) => m.NotFoundPageComponent)
  }
];
