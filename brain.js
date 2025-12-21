/* FINANCE TWIN - UNIVERSAL FIX */

// 1. LEADER'S SIMULATION (Context & Visuals)
let context = { mood: 'happy', location: 'home', budget: 300 };

function updateContext(key, value, element = null) {
    context[key] = value;
    if (key === 'mood' && element) {
        document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('border-blue-500', 'bg-blue-900/10'));
        element.classList.add('border-blue-500', 'bg-blue-900/10');
    }
    if (key === 'budget') {
        const display = document.getElementById('budget-display');
        if(display) display.innerText = `Remaining Budget: ₹${parseFloat(value).toFixed(2)}`;
    }
    runSync();
}

function runSync() {
    const glow = document.getElementById('twin-glow');
    const core = document.getElementById('twin-core');
    const icon = document.getElementById('twin-icon');
    const label = document.getElementById('risk-label');
    const msg = document.getElementById('prediction-msg');
    
    // Safety check - if elements don't exist yet, stop
    if(!glow || !core || !icon) return;

    let riskScore = 5; 
    if (context.mood === 'stressed') riskScore += 45;
    if (context.mood === 'bored') riskScore += 25;
    if (context.location === 'mall') riskScore += 30;
    if (context.location === 'online') riskScore += 20;

    // Reset basics
    glow.className = "absolute w-48 h-48 rounded-full transition-all duration-700";
    
    if (riskScore >= 70) {
        glow.classList.add('pulse-risk');
        core.style.borderColor = "#ef4444";
        icon.className = "fa-solid fa-triangle-exclamation text-4xl text-red-500";
        label.innerText = "CRITICAL RISK";
        label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-red-500";
    } else if (riskScore >= 35) {
        glow.classList.add('pulse-warning');
        core.style.borderColor = "#f59e0b";
        icon.className = "fa-solid fa-circle-exclamation text-4xl text-amber-500";
        label.innerText = "RISK WARNING";
        label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-amber-500";
    } else {
        glow.classList.add('pulse-stable', 'bg-blue-500', 'blur-[70px]', 'opacity-10');
        core.style.borderColor = "rgba(59, 130, 246, 0.5)";
        icon.className = "fa-solid fa-fingerprint text-4xl text-blue-400";
        label.innerText = "MODEL STABLE";
        label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-blue-400";
    }
}

// 2. THE AI BRAIN (Universal Connector)
async function interceptImpulse() {
    const fileInput = document.getElementById('imageInput');
    const label = document.getElementById('risk-label');
    const msg = document.getElementById('prediction-msg');
    const alertBox = document.getElementById('intervention-alert');

    // 1. Get Key
    const API_KEY = document.getElementById('apiKeyInput').value.trim();
    if (!API_KEY) { alert("⚠️ Please paste your API Key first!"); return; }

    // 2. Check Image
    if (!fileInput.files.length) { alert("⚠️ Upload an image!"); return; }

    // 3. UI Loading
    label.innerText = "SEARCHING...";
    label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 animate-pulse";
    msg.innerText = "Contacting Gemini Cloud...";

    try {
        const file = fileInput.files[0];
        const base64Data = await convertToBase64(file);
        
        // --- THE FIX: Try 3 Models ---
        const models = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-pro-vision"];
        let result = null;
        let lastError = "";

        for (const model of models) {
            try {
                console.log(`Attempting connection to: ${model}`);
                result = await callGeminiAPI(model, API_KEY, base64Data, file.type, context.budget);
                if (result) break; // It worked! Stop looping.
            } catch (e) {
                console.warn(`${model} failed: ${e.message}`);
                lastError = e.message;
            }
        }

        if (!result) throw new Error("All models failed. " + lastError);

        // 4. Success! Update UI
        updateUI(result);

    } catch (error) {
        console.error(error);
        label.innerText = "ERROR";
        msg.innerText = error.message;
        alert("AI Error: " + error.message);
    }
}

// Helper: Call API
async function callGeminiAPI(modelName, apiKey, base64Data, mimeType, currentBudget) {
    const prompt = `
    Role: Financial Guardian. User Budget: ₹${currentBudget}.
    Task: Identify item. Estimate Price (Rupees).
    Logic: If Price > ${currentBudget}, verdict DENIED. Else APPROVED.
    Output JSON: { "product_name": "str", "estimated_price": int, "verdict": "APPROVED" or "DENIED", "roast": "str" }
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: base64Data } }] }]
        })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    let text = data.candidates[0].content.parts[0].text;
    text = text.replace(/```json|```/g, '').trim();
    return JSON.parse(text);
}

// Helper: Update UI
function updateUI(result) {
    const glow = document.getElementById('twin-glow');
    const core = document.getElementById('twin-core');
    const icon = document.getElementById('twin-icon');
    const label = document.getElementById('risk-label');
    const msg = document.getElementById('prediction-msg');
    const rate = document.getElementById('fail-rate');
    const spend = document.getElementById('predicted-spend');

    if (result.verdict === "DENIED") {
        glow.className = "absolute w-48 h-48 rounded-full pulse-risk";
        core.style.borderColor = "#ef4444";
        icon.className = "fa-solid fa-ban text-4xl text-red-500";
        label.innerText = "BLOCKED";
        label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-red-500";
        rate.innerText = "100%";
        rate.className = "text-4xl font-bold text-red-500";
    } else {
        glow.className = "absolute w-48 h-48 rounded-full pulse-stable bg-blue-500 blur-[70px] opacity-10";
        core.style.borderColor = "#10b981";
        icon.className = "fa-solid fa-check text-4xl text-emerald-500";
        label.innerText = "APPROVED";
        label.className = "text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500";
        rate.innerText = "0%";
        rate.className = "text-4xl font-bold text-emerald-500";
    }
    
    msg.innerHTML = `<b style="color:white">${result.product_name}</b> (₹${result.estimated_price})<br><i>"${result.roast}"</i>`;
    spend.innerText = `₹${result.estimated_price}`;
}

function convertToBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });
}

// Initialize on Load
window.onload = runSync;