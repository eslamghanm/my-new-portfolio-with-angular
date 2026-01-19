export function initPortfolioFeatures() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    // Enhanced Reveal Logic - Make content visible immediately
    const setupReveal = () => {
        const revealEls = document.querySelectorAll('.reveal');
        if (!revealEls.length) return;

        // Immediately make all elements visible
        revealEls.forEach((el) => {
            const target = el as HTMLElement;
            target.classList.add('visible');
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            target.style.visibility = 'visible';
        });

        // Optional: Add scroll-triggered animations if IntersectionObserver is available
        if ('IntersectionObserver' in window) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (!prefersReducedMotion) {
                // Reset for animation
                revealEls.forEach((el) => {
                    const target = el as HTMLElement;
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(30px)';
                });

                const io = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const target = entry.target as HTMLElement;
                            target.classList.add('visible');
                            target.style.opacity = '1';
                            target.style.transform = 'translateY(0)';
                            io.unobserve(target);
                        }
                    });
                }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

                revealEls.forEach((el) => {
                    io.observe(el);
                });
            }
        }
    };

    // Run immediately and after a short delay
    setupReveal();
    setTimeout(setupReveal, 100);

    // Global fallback to reveal everything if something goes wrong
    (window as any).revealAllElements = () => {
        document.querySelectorAll('.reveal').forEach(el => (el as HTMLElement).classList.add('visible'));
    };

    // Smooth scroll
    document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href^="#"]');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Header shadow (progress bar is handled in app.ts)
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Optimized Parallax - Respect reduced motion
    const hero = document.querySelector('.hero');
    if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            try {
                const scrolled = window.pageYOffset;
                if (scrolled < 1000) {
                    const rate = scrolled * 0.2;
                    (hero as HTMLElement).style.transform = `translateY(${rate}px)`;
                }
            } catch (error) {
                // Silently handle parallax errors
            }
        }, { passive: true });
    }
}
