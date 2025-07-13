Welcome to the official repository for PantherVenue, a full-stack web application designed to be the digital hub for a 3,500-seat school arena. This project was developed for the FBLA Website Design event and was a **2024 National Finalist (7th Place)**.

The mission was simple: turn paper chaos into digital clarity.

---

## Key Features

This website is pretty cool, here's a Github copilot summary of its features:

### 👤 For the User

*   **Full Event Calendar:** Browse and filter upcoming events.
*   **Custom Box Office:** Securely purchase tickets for any event.
*   **Personalized Dashboard:** After logging in, users can track their purchase history, view the status of their venue rental requests, and download their tickets.
*   **Dynamic QR Code Tickets:** Download a unique, generated ticket for easy event check-in.

### 🔐 For the Admin

*   **Secure Admin Dashboard:** A private backend to manage the entire venue.
*   **Request Management:** View, approve, or decline all venue rental requests submitted by users.
*   **Site Analytics:** Monitor Key Performance Indicators (KPIs) and track site data with Chart.js.
*   **Auto-Publishing:** Approving a request automatically adds the new event to the public database.

---

## Technology Deep Dive

This project was intentionally built with foundational technologies to demonstrate deep engineering skill.

*   **Frontend:** Vanilla HTML, CSS, and JavaScript.
    *   **Styling:** A mix of Bootstrap 5 for layout, Tailwind CSS for utility classes, and custom stylesheets for branding.
    *   **Animations:** Powered by custom CSS `@keyframes`, Intersection Observers, and a little help from WOW.js.
*   **Backend:** Google Firebase
    *   **Authentication:** Manages all user sign-ups and logins securely.
    *   **Firestore:** A NoSQL database that handles all event, user, and request data in real-time.
*   **APIs & Libraries:**
    *   **360° Tour:** Panolens.js
    *   **AI Chatbot:** Hack Club AI (Meta Llama 4)
    *   **Charts:** Chart.js
    *   **QR Code Generation:** qrcode.js + html2canvas

---

Thanks for checking it out! Enjoy!

- Anvay
