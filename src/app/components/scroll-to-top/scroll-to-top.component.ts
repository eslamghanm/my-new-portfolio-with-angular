import { Component, HostListener, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class.visible]="isVisible"
      (click)="scrollToTop()"
      class="scroll-to-top-btn"
      aria-label="Scroll to top" title="Scroll to top">

      <svg class="progress-ring" width="56" height="56" aria-hidden="true">
        <circle
          class="progress-ring-circle"
          stroke="currentColor"
          stroke-width="2"
          fill="transparent"
          r="24"
          cx="28"
          cy="28"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashOffset"
        />
      </svg>

      <i class="fas fa-arrow-up text-lg" aria-hidden="true"></i>
    </button>
  `,
  styles: [`
    .scroll-to-top-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--bg-elevated);
      color: var(--accent);
      border: 1px solid var(--border);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000 !important;
      visibility: hidden;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .scroll-to-top-btn.visible {
       visibility: visible !important;
       opacity: 1 !important;
       transform: translateY(0);
       pointer-events: auto !important;
    }

    .scroll-to-top-btn:hover {
      background: var(--accent);
      color: white;
      transform: scale(1.1) translateY(-5px);
      border-color: var(--accent);
    }

    .progress-ring { transform: rotate(-90deg); position: absolute; top: 0; left: 0; }
    .progress-ring-circle {
      transition: stroke-dashoffset 0.1s linear;
      stroke: var(--accent);
      stroke-width: 2;
    }

    @media (max-width: 768px) {
      .scroll-to-top-btn { bottom: 1.5rem; right: 1.5rem; width: 48px; height: 48px; }
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

      this.isVisible = scrollTop > 200;
      this.scrollProgress = Math.min(1, scrollTop / scrollHeight);

      // Update circular progress
      this.dashOffset = this.circumference * (1 - this.scrollProgress);
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
