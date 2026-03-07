import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-[radial-gradient(circle_at_15%_10%,#e2f8f0_0%,transparent_38%),radial-gradient(circle_at_85%_4%,#f4f0ff_0%,transparent_30%),#f8fafc]">
      <app-navbar />
      <main>
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `
})
export class PublicLayoutComponent {}
