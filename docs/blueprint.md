# **App Name**: Sarva Simulation Dashboard

## Core Features:

- Civic Simulation Landing Page: The homepage displaying the 'Sarva Civic Simulation' title, subtitle, and an explanation of the platform's purpose as a simulation without real money transactions.
- Virtual Contribution Input & Aggregation: Allows users to submit a virtual monthly contribution (₹10-₹500) along with an optional state/district. The system limits submissions to one per device per month via local storage and calculates the total simulated monthly pool, number of participants, and average contribution. All data stored in Firestore.
- Resource Allocation Simulation Display: Dynamically converts the aggregated virtual funds into simulated public services, displaying the number of schools, teachers, sanitation workers, water hubs, and air research funding possible based on configurable assumptions. This feature could include an AI tool to dynamically suggest allocation strategies based on simulated community needs.
- Simulated District Expansion Map Tool: A tool that visualizes potential growth by dynamically displaying new or expanding districts on a map or table, showing allocated schools and estimated students, as simulated funds increase. An AI tool decides *where* and *how much* resources are simulated to expand based on configured growth logic.
- Transparency and Project Information: Displays vital project metadata including the last website update time, Git commit reference, a link to the public Git repository, the simulation status, duration, and clearly states 'Real money collected: ₹0'.
- Static Information Pages: Dedicated pages to display the full text of the Sarva Constitution and the Sarva Manifesto, providing essential context about the platform's vision.

## Style Guidelines:

- A light color scheme conveying seriousness and clarity. Primary color: Deep, desaturated indigo (#2B3139), offering strong contrast for text on a light background. Background color: A very light, desaturated blue-grey (#F1F3F6), providing a calm and neutral base. Accent color: A muted, thoughtful purple-grey (#746085), to subtly highlight interactive elements without being flashy. This palette maintains a clean, institutional, and minimal aesthetic.
- Main font: 'Inter' (sans-serif), chosen for its modern, objective, and highly legible characteristics suitable for both headlines and body text, maintaining clarity and credibility. For specific technical details like Git commit references, 'Source Code Pro' (monospace) will be used for legibility of code-like strings.
- Minimal and simple vector-based icons that are clearly recognizable and maintain the institutional, neutral aesthetic, avoiding any complex or ornate designs. Focus on clarity and function over artistic flair.
- A clean, spacious, and responsive layout with ample whitespace to enhance readability and maintain a calm user experience. Information will be presented in a clear, structured grid system to ensure focus and easy comprehension of simulation data. Content areas are distinct but not visually heavy.
- Subtle, quick, and purposeful transitions for interface elements or data updates, used sparingly to guide user attention without being distracting or flashy. Animations should feel crisp and reinforce the clarity and responsiveness of the dashboard.