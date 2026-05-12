import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservations.component.html',
})
export class ReservationsComponent {
  user = computed(() => this.auth.user());
  reservations = computed(() =>
    [...this.auth.reservations()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );
  pending = computed(() => this.reservations().filter(r => r.status === 'pending').length);
  totalUnits = computed(() => this.reservations().reduce((acc, r) => acc + r.units, 0));

  constructor(public auth: AuthService) {}

  cancel(id: string) {
    if (confirm('¿Cancelar esta reserva?')) this.auth.cancelReservation(id);
  }

  formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  }

  statusLabel(s: string) {
    return { pending: 'Pendiente', confirmed: 'Confirmada', cancelled: 'Cancelada' }[s] ?? s;
  }

  statusClass(s: string) {
    return {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelled: 'bg-neutral-100 text-neutral-400 border-neutral-200',
    }[s] ?? '';
  }

  logout() { this.auth.logout(); }
}
