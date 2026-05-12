import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../features/hero/hero.component';
import siteContent from '../../data/site-content.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  news = siteContent.news;
  featured = siteContent.featuredProduct;
  categories = siteContent.homeCategories;
  catalogues = siteContent.catalogues;
  spaces = siteContent.spaces;
}
