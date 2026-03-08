import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-[radial-gradient(circle_at_0%_0%,#e7f0ff_0%,transparent_30%),radial-gradient(circle_at_100%_15%,#eef4ff_0%,transparent_32%),#f8fafc]">
      <app-navbar />
      <main>
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `
})
export class PublicLayoutComponent {}
