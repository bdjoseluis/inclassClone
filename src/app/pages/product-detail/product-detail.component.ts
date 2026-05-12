import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/services/catalog.service';
import { AuthService } from '../../core/services/auth.service';
import type { CollectionDetail, ProductVariant } from '../../core/models/catalog.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  collection = signal<CollectionDetail | null>(null);
  product = signal<ProductVariant | null>(null);
  related = signal<CollectionDetail[]>([]);
  otherProducts = signal<ProductVariant[]>([]);

  // Reserve modal state
  reserveOpen = signal(false);
  reserveUnits = signal(1);
  reserveSuccess = signal(false);
  reserveError = signal('');

  // Image gallery
  activeImage = signal(0);

  isLoggedIn = computed(() => this.auth.isLoggedIn());
  user = computed(() => this.auth.user());

  stockClass = computed(() => {
    const s = this.product()?.stock ?? 0;
    if (s > 10) return 'text-emerald-600';
    if (s > 3) return 'text-amber-500';
    return 'text-red-500';
  });

  stockLabel = computed(() => {
    const s = this.product()?.stock ?? 0;
    if (s > 10) return 'En stock';
    if (s > 3) return 'Pocas unidades';
    return 'Últimas unidades';
  });

  stockDotClass = computed(() => {
    const s = this.product()?.stock ?? 0;
    if (s > 10) return 'bg-emerald-500';
    if (s > 3) return 'bg-amber-400';
    return 'bg-red-500';
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catalog: CatalogService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const collSlug = params.get('slug')!;
      const prodSlug = params.get('productSlug')!;
      const result = this.catalog.getProduct(collSlug, prodSlug);
      if (!result) { this.router.navigate(['/collections', collSlug]); return; }
      this.collection.set(result.collection);
      this.product.set(result.product);
      this.related.set(this.catalog.getRelated(result.collection.relatedSlugs));
      this.otherProducts.set(result.collection.products.filter(p => p.slug !== prodSlug));
      this.activeImage.set(0);
      this.reserveSuccess.set(false);
      this.reserveError.set('');
    });
  }

  get images(): string[] {
    const col = this.collection();
    const prod = this.product();
    if (!col || !prod) return [];
    return [prod.image, ...col.heroImages.filter(i => i !== prod.image)].slice(0, 5);
  }

  openReserve() {
    if (!this.isLoggedIn()) {
      const url = this.router.url;
      this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
      return;
    }
    this.reserveUnits.set(1);
    this.reserveError.set('');
    this.reserveSuccess.set(false);
    this.reserveOpen.set(true);
  }

  closeReserve() { this.reserveOpen.set(false); }

  decUnits() { this.reserveUnits.update(v => Math.max(1, v - 1)); }
  incUnits() { this.reserveUnits.update(v => Math.min(this.product()!.stock, v + 1)); }

  confirmReserve() {
    const prod = this.product();
    const col = this.collection();
    if (!prod || !col) return;
    if (this.reserveUnits() < 1) { this.reserveError.set('Mínimo 1 unidad'); return; }
    if (this.reserveUnits() > prod.stock) {
      this.reserveError.set(`Solo hay ${prod.stock} unidades disponibles`);
      return;
    }
    this.auth.addReservation({
      productSlug: prod.slug,
      productName: prod.name,
      collectionSlug: col.slug,
      reference: prod.reference,
      units: this.reserveUnits(),
    });
    this.reserveSuccess.set(true);
  }
}
