import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'collections',
    loadComponent: () => import('./pages/collections/collections.component').then(m => m.CollectionsComponent),
  },
  {
    path: 'collections/:slug',
    loadComponent: () => import('./pages/collection-detail/collection-detail.component').then(m => m.CollectionDetailComponent),
  },
  {
    path: 'collections/:slug/:productSlug',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: 'sustainability',
    loadComponent: () => import('./pages/sustainability/sustainability.component').then(m => m.SustainabilityComponent),
  },
  {
    path: 'designers',
    loadComponent: () => import('./pages/designers/designers.component').then(m => m.DesignersComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'account/reservations',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/account/reservations.component').then(m => m.ReservationsComponent),
  },
  { path: '**', redirectTo: '' },
];
