import { Component, inject, HostListener, PLATFORM_ID, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    private platformId = inject(PLATFORM_ID);
    themeService = inject(ThemeService);

    isDark = computed(() => this.themeService.isDarkMode());

    isMenuOpen = false;
    isScrolled = false;
    activeSection = signal<string>('home');

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.isScrolled = scrollPos > 50;
            this.updateActiveSection();
        }
    }

    private updateActiveSection() {
        if (!isPlatformBrowser(this.platformId)) return;

        const sections = ['home', 'about', 'skills', 'projects', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const offsetTop = element.offsetTop;
                const height = element.offsetHeight;

                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                    this.activeSection.set(section);
                }
            }
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    scrollToSection(sectionId: string) {
        this.closeMenu();
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}
