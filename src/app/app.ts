import { Component, signal, OnInit, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { initPortfolioFeatures } from './utils/portfolio-features';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    ScrollToTopComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  // Signal for loading state - default to true to show premium loader immediately
  protected readonly isLoading = signal(true);

  ngOnInit() {
    // No longer need to set true here as it's default
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // --- SAFETY SWITCH ---
    const safetyTimer = setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);

    // Coordinate UI initialization
    try {
      document.documentElement.classList.add('js-ready');
      initPortfolioFeatures();
    } catch (e) {
      console.error('Feature init failed', e);
    }

    // Since we are now using 100% static data, we only need an aesthetic delay
    // to show our beautiful premium loader for a brief moment.
    timer(2000).subscribe(() => {
      clearTimeout(safetyTimer);
      this.isLoading.set(false);
    });
  }
}
