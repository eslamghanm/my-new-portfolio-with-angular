import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    // Showing a static repo count to avoid listing repos in the About section
    repoCount = 30;

    // Theme service to switch portrait by theme
    themeService = inject(ThemeService);
}
