// script.js

// Global State
let context = {
    mood: 'happy',
    location: 'home',
    budget: 300
};

function updateContext(key, value, element = null) {
    context[key] = value;
    
    if (key === 'mood' && element) {
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('border-blue-500', 'bg-blue-900/10');
        });
        element.classList.add('border-blue-500', 'bg-blue-900/10');
    }
    
    if (key === 'budget') {
        document.getElementById('budget-display').innerText = `Remaining Budget: $${parseFloat(value).toFixed(2)}`;
    }
}

function runSync() {
    const glow = document.getElementById('twin-glow');
    const core = document.getElementById('twin-core');
    const icon = document.getElementById('twin-icon');
    const label = document.getElementById('risk-label');
    const msg = document.getElementById('prediction-msg');
    const rate = document.getElementById('fail-rate');
    const spend = document.getElementById('predicted-spend');
    const alertBox = document.getElementById('intervention-alert');
    const suggestionText = document.getElementById('suggestion-text');

    // 1. Calculate Risk Score (0-100)
    let riskScore = 5; // Base risk
    if (context.mood === 'stressed') riskScore += 45;
    if (context.mood === 'bored') riskScore += 25;
    if (context.location === 'mall') riskScore += 30;
    if (context.location === 'online') riskScore += 20;
    if (context.budget < 100) riskScore += 15;

    // 2. Map Score to UI State
    glow.className = "absolute w-48 h-48 rounded-full transition-all duration-700";
    alertBox.classList.add('hidden');

    if (riskScore >= 70) {
        // CRITICAL RISK
        glow.classList.add('pulse-risk');
        core.style.borderColor = "#ef4444";
        icon.className = "w-12 h-12 text-red-500";
        label.innerText = "CRITICAL RISK";
        label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-red-500";
        msg.innerText = "Twin detected high Emotional + Environmental risk. $80.00 splurge predicted within the next hour.";
        rate.innerText = riskScore + "%";
        rate.className = "text-4xl font-bold text-red-500";
        spend.innerText = "$84.50";
        spend.className = "text-4xl font-bold text-red-500";
        
        alertBox.classList.remove('hidden');
        suggestionText.innerText = "Intervention: Lock 'Shopping' category and transfer $60 to your Savings Vault immediately.";
    } 
    else if (riskScore >= 35) {
        // WARNING STATE
        glow.classList.add('pulse-warning');
        core.style.borderColor = "#f59e0b";
        icon.className = "w-12 h-12 text-amber-500";
        label.innerText = "RISK WARNING";
        label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-amber-500";
        msg.innerText = "Model is fluctuating. Proximity to spending triggers detected. Predicted splurge: $25.00.";
        rate.innerText = riskScore + "%";
        rate.className = "text-4xl font-bold text-amber-500";
        spend.innerText = "$22.00";
        spend.className = "text-4xl font-bold text-amber-500";
    } 
    else {
        // STABLE STATE
        glow.classList.add('pulse-stable', 'bg-blue-500', 'blur-[70px]', 'opacity-10');
        core.style.borderColor = "rgba(59, 130, 246, 0.5)";
        icon.className = "w-12 h-12 text-blue-400";
        label.innerText = "MODEL STABLE";
        label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-blue-400";
        msg.innerText = "Reality Synced. Your current context and mood are perfectly aligned with your savings goal.";
        rate.innerText = riskScore + "%";
        rate.className = "text-4xl font-bold text-emerald-500";
        spend.innerText = "$0.00";
        spend.className = "text-4xl font-bold text-emerald-500";
    }
}