import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import siteContent from '../../data/site-content.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  brand = siteContent.brand;
  navLinks = siteContent.nav.links;
  social = siteContent.footer.social;
  legal = siteContent.footer.legal;
  year = new Date().getFullYear();
}
