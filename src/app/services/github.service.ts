import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export interface GitHubRepo {
  name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  language?: string;
  updated_at: string;
  topics?: string[];
  homepage?: string;
  fork: boolean;
  archived: boolean;
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private cache$?: Observable<GitHubRepo[]>;
  private pinnedCache$?: Observable<GitHubRepo[]>;

  constructor(private http: HttpClient) {}

  getRepos(username: string = 'eslamghanm', per_page: number = 30): Observable<GitHubRepo[]> {
    if (!this.cache$) {
      const url = `https://api.github.com/users/${username}/repos?per_page=${per_page}&sort=updated`;
      this.cache$ = this.http.get<GitHubRepo[]>(url).pipe(
        catchError(() => of([])),
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  getPinnedRepos(username: string = 'eslamghanm'): Observable<GitHubRepo[]> {
    if (!this.pinnedCache$) {
      const url = `https://api.github.com/users/${username}/repos?per_page=50&sort=updated&type=owner`;
      this.pinnedCache$ = this.http.get<GitHubRepo[]>(url).pipe(
        catchError(() => of([])),
        shareReplay(1)
      );
    }
    return this.pinnedCache$;
  }
}
