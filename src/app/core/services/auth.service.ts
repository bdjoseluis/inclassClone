import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Reservation {
  id: string;
  productSlug: string;
  productName: string;
  collectionSlug: string;
  reference: string;
  units: number;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(this.loadUser());
  private _reservations = signal<Reservation[]>(this.loadReservations());

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly reservations = this._reservations.asReadonly();

  private loadUser(): User | null {
    try {
      const raw = localStorage.getItem('inclass_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  private loadReservations(): Reservation[] {
    try {
      const raw = localStorage.getItem('inclass_reservations');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  login(email: string, password: string): boolean {
    const users: (User & { password: string })[] = this.getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return false;
    const { password: _, ...user } = found;
    this._user.set(user);
    localStorage.setItem('inclass_user', JSON.stringify(user));
    return true;
  }

  register(name: string, email: string, password: string): boolean {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) return false;
    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      name,
      email,
      role: 'user',
      password,
    };
    users.push(newUser);
    localStorage.setItem('inclass_users', JSON.stringify(users));
    const { password: _, ...user } = newUser;
    this._user.set(user);
    localStorage.setItem('inclass_user', JSON.stringify(user));
    return true;
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('inclass_user');
  }

  addReservation(res: Omit<Reservation, 'id' | 'date' | 'status'>) {
    const newRes: Reservation = {
      ...res,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [...this._reservations(), newRes];
    this._reservations.set(updated);
    localStorage.setItem('inclass_reservations', JSON.stringify(updated));
    return newRes;
  }

  cancelReservation(id: string) {
    const updated = this._reservations().map(r =>
      r.id === id ? { ...r, status: 'cancelled' as const } : r
    );
    this._reservations.set(updated);
    localStorage.setItem('inclass_reservations', JSON.stringify(updated));
  }

  private getUsers(): (User & { password: string })[] {
    try {
      const raw = localStorage.getItem('inclass_users');
      const users = raw ? JSON.parse(raw) : [];
      // Seed demo user
      if (!users.find((u: User) => u.email === 'demo@inclass.es')) {
        users.push({ id: 'demo', name: 'Demo User', email: 'demo@inclass.es', password: 'demo1234', role: 'user' });
        localStorage.setItem('inclass_users', JSON.stringify(users));
      }
      return users;
    } catch { return []; }
  }
}
