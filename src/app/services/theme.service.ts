import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private platformId = inject(PLATFORM_ID);

    // Signal for reactive theme state
    isDarkMode = signal(true);

    constructor() {
        // Only access localStorage in the browser
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                this.isDarkMode.set(savedTheme === 'dark');
            }
        }

        // Apply theme on initialization
        effect(() => {
            this.applyTheme(this.isDarkMode());
        });
    }

    toggleTheme() {
        this.isDarkMode.update(isDark => !isDark);
    }

    private applyTheme(isDark: boolean) {
        if (isPlatformBrowser(this.platformId)) {
            const theme = isDark ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }
}
