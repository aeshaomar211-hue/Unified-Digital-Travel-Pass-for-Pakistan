 martSafar 🇵🇰

SmartSafar is a front-end demo web app that imagines a "one digital pass" travel and culture platform for Pakistan — combining route search, hotel discovery, travel passes, maps, an AI-style trip planner, and emergency tools, all wrapped in Pakistani heritage branding with Urdu/English language support.


⚠️ Note: This is a demo project. All data (routes, hotels, plans, alerts) is static/fallback data — there is no backend or live API integration.




✨ Features


Route Finder – Search routes between cities (e.g. Islamabad → Hunza) by Bus, Train, Flight, or Car, with quick-select buttons for popular routes.
Travel Pass Generator – Generate a demo digital pass with passenger name, CNIC/Student ID, route, and pass type (Student, Tourist, Family, Emergency).
Hotel Finder – Search hotels by city and budget (Budget, Mid-range, Premium) with direct links to Google and Booking.
Maps & Directions – Embedded Google Maps preview with options to open full directions or a city map.
AI-Style Trip Planner – Generate a basic plan based on budget, number of days, and trip type (Student, Family, Tourist).
Road & Weather Alerts – A simple alerts section for travel conditions.
Emergency Quick Help – One-tap access to Police, Rescue, Motorway Police, and Tourist Helpline numbers.
Culture & Destination Gallery – Showcases Hunza Valley, Skardu, Lahore Fort, Shalimar Gardens, Truck Art, Sufi Heritage, Handicrafts, and Food Streets.
Urdu / English Toggle – Switch the entire UI language with a single click.



🛠️ Tech Stack


HTML5
CSS3 (style.css)
Vanilla JavaScript (script.js)
Google Maps Embed (iframe)


No frameworks, build tools, or backend required.


📁 Project Structure

SmartSafar/
├── index.html
├── style.css
├── script.js
└── pakistan/
    ├── bus.jpg
    ├── hunza.png
    ├── lahore.jpg
    ├── pakistan_skyline_culture.jpeg
    ├── qr_scan_gate.jpg
    ├── route_map.jpg
    ├── shalimar_gardens.jpg
    └── skardu.jpg


Important: All image paths in index.html are relative to the project root and point inside the pakistan/ folder. Keep this folder structure intact when running or deploying the project.




🚀 Getting Started


Clone or download this repository.
Make sure the pakistan/ image folder, style.css, and script.js are in the same directory as index.html.
Open index.html with Live Server in VS Code (or simply open it in your browser).


bash# Example using Live Server in VS Code
1. Install the "Live Server" extension
2. Right-click index.html → "Open with Live Server"


🌐 Sections Overview

SectionDescriptionRoutesFind cheapest/fastest paths between citiesPassesGenerate a printable/demo travel passHotelsBrowse hotel options with external booking linksMapsPreview destinations and open directionsPlannerGet a basic trip plan based on budget & daysAlerts & EmergencyTravel alerts and emergency contact numbers


📌 Disclaimer

This project is built for demonstration purposes only. Phone numbers, prices, routes, and hotel links are placeholder/fallback data and should be verified independently before relying on them for real travel.
