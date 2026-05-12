import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import siteContent from '../../data/site-content.json';

@Component({
  selector: 'app-sustainability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sustainability.component.html',
})
export class SustainabilityComponent {
  data = siteContent.sustainability;
}
