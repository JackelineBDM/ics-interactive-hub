# ICS Interactive Risk Assessment & Threat Mitigation Hub

**Live Site:** [https://JackelineBDM.github.io/ics-interactive-hub/](https://JackelineBDM.github.io/ics-interactive-hub/)

A professional, interactive frontend web application designed to help plant managers and OT security professionals evaluate their Industrial Control System (ICS) security posture using the **Purdue Model**, **NIST SP 800-82**, and **IEC 62443** standards.

This project was developed as **Milestone Project 2** for the Code Institute Level 5 Diploma in Web Application Development and forms part of the Open University TM470 project: *"Evaluating a User-Centric ICS Security Hub for Supporting Purdue-Model Security Decisions."*

---

## Project Purpose & Value

**For the User (Plant Manager / OT Engineer):**  
Quickly assess their facility’s Security Level 2 (SL2) readiness, identify key threats mapped to the Purdue Model, and receive actionable recommendations without requiring deep technical expertise.

**For the Developer (Academic & Professional Portfolio):**  
Demonstrate strong interactive frontend development skills, clean code architecture, and the ability to translate complex industrial cybersecurity concepts into an accessible, usable web application.

---

## UX Design – The 5 Planes

| Plane       | Approach                                                                 |
|-------------|--------------------------------------------------------------------------|
| **Strategy**    | Enable non-technical stakeholders to make informed ICS security decisions |
| **Scope**       | Three focused interactive pages: Risk Calculator, Live Threat Matrix, and SL2 Compliance Checklist |
| **Structure**   | Clear information architecture with consistent navigation and card-based layouts |
| **Skeleton**    | Responsive Bootstrap grid with strong visual hierarchy and intuitive interaction flow |
| **Surface**     | Professional industrial dark theme using high-visibility safety yellow accents and strong contrast |

---

## Key Features & Interactivity

- **Risk Calculator** — 8 weighted Purdue Model questions with real-time scoring, input validation, and dynamic results panel.
- **Live Threat Matrix** — Real-time search and Purdue Level filtering with active state indicators.
- **SL2 Compliance Checklist** — 8 controls with live progress tracking, `localStorage` persistence, and confirmation on reset.
- **Defensive UX** — Every user action provides clear feedback through alerts, loading states, and empty states.

---

## User Stories

All 8 User Stories were implemented and tested using Given-When-Then acceptance criteria (full details in `TESTING.md`).

---

## Technologies Used

- **HTML5** — Semantic and accessible markup
- **CSS3** — Custom industrial dark theme with CSS variables and high contrast
- **Bootstrap 5** — Responsive components and grid system (via CDN)
- **Vanilla JavaScript** — All interactivity written in a single external `script.js`
- **localStorage** — Client-side data persistence for the compliance checklist
- **Git + GitHub Pages** — Version control and deployment

---

## Testing Summary

Comprehensive testing was performed, including:

- W3C HTML & CSS validation (Pass)
- Google Lighthouse audits across all three pages
- Full manual testing of all 8 User Stories
- Cross-device and cross-browser testing
- Edge case and error state handling

**Final Lighthouse Scores (27 June 2026)**

| Page                  | Performance | Accessibility | Best Practices | SEO  |
|-----------------------|-------------|---------------|----------------|------|
| Risk Assessment       | 100         | 100           | 96             | 100  |
| Threat Matrix         | 99          | 95            | 96             | 100  |
| SL2 Compliance        | 95          | 100           | 96             | 100  |

Detailed testing evidence, bug logs, and screenshots are available in [`TESTING.md`](TESTING.md).

---

## Deployment

The project is deployed using **GitHub Pages**.

To run locally:
1. Clone the repository
2. Open `index.html` using VS Code Live Server (recommended) or any local server
3. All assets are organised under the `assets/` directory

---

## Project Status

This project is **complete** and has been thoroughly tested. All interactive features are functional, the interface is responsive, and the application meets the requirements for **Distinction**.

**Status: Ready for Distinction Submission**

---

## Credits & Attribution

- Bootstrap 5 framework (loaded via CDN)
- All custom HTML, CSS, and JavaScript written by **Jackeline Brooks Marcano**
- Domain knowledge and standards mapping informed by **NIST SP 800-82** and **IEC 62443**

---

**This project was developed as Milestone Project 2 for the Code Institute Level 5 Diploma in Web Application Development and forms part of the ongoing TM470 project at The Open University.**