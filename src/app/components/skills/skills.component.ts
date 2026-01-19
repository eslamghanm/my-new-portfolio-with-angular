import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
    name: string;
    icon: string;
    color: string;
    bgColor: string;
}

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
    skills: Skill[] = [
        { name: 'Angular', icon: 'fab fa-angular', color: '#dd0031', bgColor: 'rgba(221, 0, 49, 0.1)' },
        { name: 'Laravel', icon: 'fab fa-laravel', color: '#ff2d20', bgColor: 'rgba(255, 45, 32, 0.1)' },
        { name: 'TypeScript', icon: 'fab fa-js', color: '#3178c6', bgColor: 'rgba(49, 120, 198, 0.1)' },
        { name: 'JavaScript', icon: 'fab fa-js-square', color: '#f7df1e', bgColor: 'rgba(247, 223, 30, 0.1)' },
        { name: 'React', icon: 'fab fa-react', color: '#61dafb', bgColor: 'rgba(97, 218, 251, 0.1)' },
        { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933', bgColor: 'rgba(51, 153, 51, 0.1)' },
        { name: 'PHP', icon: 'fab fa-php', color: '#777bb4', bgColor: 'rgba(119, 123, 180, 0.1)' },
        { name: 'MySQL', icon: 'fas fa-database', color: '#00758f', bgColor: 'rgba(0, 117, 143, 0.1)' },
        { name: 'MongoDB', icon: 'fas fa-database', color: '#47a248', bgColor: 'rgba(71, 162, 72, 0.1)' },
        { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
        { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed', bgColor: 'rgba(36, 150, 237, 0.1)' },
        { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032', bgColor: 'rgba(240, 80, 50, 0.1)' },
        { name: 'Firebase', icon: 'fab fa-firebase', color: '#ffca28', bgColor: 'rgba(255, 202, 40, 0.1)' },
        { name: 'REST APIs', icon: 'fas fa-code', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' },
        { name: 'RxJS', icon: 'fas fa-stream', color: '#e01e5a', bgColor: 'rgba(224, 30, 90, 0.1)' }
    ];

    getSkills(): Skill[] {
        return [...this.skills, ...this.skills]; // Duplicate for seamless loop
    }
}
