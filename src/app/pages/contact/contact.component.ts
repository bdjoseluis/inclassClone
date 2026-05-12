import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import siteContent from '../../data/site-content.json';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  data = siteContent.contact;
  form = {
    topic: '',
    name: '',
    email: '',
    company: '',
    country: '',
    city: '',
    postal: '',
    phone: '',
    message: '',
    privacy: false,
  };
  sent = signal(false);

  submit() {
    if (this.form.name && this.form.email && this.form.privacy) {
      this.sent.set(true);
    }
  }
}
