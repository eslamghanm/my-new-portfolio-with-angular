import { Component, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
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
export class HeroComponent implements AfterViewInit {
    private platformId = inject(PLATFORM_ID);
    themeService = inject(ThemeService);

    @ViewChild('typedRoles') typedRolesElement!: ElementRef;

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            const options = {
                strings: [
                    'Eslam Ghanem',
                    'Full-Stack Developer',
                    'Laravel Developer',
                    'PHP Developer',
                    'JavaScript Specialist',
                    'Web Developer',
                    'Frontend Developer',
                    'Backend Developer'
                ],
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 1500,
                loop: true,
                showCursor: false,
                startDelay: 1000
            };

            new Typed(this.typedRolesElement.nativeElement, options);
        }
    }
}
