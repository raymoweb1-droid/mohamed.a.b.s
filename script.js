// Initialize Lucide Icons
lucide.createIcons();

// Copy Email Functionality
function copyEmail() {
    const email = "mohamedait684912@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const defaultView = document.getElementById("copy-default");
        const successView = document.getElementById("copy-success");

        // Hide default, show success
        defaultView.style.opacity = "0";
        defaultView.style.transform = "scale(0.5)";
        
        successView.style.opacity = "1";
        successView.style.transform = "scale(1)";

        // Reset after 2 seconds
        setTimeout(() => {
            defaultView.style.opacity = "1";
            defaultView.style.transform = "scale(1)";
            
            successView.style.opacity = "0";
            successView.style.transform = "scale(0.5)";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
}

// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    // Add visible class to items in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    const items = document.querySelectorAll('.fade-in-item');
    items.forEach(item => {
        observer.observe(item);
    });
});
