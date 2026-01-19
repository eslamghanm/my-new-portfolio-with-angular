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

        try {
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        const offsetTop = rect.top + window.scrollY;
                        const height = rect.height;

                        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                            this.activeSection.set(section);
                            break; // Exit early once we find the active section
                        }
                    }
                }
            });
        } catch (error) {
            // Silently handle section detection errors
        }
    }

    toggleMenu() {
        if (!isPlatformBrowser(this.platformId)) return;
        this.isMenuOpen = !this.isMenuOpen;
        
        // Prevent body scroll when menu is open
        if (this.isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMenu() {
        if (!isPlatformBrowser(this.platformId)) return;
        this.isMenuOpen = false;
        document.body.style.overflow = '';
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    scrollToSection(sectionId: string) {
        if (!isPlatformBrowser(this.platformId)) return;
        
        this.closeMenu();
        try {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            // Fallback to anchor link if smooth scroll fails
            window.location.hash = sectionId;
        }
    }
}
