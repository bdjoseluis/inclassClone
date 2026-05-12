import { Component, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import siteContent from '../../data/site-content.json';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  navLinks = siteContent.nav.links;
  languages = siteContent.nav.languages;
  menuOpen = signal(false);
  userMenuOpen = signal(false);
  activeLang = signal('ES');
  scrolled = signal(false);

  isLoggedIn = computed(() => this.auth.isLoggedIn());
  user = computed(() => this.auth.user());
  reservationCount = computed(() =>
    this.auth.reservations().filter(r => r.status === 'pending').length
  );

  constructor(public auth: AuthService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 60); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-user-menu]')) this.userMenuOpen.set(false);
  }

  toggleMenu() { this.menuOpen.update(v => !v); this.userMenuOpen.set(false); }
  toggleUserMenu(e: Event) { e.stopPropagation(); this.userMenuOpen.update(v => !v); }
  setLang(lang: string) { this.activeLang.set(lang); }
  closeMenu() { this.menuOpen.set(false); }

  logout() {
    this.auth.logout();
    this.userMenuOpen.set(false);
    this.router.navigate(['/']);
  }

  get isDark(): boolean {
    return !this.scrolled() && !this.menuOpen();
  }
}
