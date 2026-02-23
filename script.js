document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle Visitor Form Submission
    const visitorForm = document.getElementById('visitor-form');
    if (visitorForm) {
        visitorForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form fields by their index or add 'name' attributes to HTML
            const name = visitorForm.querySelector('input[type="text"]').value;
            const email = visitorForm.querySelector('input[type="email"]').value;
            const message = visitorForm.querySelector('textarea').value;

            const submitBtn = visitorForm.querySelector('button');
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://backend-4oii.onrender.com/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });

                const result = await response.json();

                if (result.success) {
                    alert("Thank you! Your inquiry has been sent to Abhinand P. S.");
                    visitorForm.reset();
                } else {
                    alert("Submission failed. Please try again.");
                }
            } catch (error) {
                console.error("Connection Error:", error);
                alert("Server is waking up. Please wait a moment and try again.");
            } finally {
                submitBtn.innerText = "Submit Details";
                submitBtn.disabled = false;
            }
        });
    }

    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });
});
