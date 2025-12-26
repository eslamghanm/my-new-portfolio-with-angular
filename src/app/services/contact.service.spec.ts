import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [ContactService] });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('returns fallback when endpoint not configured', async () => {
    service.contactEndpoint = '';
    const res = await firstValueFrom(service.send({ name: 'A', email: 'a@b.com', message: 'hi' }));
    expect(res.fallback).toBeTruthy();
  });

  it('posts to configured endpoint', async () => {
    service.contactEndpoint = 'https://example.com/form';
    const promise = firstValueFrom(service.send({ name: 'A', email: 'a@b.com', message: 'hi' }));

    const req = httpMock.expectOne('https://example.com/form');
    expect(req.request.method).toBe('POST');
    req.flush({ ok: true });

    const res = await promise;
    expect(res.ok).toBe(true);
  });
});