// Initialize Lucide Icons
lucide.createIcons();

let portfolioData = {};

// Load data immediately since supabase is initialized in config.js
window.onload = async () => {
    try {
        const { data, error } = await supabase
            .from('portfolio_data')
            .select('content')
            .eq('id', 'main')
            .single();

        if (error) throw error;

        portfolioData = data.content || {};
        
        // Populate fields
        populateFields();

    } catch (error) {
        console.error(error);
        alert("Connection failed! Please make sure the table 'portfolio_data' exists in your Supabase project.");
    }
};

function populateFields() {
    if (!portfolioData.profile) return;
    
    document.getElementById('input-name').value = portfolioData.profile.name || '';
    document.getElementById('input-role').value = portfolioData.profile.role || '';
    document.getElementById('input-bio').value = portfolioData.profile.bio || '';
    
    document.getElementById('input-github').value = portfolioData.socials?.github || '';
    document.getElementById('input-linkedin').value = portfolioData.socials?.linkedin || '';
    document.getElementById('input-binance').value = portfolioData.socials?.binance_id || '';
}

function updateDataFromFields() {
    if (!portfolioData.profile) portfolioData.profile = {};
    if (!portfolioData.socials) portfolioData.socials = {};

    portfolioData.profile.name = document.getElementById('input-name').value;
    portfolioData.profile.role = document.getElementById('input-role').value;
    portfolioData.profile.bio = document.getElementById('input-bio').value;

    portfolioData.socials.github = document.getElementById('input-github').value;
    portfolioData.socials.linkedin = document.getElementById('input-linkedin').value;
    portfolioData.socials.binance_id = document.getElementById('input-binance').value;
}

async function saveData() {
    updateDataFromFields();
    
    const toast = document.getElementById('toast');
    toast.className = 'mb-6 p-4 rounded-xl border font-bold text-sm bg-blue-500/10 border-blue-500/30 text-blue-400';
    toast.innerText = 'Saving...';
    toast.classList.remove('hidden');

    try {
        const { error } = await supabase
            .from('portfolio_data')
            .upsert({ id: 'main', content: portfolioData });

        if (error) throw error;

        toast.className = 'mb-6 p-4 rounded-xl border font-bold text-sm bg-green-500/10 border-green-500/30 text-green-400';
        toast.innerHTML = '<i data-lucide="check-circle" class="inline w-4 h-4 mr-2"></i> Saved successfully!';
        lucide.createIcons();
        
        setTimeout(() => toast.classList.add('hidden'), 3000);

    } catch (error) {
        console.error(error);
        toast.className = 'mb-6 p-4 rounded-xl border font-bold text-sm bg-red-500/10 border-red-500/30 text-red-400';
        toast.innerText = 'Error saving data!';
    }
}
