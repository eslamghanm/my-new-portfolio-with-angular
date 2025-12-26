import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('should use fallback mailto when endpoint not configured', async () => {
    component.form.setValue({ name: 'Test', email: 'test@example.com', message: 'Hello' });
    expect(component.form.valid).toBeTruthy();

    // Spy on window.location to prevent navigation
    const original = (window as any).location;
    (window as any).location = { href: '' };

    // Ensure contact service has no endpoint
    component['contactService'].contactEndpoint = '';

    await component.onSubmit();

    expect(component.successMessage).toContain('No submission endpoint configured');
    expect(component.form.value.name).toBeNull(); // form.reset() clears value to null

    // Restore
    (window as any).location = original;
  });

  it('copyMessage should write to clipboard when available', async () => {
    const writeSpy = vi.fn(async () => {});
    (navigator as any).clipboard = { writeText: writeSpy };

    component.form.setValue({ name: 'A', email: 'a@b.com', message: 'hi' });
    await component.copyMessage();

    expect(writeSpy).toHaveBeenCalled();
  });
});