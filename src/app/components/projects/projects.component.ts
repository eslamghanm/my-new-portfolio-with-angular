import { Component, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsComponent implements OnInit {
  // Static source of truth - No API calls
  projects: any[] = [
    {
      name: 'appointment-booking-system',
      description: 'Zero-Downtime Healthcare Scheduling Platform. Engineered a real-time booking engine with automated SMS/Email reminders and a self-service patient portal.',
      challenge: 'Healthcare providers struggled with manual bookings, leading to a 35% no-show rate and high administrative overhead.',
      result: 'Reduced phone booking volume by 40% and decreased no-shows by 25% within the first 3 months.',
      html_url: 'https://github.com/eslamghanm/appointment-booking-system',
      stargazers_count: 12,
      language: 'PHP',
      topics: ['Laravel', 'Angular', 'MySQL', 'Tailwind', 'REST API'],
      fork: false,
      archived: false,
      featured: true
    },
    {
      name: 'Multi-actors-E-commerce-system-',
      description: 'Scalable Multi-Vendor Marketplace with RBAC. Supporting concurrent users and distinct workflows for Vendors, Admins, and Customers.',
      challenge: 'Client needed a marketplace supporting thousands of concurrent users with sub-millisecond inventory updates and strict secure access controls.',
      result: 'Successfully handled 10k+ concurrent users during stress testing with <200ms latency.',
      html_url: 'https://github.com/eslamghanm/Multi-actors-E-commerce-system-',
      stargazers_count: 8,
      language: 'JavaScript',
      homepage: 'https://storm123.netlify.app/',
      topics: ['Node.js', 'React', 'MongoDB', 'Stripe', 'Redux'],
      fork: false,
      archived: false
    },
    {
      name: 'ghanem-CMS',
      description: 'Clinic management system focused on blazing-fast performance and offline synchronization. Implements PWA standards for reliability in poor network conditions.',
      challenge: 'Clinics needed a lightweight, offline-capable system for patient management.',
      result: 'Created a PWA that ensures data availability 100% of the time, regardless of internet connection.',
      html_url: 'https://github.com/eslamghanm/ghanem-CMS',
      stargazers_count: 5,
      language: 'TypeScript',
      homepage: 'https://gahnem-cms.netlify.app/dashboard',
      topics: ['Angular', 'Firebase', 'PWA', 'RxJS', 'Firestore'],
      fork: false,
      archived: false
    },
    {
      name: 'eventura-event-management-system',
      description: 'Platform with multi-threaded scheduling and custom workflow orchestration. Solved complex calendar collision problems with custom algorithms.',
      challenge: 'Managing overlapping events with shared resources required complex validation logic.',
      result: 'Delivered a conflict-free scheduling engine used for managing multiple concurrent events.',
      html_url: 'https://github.com/eslamghanm/eventura-event-management-system',
      stargazers_count: 10,
      language: 'JavaScript',
      homepage: 'https://eventplannersystem.netlify.app/',
      topics: ['JavaScript', 'API', 'UI/UX', 'Algorithmic Optimization'],
      fork: false,
      archived: false
    },
    {
      name: 'JobPosting',
      description: 'A robust recruitment system with resume parsing and multi-user access control. Optimized database queries for fast search and filtering.',
      challenge: 'Recruiters needed to filter through thousands of applications instantly.',
      result: 'Optimized search queries to return filtered results in under 200ms.',
      html_url: 'https://github.com/eslamghanm/JobPosting',
      stargazers_count: 3,
      language: 'PHP',
      topics: ['PHP', 'MySQL', 'Bootstrap', 'Search Optimization'],
      fork: false,
      archived: false
    }
  ];

  loading = false;
  currentProjectIndex = signal(0);

  ngOnInit() {
    // Component initialized with static local data
  }

  nextProject() {
    this.currentProjectIndex.update(idx => (idx + 1) % this.projects.length);
  }

  prevProject() {
    this.currentProjectIndex.update(idx => (idx - 1 + this.projects.length) % this.projects.length);
  }

  setProject(index: number) {
    if (index >= 0 && index < this.projects.length) {
      this.currentProjectIndex.set(index);
    }
  }

  getProjectImage(repoName: string): string {
    const imageMap: { [key: string]: string } = {
      'appointment-booking-system': 'images/app.jpeg',
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

  trackByProject(index: number, project: any): string {
    return project.name;
  }

  formatProjectName(name: string): string {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}
