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
});
