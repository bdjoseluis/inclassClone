import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import siteContent from '../../data/site-content.json';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  data = siteContent.about;
}
