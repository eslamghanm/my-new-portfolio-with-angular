import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  contactEndpoint = '';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {
    // Read optional meta tag <meta name="contact-endpoint" content="https://formspree.io/f/yourId">
    if (isPlatformBrowser(this.platformId)) {
      try {
        const meta = document.querySelector('meta[name="contact-endpoint"]') as HTMLMetaElement | null;
        if (meta?.content) this.contactEndpoint = meta.content.trim();
      } catch (err) {
        // ignore
      }
    }
  }

  send(payload: ContactPayload): Observable<any> {
    if (!this.contactEndpoint) {
      // No endpoint configured — signal fallback
      return of({ fallback: true });
    }

    // Support mailto endpoints configured via meta tag
    if (this.contactEndpoint.startsWith('mailto:')) {
      return of({ mailto: this.contactEndpoint });
    }

    return this.http.post(this.contactEndpoint, payload).pipe(
      catchError(err => of({ error: true, details: err }))
    );
  }

  /** Expose the configured endpoint for diagnostics */
  getEndpoint() {
    return this.contactEndpoint;
  }
}
