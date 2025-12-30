import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, inject, computed } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import Typed from 'typed.js';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
    private platformId = inject(PLATFORM_ID);
    themeService = inject(ThemeService);

    // Computed signal for main hero image
    heroImage = computed(() => this.themeService.isDarkMode() ? 'images/final-me.jpg' : 'images/islam.jpg');

    // Computed signal for secondary floating image
    secondaryImage = computed(() => this.themeService.isDarkMode() ? 'images/islam.jpg' : 'images/final-me.jpg');

    @ViewChild('typedRoles') typedRolesElement!: ElementRef;

    typed: any;

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Delay typing effect until the main loader finishes (approx 2s)
            setTimeout(() => {
                if (!this.typedRolesElement) return;

                const options = {
                    strings: [
                        'I help forward-thinking companies build scalable, user-centric web applications using Angular and Laravel. From complex backends to pixel-perfect frontends.'
                    ],
                    typeSpeed: 40,
                    backSpeed: 20,
                    showCursor: true,
                    cursorChar: '|',
                    loop: false
                };

                try {
                    this.typed = new Typed(this.typedRolesElement.nativeElement, options);
                } catch (error) {
                    console.error('Frontend Error: Typed.js failed', error);
                }
            }, 2500);
        }
    }

    ngOnDestroy() {
        if (this.typed) {
            this.typed.destroy();
        }
    }

    onMouseMove(event: MouseEvent) {
        if (!isPlatformBrowser(this.platformId)) return;

        const moveX = (event.clientX * -20) / window.innerWidth;
        const moveY = (event.clientY * -20) / window.innerHeight;

        const blobs = document.querySelectorAll('.hero .absolute.rounded-full');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 2;
            (blob as HTMLElement).style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    }
}
