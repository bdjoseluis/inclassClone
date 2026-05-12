import { Component, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

const FULL_SCREEN_ROUTES = ['/login'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  template: `
    @if (showChrome()) { <app-header /> }
    <main>
      <router-outlet />
    </main>
    @if (showChrome()) { <app-footer /> }
  `,
})
export class AppComponent {
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  showChrome = computed(() =>
    !FULL_SCREEN_ROUTES.some(r => this.currentUrl().startsWith(r))
  );

  constructor(private router: Router) {}
}
