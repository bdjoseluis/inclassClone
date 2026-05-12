import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import siteContent from '../../data/site-content.json';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './collections.component.html',
})
export class CollectionsComponent {
  filters = siteContent.collectionFilters;
  all = siteContent.collections;
  activeFilter = signal('');

  filtered = computed(() => {
    const f = this.activeFilter();
    if (!f) return this.all;
    if (f === 'new') return this.all.filter(c => c.new);
    return this.all.filter(c => c.tipo === f);
  });

  setFilter(value: string) { this.activeFilter.set(value); }
}
