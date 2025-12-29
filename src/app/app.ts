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
  protected readonly title = signal('portifolio_with_angular');
  protected readonly isLoading = signal(true);

  ngOnInit() {
    // Start pre-fetching repos to cache them in the service
    if (isPlatformBrowser(this.platformId)) {
      this.githubService.getRepos('eslamghanm').subscribe({
        error: (err) => console.error('Initial repo fetch failed:', err)
      });
    }
  }

  ngAfterViewInit() {
    // Initialize portfolio interactive features after full view loads
    if (isPlatformBrowser(this.platformId)) {
      try {
        document.documentElement.classList.add('js-ready');
        // Initialize interactive animations/features
        initPortfolioFeatures();
      } catch (error) {
        console.error('Error during portfolio feature initialization:', error);
      } finally {
        // COORDINATED LOADING: Wait for real data OR a fallback timeout
        // This ensures the loader stays visible until data is likely ready
        forkJoin([
          // Wait for GitHub repos (already pre-firing in ngOnInit)
          this.githubService.getRepos('eslamghanm').pipe(
            catchError(() => of([])),
            timeout(4000) // Don't wait more than 4s for GitHub
          ),
          // Minimum aesthetic delay for the loader (so it doesn't flicker)
          timer(1200)
        ]).pipe(
          catchError(() => of([])),
          timeout(6000) // Absolute safety timeout for the whole sequence
        ).subscribe({
          next: () => {
            this.isLoading.set(false);
          },
          error: () => {
            this.isLoading.set(false);
          }
        });
      }
    } else {
      // On server, we keep isLoading=true which the client will then hydrate
    }
  }
}
