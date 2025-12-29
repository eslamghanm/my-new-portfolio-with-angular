import { Component, signal, OnInit, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { forkJoin, timer, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { GithubService } from './services/github.service';
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
  private githubService = inject(GithubService);
  // Signal for loading state - default to false for SSR to render content immediately
  protected readonly isLoading = signal(false);

  ngOnInit() {
    // Start pre-fetching repos
    if (isPlatformBrowser(this.platformId)) {
      // Set isLoading to true ONLY on client startup
      this.isLoading.set(true);

      this.githubService.getRepos('eslamghanm').subscribe({
        error: (err) => console.error('Initial fetch failed:', err)
      });
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // --- SAFETY SWITCH ---
    // If something hangs, we MUST show the page after 7 seconds.
    const safetyTimer = setTimeout(() => {
      this.isLoading.set(false);
    }, 7000);

    // Coordinate data and UI initialization
    try {
      document.documentElement.classList.add('js-ready');
      initPortfolioFeatures();
    } catch (e) {
      console.error('Feature init failed', e);
    }

    // Wait for GitHub data (or timeout) then hide loader
    this.githubService.getRepos('eslamghanm').pipe(
      catchError(() => of([])),
      timeout(3500)
    ).subscribe({
      next: () => {
        // Add a slight delay for aesthetic smooth transition
        setTimeout(() => {
          clearTimeout(safetyTimer);
          this.isLoading.set(false);
        }, 1000);
      },
      error: () => {
        clearTimeout(safetyTimer);
        this.isLoading.set(false);
      }
    });
  }
}
