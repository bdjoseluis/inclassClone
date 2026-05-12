import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import siteContent from '../../data/site-content.json';

interface HeroSlide {
  id: number;
  label: string;
  title: string;
  designer: string;
  cta: string;
  image: string;
  href: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: HeroSlide[] = siteContent.hero.slides;
  activeIndex = signal(0);
  private interval: ReturnType<typeof setInterval> | null = null;

  activeSlide = computed(() => this.slides[this.activeIndex()]);

  ngOnInit() {
    this.interval = setInterval(() => {
      this.activeIndex.update(i => (i + 1) % this.slides.length);
    }, 5000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  goTo(index: number) {
    this.activeIndex.set(index);
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.activeIndex.update(i => (i + 1) % this.slides.length);
    }, 5000);
  }
}
