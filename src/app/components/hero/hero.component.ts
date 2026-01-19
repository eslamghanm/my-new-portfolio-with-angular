import { Component, PLATFORM_ID, inject, signal, OnInit, OnDestroy, computed } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
    private platformId = inject(PLATFORM_ID);
    themeService = inject(ThemeService);

    // Simple rotating text - no complex typing animation
    currentPhraseIndex = signal(0);
    phrases = [
        'Building scalable, enterprise-grade web applications.',
        'Crafting pixel-perfect, accessible user interfaces.',
        'Bridging the gap between complex backends and elegant frontends.'
    ];
    displayText = signal('');
    private rotationTimer: any;

    // Computed signals for images
    heroImage = computed(() => this.themeService.isDarkMode() ? '/images/final-me.jpg' : '/images/islam.jpg');

    ngOnInit() {
        // Set initial text
        this.displayText.set(this.phrases[0]);

        if (isPlatformBrowser(this.platformId)) {
            // Start rotating phrases after a delay
            setTimeout(() => {
                this.startRotation();
            }, 3000);
        }
    }

    private startRotation() {
        if (!isPlatformBrowser(this.platformId)) return;

        // Rotate phrases every 4 seconds
        this.rotationTimer = setInterval(() => {
            const nextIndex = (this.currentPhraseIndex() + 1) % this.phrases.length;
            this.currentPhraseIndex.set(nextIndex);
            this.displayText.set(this.phrases[nextIndex]);
        }, 4000);
    }

    ngOnDestroy() {
        if (this.rotationTimer) clearInterval(this.rotationTimer);
    }

    onMouseMove(event: MouseEvent) {
        if (!isPlatformBrowser(this.platformId)) return;

        try {
            // Respect reduced motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            const moveX = (event.clientX * -20) / window.innerWidth;
            const moveY = (event.clientY * -20) / window.innerHeight;

            const blobs = document.querySelectorAll('.hero .absolute.rounded-full');
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 2;
                (blob as HTMLElement).style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        } catch (error) {
            // Silently handle parallax errors
        }
    }
}
