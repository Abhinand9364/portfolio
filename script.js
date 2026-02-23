document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle Professional Form Submission
    const visitorForm = document.getElementById('visitor-form');
    if (visitorForm) {
        visitorForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = visitorForm.querySelector('button');
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const formData = {
                name: visitorForm.name.value,
                email: visitorForm.email.value,
                message: visitorForm.message.value
            };

            try {
                // Ensure this URL matches your Render Dashboard exactly
                const response = await fetch('https://backend-4oii.onrender.com/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert("Thank you! Abhinand P. S has received your professional inquiry.");
                    visitorForm.reset();
                } else {
                    alert("Submission failed. Check backend logs.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Server is waking up. Please try again in 30 seconds.");
            } finally {
                submitBtn.innerText = "Submit Details";
                submitBtn.disabled = false;
            }
        });
    }

    // Scroll Reveal Animation
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
