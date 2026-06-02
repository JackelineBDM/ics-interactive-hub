# ICS Interactive Risk Assessment & Threat Mitigation Hub

**Live Site:** [https://JackelineBDM.github.io/ics-interactive-hub/](https://JackelineBDM.github.io/ics-interactive-hub/)

A dynamic, interactive frontend web application designed to help plant managers and OT security professionals assess their Industrial Control Systems (ICS) security posture using the **Purdue Model**, **NIST SP 800-82**, and **IEC 62443** standards.

---

## Project Purpose & Value

**For the User (Plant Manager / OT Engineer):** Quickly evaluate their facility’s Security Level 2 (SL2) readiness, identify critical threats, and receive actionable recommendations without needing deep technical knowledge.

**For the Site Owner (Academic + Professional Portfolio):** Demonstrate strong interactive frontend development skills while continuing the real-world TM470 research project: *"Evaluating a User-Centric ICS Security Hub for Supporting Purdue-Model Security Decisions."*

---

## UX Design – The 5 Planes

* **Strategy:** Help non-technical plant managers make informed ICS security decisions.
* **Scope:** Three interactive pages – Risk Calculator, Live Threat Matrix, and SL2 Compliance Checklist.
* **Structure:** Clean Bootstrap navbar + card-based layout with consistent navigation.
* **Skeleton:** Responsive grid design with clear visual hierarchy and intuitive interaction points.
* **Surface:** Professional industrial dark theme with high-visibility safety yellow accents and excellent contrast.

---

## User Stories (8)

| # | User Story | Acceptance Criteria |
|---|------------|---------------------|
| 1 | As a plant manager, I want to answer a Purdue Model questionnaire so I can get an instant risk score. | Radio buttons, validation alert, dynamic percentage + recommendation displayed. |
| 2 | As a user, I want to search and filter threats by Purdue Level. | Real-time search + clickable filter buttons that highlight active state. |
| 3 | As a compliance officer, I want to tick controls and see live progress. | Checkboxes with progress bar that updates in real time. |
| 4 | As a user, I want my checklist progress saved. | `localStorage` persistence across page refreshes. |
| 5 | As a cautious user, I want confirmation before resetting data. | `confirm()` dialog + success alert on reset. |
| 6 | As a user, I want clear feedback when no results match my search. | Empty state message displayed. |
| 7 | As a returning user, I want to save my risk assessment. | "Save Assessment" button with confirmation. |
| 8 | As a visitor, I want responsive design on mobile. | Fully tested on different screen sizes using Bootstrap. |

---

## Features & Interactivity

* **Risk Calculator** – 8 weighted questions, real score calculation, input validation, dynamic results panel.
* **Live Threat Matrix** – Search bar + Purdue Level filter buttons with active states.
* **SL2 Compliance Checklist** – 8 controls, live progress bar, `localStorage` persistence, reset with confirmation.
* **Defensive Design** – All user actions provide clear feedback forms and verification alerts.

---

## Technologies Used

* **HTML5** – Semantic markup
* **CSS3** – Custom industrial dark theme with high contrast
* **Bootstrap 5** – Responsive grid and components (via CDN)
* **Vanilla JavaScript** – All interactivity in a single external `script.js`
* **localStorage** – Data persistence
* **Git & GitHub Pages** – Version control and deployment

---

## Testing

**Manual Testing Summary**

| Test Type | Result | Evidence |
|-----------|--------|---------|
| Functionality | All buttons and interactions work | Documented testing scenarios |
| Responsiveness | Excellent on mobile, tablet & desktop | Browser DevTools + real devices |
| Browser Compatibility | Chrome, Safari, Firefox | Tested |
| User Stories | All 8 completed successfully | Documented above |
| Validators | W3C HTML + CSS passed | Checked |

**Notable Bugs Fixed**
* Text visibility on dark background → Fixed with targeted CSS custom properties.
* Calculate button not responding → Fixed with proper element target event listeners.
* Checklist reset not working → Fixed with `confirm()` triggers + `localStorage` memory clearance.

---

## Deployment

The site is deployed using **GitHub Pages**.

**To run locally:**
1. Clone the repository
2. Open `index.html` with Live Server (VS Code) or directly in browser
3. All assets are located cleanly in the `assets/` folder

---

## Credits & Attribution

* Bootstrap 5 framework loaded via CDN.
* All custom JavaScript, HTML layouts, and CSS styles written by Jackeline Brooks Marcano.
* Functional logic and domain knowledge informed by NIST SP 800-82 and IEC 62443 engineering standards.

---

**This project was developed as Milestone Project 2 for the Code Institute L5 Diploma in Web Application Development and forms part of the ongoing TM470 project at The Open University.**