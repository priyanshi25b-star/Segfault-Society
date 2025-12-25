# Segfault-Society
We break code at the memory level, debug without fear, and turn crashes into clean commits.


# Finance Twin // Logic Core V5
Finance Twin is a high-intelligence "Financial Conscience" designed to stop impulsive spending before it happens. Unlike traditional apps that only track what you’ve already spent, Finance Twin uses AI to analyse your emotional state, environment, and real-time financial data to give you a "Go/No-Go" decision on potential purchases.

🚀 The Problem
Most financial stress comes from impulsive decision-making. Current banking apps are reactive—they tell you how much you lost after the damage is done. We identified a gap: no tool acts as a psychological and mathematical barrier at the point of sale.

🧠 Core Features
Dual-Track AI Analysis: Powered by Gemini 2.5 Flash, the system separates financial math (Can I afford this?) from behavioural psychology (Why am I buying this?).

Context-Aware Guardrails: The AI factor in your Mood (Neutral, Happy, Stressed, Impulsive) and your Location (Home, Mall, Online Store, Social Event) to calculate an "Impulse Score".

Visual Verdict System: A "Cyber-Glass" interface provides instant feedback—APPROVED or DENIED—based on strict financial rules (e.g., denying any non-essential purchase exceeding 50% of your current balance).

Multi-Modal Inputs: Capture products via a live Camera feed, Image uploads, or Manual entry.

Integrated Transaction Log: Automatically tracks every decision, even if you choose to ignore the AI’s advice, providing a long-term "Honesty Log" of your spending habits.

🛠️ Tech Stack
Frontend: HTML5, Tailwind CSS (Custom "Cyber-Glass" UI), FontAwesome.

Intelligence: Google Gemini 2.5 Flash API for vision and decision logic.

State Management: Vanilla JavaScript with LocalStorage for persistent monthly history tracking.

Media: Navigator MediaDevices API for real-time camera integration.

📊 Logic Model
The system operates on a custom logic flow defined in our analyse () function:

Financial Rule A: If Price > Balance, the verdict is strictly DENIED.

Financial Rule B: If Price > 50% of Balance, the verdict is DENIED as an "Overspending Risk".

Psychological Track: The Impulse Score is calculated independently, warning the user of behavioural risks without necessarily blocking the transaction.

👥 The Team
Priyanshi: Problem Ideation & Concept Formation.

Navya Barnwal: Frontend Architecture & UI/UX Design.

Harshit Jalodiya: AI Integration & Prompt Engineering.

Renvat Choudhary: Logic Core Development & State Management.
