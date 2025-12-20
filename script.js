function triggerIntervention() {
    const glow = document.getElementById('twin-glow');
    const icon = document.getElementById('twin-icon');
    const title = document.getElementById('status-title');
    const desc = document.getElementById('status-desc');
    const bar = document.getElementById('budget-bar');

    if (title.innerText === "Budget Synced") {
        // High Risk State: Predicting a splurge
        glow.classList.add('risk-high');
        icon.classList.replace('text-green-500', 'text-red-500');
        
        title.innerText = "High Spending Risk";
        title.classList.replace('text-green-400', 'text-red-500');
        
        desc.innerText = "Pattern Detected: You usually spend $50+ at bars on Friday nights. Your Twin suggests setting a $20 'Cash Only' limit tonight.";
        
        bar.classList.replace('bg-green-500', 'bg-red-500');
        bar.style.width = "85%"; // Show budget nearly blown
    } else {
        // Reset to Healthy State
        glow.classList.remove('risk-high');
        icon.classList.replace('text-red-500', 'text-green-500');
        
        title.innerText = "Budget Synced";
        title.classList.replace('text-red-500', 'text-green-400');
        
        desc.innerText = "The twin is currently stable. Your spending patterns are aligned with your 'Savings Goal'.";
        
        bar.classList.replace('bg-red-500', 'bg-green-500');
        bar.style.width = "30%";
    }
}