import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitHubRepo } from '../../services/github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: GitHubRepo[] = [];
  loading = true;

  constructor() {}

  ngOnInit() {
    this.loadFallbackProjects();
  }

  private loadFallbackProjects() {
    // Static curated projects (display-only)
    this.projects = [
      {
        name: 'appointment-booking-system',
        description: 'ITI Graduation Project — Full‑stack appointment booking system (Laravel backend + Angular frontend). Features: user authentication, calendar scheduling, email notifications, admin dashboard, and REST API.',
        html_url: 'https://github.com/eslamghanm/appointment-booking-system',
        stargazers_count: 0,
        language: 'PHP',
        updated_at: new Date().toISOString(),
        topics: ['Laravel', 'Angular', 'MySQL', 'Auth', 'Scheduling'],
        fork: false,
        archived: false
      },
      {
        name: 'Multi-actors-E-commerce-system-',
        description: 'Enterprise-grade multi-role platform with complex vendor dashboards and secure payments.',
        html_url: 'https://github.com/eslamghanm/Multi-actors-E-commerce-system-',
        stargazers_count: 0,
        language: 'JavaScript',
        updated_at: new Date().toISOString(),
        homepage: 'https://storm123.netlify.app/',
        fork: false,
        archived: false
      },
      {
        name: 'ghanem-CMS',
        description: 'Clinic management system focused on blazing-fast performance and offline synchronization.',
        html_url: 'https://github.com/eslamghanm/ghanem-CMS',
        stargazers_count: 0,
        language: 'TypeScript',
        updated_at: new Date().toISOString(),
        homepage: 'https://gahnem-cms.netlify.app/dashboard',
        fork: false,
        archived: false
      },
      {
        name: 'eventura-event-management-system',
        description: 'Platform with multi-threaded scheduling and custom workflow orchestration.',
        html_url: 'https://github.com/eslamghanm/eventura-event-management-system',
        stargazers_count: 0,
        language: 'JavaScript',
        updated_at: new Date().toISOString(),
        homepage: 'https://eventplannersystem.netlify.app/',
        fork: false,
        archived: false
      },
      {
        name: 'JobPosting',
        description: 'A robust recruitment system with resume parsing and multi-user access control.',
        html_url: 'https://github.com/eslamghanm/JobPosting',
        stargazers_count: 0,
        language: 'PHP',
        updated_at: new Date().toISOString(),
        fork: false,
        archived: false
      }
    ];

    this.loading = false; // show static projects immediately
  }

  getProjectImage(repoName: string): string {
    const imageMap: { [key: string]: string } = {
      'appointment-booking-system': 'images/appointment-booking.jpg',
      'Multi-actors-E-commerce-system-': 'images/e-commerce.jpg',
      'ghanem-CMS': 'images/dental-cms.jpg',
      'eventura-event-management-system': 'images/eventura.jpg',
      'JobPosting': 'images/jop-posting.png'
    };
    return imageMap[repoName] || 'images/final-me.jpg';
  }

  getProjectType(language?: string): string {
    const typeMap: { [key: string]: string } = {
      'TypeScript': 'Angular DX',
      'JavaScript': 'Full Stack',
      'PHP': 'Laravel',
      'Python': 'Django',
      'Java': 'Spring Boot'
    };
    return typeMap[language || ''] || 'Web App';
  }

  getProjectColor(language?: string): string {
    const colorMap: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f7df1e',
      'PHP': '#777bb4',
      'Python': '#3776ab',
      'Java': '#007396'
    };
    return colorMap[language || ''] || '#10b981';
  }

  trackByProject(index: number, project: GitHubRepo): string {
    return project.name;
  }

  formatProjectName(name: string): string {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}
