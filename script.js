// Minimal engineering touch: A dynamic fade-in entry for project cards
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error("Lucide library failed to load. Check your file paths.");
    }

    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
        // Prepare initial layout states safely via JS to avoid flashing without JS
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

        // Staggered sequence fade-in
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Handle email obfuscation
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const user = emailLink.getAttribute('data-user');
            const domain = emailLink.getAttribute('data-domain');
            window.location.href = `mailto:${user}@${domain}`;
        });
    }

    // Smart Scroll Hint: Toggle fade indicator based on scroll position
    const scrollFade = document.querySelector('.scroll-fade');
    const updateScrollHint = () => {
        if (!scrollFade) return;
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        // Show fade only if there's significant content below the fold
        const isScrollable = scrollTotal > 100;
        const isNearBottom = window.scrollY >= scrollTotal - 50;
        scrollFade.style.opacity = (isScrollable && !isNearBottom) ? '1' : '0';
    };

    window.addEventListener('scroll', updateScrollHint);
    window.addEventListener('resize', updateScrollHint);
    updateScrollHint(); // Initial check
});
