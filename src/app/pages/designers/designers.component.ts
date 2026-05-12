import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import siteContent from '../../data/site-content.json';

@Component({
  selector: 'app-designers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './designers.component.html',
})
export class DesignersComponent {
  designers = siteContent.designers;
}
