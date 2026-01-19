import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
    name: string;
    icon: string;
    color: string;
    bgColor: string;
    description?: string; // Added optional description
}

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
    // Spotlight Skills (The "Big 4")
    coreSkills: Skill[] = [
        {
            name: 'Angular',
            icon: 'fab fa-angular',
            color: '#dd0031',
            bgColor: 'rgba(221, 0, 49, 0.1)',
            description: 'Enterprise-scale Single Page Applications'
        },
        {
            name: 'Laravel',
            icon: 'fab fa-laravel',
            color: '#ff2d20',
            bgColor: 'rgba(255, 45, 32, 0.1)',
            description: 'Robust & Secure Backend APIs'
        },
        {
            name: 'TypeScript',
            icon: 'fab fa-js',
            color: '#3178c6',
            bgColor: 'rgba(49, 120, 198, 0.1)',
            description: 'Type-safe scalable codebases'
        },
        {
            name: 'Tailwind',
            icon: 'fas fa-wind',
            color: '#06b6d4',
            bgColor: 'rgba(6, 182, 212, 0.1)',
            description: 'Modern, utility-first styling'
        }
    ];

    // Helper method to track items (optional but good practice)
    trackByName(index: number, item: Skill): string {
        return item.name;
    }
}
