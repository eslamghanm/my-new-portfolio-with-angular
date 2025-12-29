import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
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

    @ViewChild('typedRoles') typedRolesElement!: ElementRef;

    typed: any;

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            console.log('HeroComponent: Typed class is:', Typed);
            if (!this.typedRolesElement) return;

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
                typeSpeed: 80,
                backSpeed: 40,
                backDelay: 1500,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                startDelay: 0
            };

            try {
                this.typed = new Typed(this.typedRolesElement.nativeElement, options);
            } catch (error) {
                console.error('Frontend Error: Typed.js failed', error);
            }
        }
    }

    ngOnDestroy() {
        if (this.typed) {
            this.typed.destroy();
        }
    }
}
