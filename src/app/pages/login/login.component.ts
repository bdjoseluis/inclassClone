import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  mode = signal<'login' | 'register'>('login');
  error = signal('');
  loading = signal(false);

  loginForm = { email: '', password: '' };
  registerForm = { name: '', email: '', password: '', confirm: '' };

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    if (auth.isLoggedIn()) router.navigate(['/']);
    const mode = this.route.snapshot.queryParamMap.get('mode');
    if (mode === 'register') this.mode.set('register');
  }

  switchMode(m: 'login' | 'register') {
    this.mode.set(m);
    this.error.set('');
  }

  async submitLogin() {
    this.error.set('');
    this.loading.set(true);
    await new Promise(r => setTimeout(r, 400));
    const ok = this.auth.login(this.loginForm.email, this.loginForm.password);
    this.loading.set(false);
    if (!ok) { this.error.set('Email o contraseña incorrectos'); return; }
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigateByUrl(returnUrl);
  }

  async submitRegister() {
    this.error.set('');
    if (this.registerForm.password !== this.registerForm.confirm) {
      this.error.set('Las contraseñas no coinciden'); return;
    }
    if (this.registerForm.password.length < 6) {
      this.error.set('La contraseña debe tener al menos 6 caracteres'); return;
    }
    this.loading.set(true);
    await new Promise(r => setTimeout(r, 400));
    const ok = this.auth.register(this.registerForm.name, this.registerForm.email, this.registerForm.password);
    this.loading.set(false);
    if (!ok) { this.error.set('Este email ya está registrado'); return; }
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigateByUrl(returnUrl);
  }
}
