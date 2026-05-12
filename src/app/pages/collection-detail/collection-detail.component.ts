import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import type { CollectionDetail } from '../../core/models/catalog.model';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './collection-detail.component.html',
})
export class CollectionDetailComponent implements OnInit {
  collection = signal<CollectionDetail | null>(null);
  activeHero = signal(0);
  related = signal<CollectionDetail[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catalog: CatalogService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug')!;
      const col = this.catalog.getBySlug(slug);
      if (!col) { this.router.navigate(['/collections']); return; }
      this.collection.set(col);
      this.related.set(this.catalog.getRelated(col.relatedSlugs));
      this.activeHero.set(0);
    });
  }

  setHero(i: number) { this.activeHero.set(i); }

  stockClass(stock: number): string {
    if (stock > 10) return 'text-emerald-600';
    if (stock > 3) return 'text-amber-500';
    return 'text-red-500';
  }

  stockLabel(stock: number): string {
    if (stock > 10) return 'En stock';
    if (stock > 3) return 'Pocas unidades';
    return 'Últimas unidades';
  }
}
