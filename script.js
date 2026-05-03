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

// Fetch Data from Supabase
async function fetchPortfolioData() {
    try {
        const { data, error } = await supabase
            .from('portfolio_data')
            .select('content')
            .eq('id', 'main')
            .single();

        if (error) throw error;
        if (!data || !data.content) return;

        const content = data.content;

        // Update Profile
        if (content.profile) {
            if (content.profile.name) document.getElementById('profile-name').innerText = content.profile.name;
            if (content.profile.role) document.getElementById('profile-role').innerText = content.profile.role;
            if (content.profile.bio) document.getElementById('profile-bio').innerText = content.profile.bio;
        }

        // Update Socials
        if (content.socials) {
            if (content.socials.github) document.getElementById('link-github').href = content.socials.github;
            if (content.socials.linkedin) document.getElementById('link-linkedin').href = content.socials.linkedin;
            if (content.socials.binance_id) {
                document.getElementById('text-binance').innerHTML = `
                    <i data-lucide="wallet" class="w-4 h-4 text-yellow-500"></i>
                    Binance: ${content.socials.binance_id}
                `;
                lucide.createIcons(); // re-initialize newly added icon
            }
        }
    } catch (error) {
        console.error("Error fetching data from Supabase:", error);
    }
}

// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    // Fetch dynamic data
    fetchPortfolioData();

    // Add visible class to items in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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
