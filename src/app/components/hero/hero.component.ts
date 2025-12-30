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

    // Typing effect signal
    displayText = signal('');
    private phrases = [
        'I build scalable, enterprise-grade web applications.',
        'I transform complex backends into pixel-perfect frontends.',
        'I solve business problems with elegant, high-performance code.'
    ];
    private currentPhraseIndex = 0;
    private charIndex = 0;
    private isDeleting = false;
    private typingTimer: any;

    // Computed signals for images
    heroImage = computed(() => this.themeService.isDarkMode() ? 'images/final-me.jpg' : 'images/islam.jpg');
    secondaryImage = computed(() => this.themeService.isDarkMode() ? 'images/islam.jpg' : 'images/final-me.jpg');

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Start typing after a brief delay for the initial loader
            setTimeout(() => this.type(), 2200);
        }
    }

    private type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];

        if (this.isDeleting) {
            this.displayText.set(currentPhrase.substring(0, this.charIndex - 1));
            this.charIndex--;
        } else {
            this.displayText.set(currentPhrase.substring(0, this.charIndex + 1));
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? 30 : 60;

        if (!this.isDeleting && this.charIndex === currentPhrase.length) {
            typeSpeed = 2500; // Pause at end of phrase
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }

        this.typingTimer = setTimeout(() => this.type(), typeSpeed);
    }

    ngOnDestroy() {
        if (this.typingTimer) clearTimeout(this.typingTimer);
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
