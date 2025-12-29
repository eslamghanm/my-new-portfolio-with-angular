import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    
    // Popup modal properties
    showPopup = false;
    popupType: 'success' | 'error' = 'success';
    popupMessage = '';

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(80)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
            message: ['', [Validators.required, Validators.maxLength(2000)]]
        });
    }

    get name() { return this.form.get('name'); }
    get email() { return this.form.get('email'); }
    get message() { return this.form.get('message'); }

    closePopup(): void {
        this.showPopup = false;
        this.popupMessage = '';
        this.popupType = 'success';
    }

    showPopupMessage(type: 'success' | 'error', message: string): void {
        this.popupType = type;
        this.popupMessage = message;
        this.showPopup = true;
    }

    async onSubmit() {
        if (!isPlatformBrowser(this.platformId)) return;

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.submitting = true;
        const formData = this.form.value;

        try {
            const response = await fetch('https://formspree.io/f/xeeqjllk', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                this.showPopupMessage('success', 'Message sent successfully! I will get back to you soon.');
                this.form.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    const errorMessage = data.errors.map((error: any) => error.message).join(', ');
                    this.showPopupMessage('error', errorMessage);
                } else {
                    this.showPopupMessage('error', 'Oops! There was a problem submitting your form.');
                }
            }
        } catch (err) {
            this.showPopupMessage('error', 'Network connection error. Please try again later.');
        } finally {
            this.submitting = false;
        }
    }

    async copyMessage() {
        if (!isPlatformBrowser(this.platformId)) return;

        const { name, email, message } = this.form.value;
        const content = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(content);
                this.showPopupMessage('success', 'Message copied to clipboard — you can paste it into your email client.');
            } else {
                this.showPopupMessage('error', 'Clipboard API not available — please copy manually.');
            }
        } catch (err) {
            this.showPopupMessage('error', 'Failed to copy message to clipboard.');
        }
    }
}
