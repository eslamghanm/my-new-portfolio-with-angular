import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    isMenuOpen = false;
    themeService = inject(ThemeService);

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}
