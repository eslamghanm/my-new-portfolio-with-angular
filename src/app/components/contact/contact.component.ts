import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    private platformId = inject(PLATFORM_ID);

    form!: FormGroup;
    submitting = false;
    successMessage = '';
    errorMessage = '';

    // send mode: 'server' | 'mailto' | 'fallback'
    sendMode: 'server' | 'mailto' | 'fallback' = 'fallback';

    constructor(private fb: FormBuilder, private contactService: ContactService) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(80)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
            message: ['', [Validators.required, Validators.maxLength(2000)]]
        });

        // Determine configured send mode from the ContactService
        const endpoint = this.contactService.getEndpoint();
        this.endpoint = endpoint;

        if (endpoint) {
            if (endpoint.startsWith('mailto:')) {
                this.sendMode = 'mailto';
            } else {
                this.sendMode = 'server';
            }
        } else {
            this.sendMode = 'fallback';
        }
    }

    // Expose current endpoint for template usage
    endpoint = '';


    get name() { return this.form.get('name'); }
    get email() { return this.form.get('email'); }
    get message() { return this.form.get('message'); }

    async onSubmit() {
        this.successMessage = '';
        this.errorMessage = '';

        if (!isPlatformBrowser(this.platformId)) return;

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.submitting = true;

        const payload = this.form.value;

        try {
            const result = await this.contactService.send(payload).toPromise();

            if (result?.mailto) {
                // A mailto endpoint was configured — open it with prefilled content
                const { name, email, message } = payload;
                const subject = `Portfolio Contact from ${name}`;
                const body = `Hello Eslam,%0D%0A%0D%0AI found your portfolio and would like to get in touch.%0D%0A%0D%0AName: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}%0D%0A%0D%0ABest regards,%0D%0A${name}`;
                // If meta tag contains 'mailto:eslam@...' we open it with subject/body
                const base = result.mailto;
                const mailtoLink = `${base}?subject=${encodeURIComponent(subject)}&body=${body}`;
                window.location.href = mailtoLink;
                this.successMessage = 'Opened your email client to send the message.';
            } else if (result?.fallback) {
                // Endpoint not configured at all — fallback to default mailto
                const { name, email, message } = payload;
                const subject = `Portfolio Contact from ${name}`;
                const body = `Hello Eslam,%0D%0A%0D%0AI found your portfolio and would like to get in touch.%0D%0A%0D%0AName: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}%0D%0A%0D%0ABest regards,%0D%0A${name}`;
                const mailtoLink = `mailto:eslamahmedghanem77@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
                window.location.href = mailtoLink;
                this.successMessage = 'No submission endpoint configured — opened your email client as a fallback.';
            } else if (result?.error) {
                this.errorMessage = 'Submission failed — please try again later or copy your message.';
            } else {
                this.successMessage = 'Thank you — your message was submitted successfully.';
                // If Formspree returned a redirect path or we're using server mode, redirect to /thanks
                if (result?.next) {
                    window.location.href = result.next;
                } else if (this.sendMode === 'server') {
                    window.location.href = '/thanks';
                }
            }

            this.form.reset();
        } catch (err) {
            this.errorMessage = 'Submission error — please try again or use the copy fallback.';
        } finally {
            this.submitting = false;

            setTimeout(() => {
                this.successMessage = '';
                this.errorMessage = '';
            }, 7000);
        }
    }

    async copyMessage() {
        if (!isPlatformBrowser(this.platformId)) return;

        const { name, email, message } = this.form.value;
        const content = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(content);
                this.successMessage = 'Message copied to clipboard — you can paste it into your email client.';
                setTimeout(() => (this.successMessage = ''), 4000);
            } else {
                this.errorMessage = 'Clipboard API not available — please copy manually.';
                setTimeout(() => (this.errorMessage = ''), 4000);
            }
        } catch (err) {
            this.errorMessage = 'Failed to copy message to clipboard.';
            setTimeout(() => (this.errorMessage = ''), 4000);
        }
    }

    getSendModeLabel() {
        if (this.sendMode === 'server') return 'Send mode: Server endpoint configured (messages will be sent to the server).';
        if (this.sendMode === 'mailto') return 'Send mode: Mail client — clicking submit will open the visitor\'s email client with prefilled message.';
        return 'Send mode: No endpoint configured — the mail client will open as a fallback.';
    }
}
