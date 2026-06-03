// Minimal engineering touch: A dynamic fade-in entry for project cards
document.addEventListener('DOMContentLoaded', () => {

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

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const scrollTotal = scrollHeight - clientHeight;

        // Show fade only if there's significant content below the fold
        const isScrollable = scrollTotal > 20;
        const isNearBottom = scrollTop >= scrollTotal - 20;
        scrollFade.style.opacity = (isScrollable && !isNearBottom) ? '1' : '0';
    };

    ['scroll', 'resize', 'load'].forEach(evt => window.addEventListener(evt, updateScrollHint));
    updateScrollHint(); // Initial check
});
