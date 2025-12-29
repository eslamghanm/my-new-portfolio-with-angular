export function initPortfolioFeatures() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    // Enhanced Reveal Logic
    const setupReveal = () => {
        const revealEls = document.querySelectorAll('.reveal');
        if (!revealEls.length) return;

        // Force reveal matching the app's loading sequence
        const forceVisible = (el: HTMLElement, delay: number = 0) => {
            setTimeout(() => {
                el.classList.add('visible');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, delay);
        };

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        target.classList.add('visible');
                        io.unobserve(target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            revealEls.forEach((el, i) => {
                const target = el as HTMLElement;
                if (!target.classList.contains('visible')) {
                    const delay = Math.min(i * 100, 500);
                    target.style.transitionDelay = `${delay}ms`;
                    io.observe(target);

                    // Safety fallback: show after a reasonable time regardless of scroll
                    forceVisible(target, 2500 + delay);
                }
            });
        } else {
            revealEls.forEach((el, i) => forceVisible(el as HTMLElement, i * 50));
        }
    };

    // Run on load and periodically to catch dynamic content
    setupReveal();
    setTimeout(setupReveal, 500);
    setTimeout(setupReveal, 2000);

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

    // Header shadow & Progress Bar
    const header = document.querySelector('.site-header');
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    if (header) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolledPercentage = (scrollY / height) * 100;
            progressBar.style.width = `${scrolledPercentage}%`;

            if (scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Optimized Parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < 1000) {
                const rate = scrolled * 0.2;
                (hero as HTMLElement).style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }
}
