import { Component, HostListener, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="isVisible"
      (click)="scrollToTop()"
      class="scroll-to-top fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--bg-main)] shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 focus:outline-none focus:ring-4 focus:ring-[rgba(var(--accent-rgb),0.18)]"
      aria-label="Scroll to top" title="Scroll to top">

      <svg class="progress-ring" width="56" height="56" aria-hidden="true">
        <circle
          class="progress-ring-circle"
          stroke="currentColor"
          stroke-width="3"
          fill="transparent"
          r="24"
          cx="28"
          cy="28"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashOffset"
        />
      </svg>

      <i class="fas fa-arrow-up absolute text-lg" aria-hidden="true"></i>
    </button>
  `,
  styles: [`
    .scroll-to-top {
      animation: fadeIn 0.26s ease-in-out;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px) scale(.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .progress-ring { transform: rotate(-90deg); position: absolute; }

    .progress-ring-circle {
      transition: stroke-dashoffset 180ms linear, opacity 220ms ease;
      opacity: 0.85;
      stroke: rgba(255,255,255,0.9);
    }

    @media (max-width: 640px) {
      .scroll-to-top { bottom: 4rem; right: 1.25rem; width: 48px; height: 48px; }
    }
  `]
})
export class ScrollToTopComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  isVisible = false;
  scrollProgress = 0;
  circumference = 2 * Math.PI * 24;
  dashOffset = this.circumference;

  ngOnInit() {
    this.dashOffset = this.circumference;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = Math.max(document.documentElement.scrollHeight - document.documentElement.clientHeight, 1);

      this.isVisible = scrollTop > 300;
      this.scrollProgress = Math.min(1, scrollTop / scrollHeight);

      // Update circular progress
      const progress = this.scrollProgress;
      this.dashOffset = this.circumference * (1 - progress);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
