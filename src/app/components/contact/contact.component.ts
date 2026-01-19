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
        const recipientEmail = 'eslamahmedghanem77@gmail.com';

        try {
            // Method 1: Use EmailJS for direct email sending (recommended)
            // To set up EmailJS:
            // 1. Go to https://www.emailjs.com/ and create a free account
            // 2. Create an email service (Gmail, Outlook, etc.)
            // 3. Create an email template
            // 4. Get your Public Key, Service ID, and Template ID
            // 5. Uncomment and configure the EmailJS code below
            
            // Uncomment this section after setting up EmailJS:
            /*
            const emailjs = (window as any).emailjs;
            if (emailjs) {
                const result = await emailjs.send(
                    'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
                    'YOUR_TEMPLATE_ID',     // Replace with your EmailJS Template ID
                    {
                        to_email: recipientEmail,
                        from_name: formData.name,
                        from_email: formData.email,
                        message: formData.message,
                        reply_to: formData.email
                    },
                    'YOUR_PUBLIC_KEY'       // Replace with your EmailJS Public Key
                );
                
                if (result.status === 200) {
                    this.showPopupMessage('success', 'Message sent successfully! I will get back to you soon.');
                    this.form.reset();
                    return;
                }
            }
            */

            // Method 2: Fallback - Use mailto link (opens email client)
            const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n\n` +
                `Message:\n${formData.message}`
            );
            const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            this.showPopupMessage('success', 
                'Your email client should open with the message pre-filled. ' +
                'Please click send to complete. If it doesn\'t open, use the "Copy Data" button and send manually.'
            );
            
            // Reset form after a delay
            setTimeout(() => {
                this.form.reset();
            }, 2000);

        } catch (err) {
            this.showPopupMessage('error', 'Failed to open email client. Please use the "Copy Data" button and send manually.');
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
