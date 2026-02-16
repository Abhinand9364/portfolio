document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // 2. Select all cards and sections to reveal
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 3. Smooth Dynamic Typing for Console (A nice easter egg for devs)
    console.log("%c Portfolio Status: Live | Abhinand P. S ", "background: #6366f1; color: white; padding: 5px; border-radius: 5px;");

    // 4. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});