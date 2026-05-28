# Interactive ICS Risk Assessment & Threat Mitigation Hub

**An interactive web application designed to help plant managers and OT engineers quickly assess their Security Level 2 (SL2) compliance, visualise Purdue Model risks, and receive actionable mitigation guidance based on NIST SP 800-82 and IEC 62443.**

**Live Site:** [→ Open Interactive Hub ←](https://jackelinebdm.github.io/ics-interactive-hub/)

![Website Mockup](./images/website-mockup.png)

---

## UX Design – The 5 Planes

### 1. Strategy Plane
**Goal:** Enable non-technical plant managers to quickly evaluate their ICS security posture and make informed SL2 decisions without navigating hundreds of pages of dense standards.

**User Needs:** Fast risk scoring, threat visibility, compliance tracking, and clear recommendations in a secure, easy-to-use interface.

**Organisational Goal:** Support NIS2 compliance and reduce security decision time in critical infrastructure environments.

### 2. Scope Plane
**Included:**
- Real-time JavaScript Risk Score Calculator
- Live searchable/filterable Threat Matrix
- Interactive SL2 Compliance Checklist with progress bar
- localStorage persistence for assessments

**Out of Scope:** Backend/database, user authentication, live OT integration, SL3/SL4 content.

### 3. Structure Plane
Three-page application with consistent Bootstrap 5 navigation:
- **Home** – Risk Assessment Calculator
- **Threats** – Live Threat Matrix
- **Compliance** – SL2 Checklist & Progress Tracking

All data remains client-side for security and portability.

### 4. Skeleton Plane
Intuitive layout with card-based design, clear filters, progress indicators, and immediate feedback on every user action.

### 5. Surface Plane
High-contrast industrial dark theme optimised for plant-floor environments, with large touch targets and professional typography.

---

## Defensive Design Rationale

The entire application is built **100% client-side** using vanilla JavaScript and `localStorage`. No data leaves the user’s browser. This deliberate architectural choice:
- Minimises the attack surface (critical in OT/ICS networks)
- Ensures the tool works offline
- Keeps sensitive facility risk data private and secure

This aligns directly with NIST SP 800-82 and IEC 62443 security principles.

---

## User Stories & MoSCoW Prioritisation

### Must Have

**US1: Risk Assessment Calculator**  
*As a plant manager, I want to complete a quick risk assessment questionnaire so that I can immediately see my current SL2 security posture.*  
**Acceptance Criteria:**  
- Given the user is on the homepage, when they answer all questions, then a real-time risk score with visual gauge is displayed.  
- Given the assessment is complete, when the user submits, then a clear risk level (Low/Medium/High) and tailored recommendations are shown.

**US2: Interactive SL2 Checklist**  
*As a compliance officer, I want to complete a checklist of SL2 controls so that I can track my compliance progress in real time.*  
**Acceptance Criteria:**  
- Given the user is on the compliance page, when they check/uncheck controls, then the progress bar and percentage update instantly.  
- Given the checklist is partially completed, when the user returns later, then their progress is restored from localStorage.

**US3: Fully Responsive Design**  
*As a user, I want the application to be fully responsive so that I can use it on a tablet or laptop in the plant environment.*  
**Acceptance Criteria:** The site must display correctly and remain fully functional on desktop, tablet, and mobile devices.

### Should Have

**US4: Threat Matrix Filtering**  
*As a user, I want to filter the threat matrix by Purdue Model level so that I can focus only on threats relevant to specific zones.*  
**Acceptance Criteria:** Given the user is on the threats page, when they click a Purdue level button, then only matching threats are displayed.

**US5: Keyword Search Functionality**  
*As a user, I want to search threats by keyword so that I can quickly locate specific risks.*  
**Acceptance Criteria:** Given the user is on the threats page, when they type in the search box, then the table updates in real time to show only matching threats.

**US6: Save Assessment**  
*As a user, I want to save my risk assessment locally so that I can return to it later or compare progress over time.*  
**Acceptance Criteria:** Given the user has completed an assessment, when they choose to save it, then it is stored in localStorage and can be reloaded on return.

### Could Have

**US7: Detailed Mitigation Guidance**  
*As a user, I want to click on any threat or checklist item to see detailed plain-language mitigation steps and NIST/IEC references.*  
**Acceptance Criteria:** Given the user clicks on a threat or checklist item, then a modal or expanded section shows full guidance.

**US8: Dark/Light Mode Toggle**  
*As a plant operator working in varying lighting conditions, I want the option to toggle between dark and light modes.*  
**Acceptance Criteria:** Given the user clicks the theme toggle, then the interface switches theme and the preference is saved in localStorage.

**Won't Have:** Backend database, user accounts, live OT integration, SL3/SL4 content.

---

## Technologies Used
- HTML5, CSS3, Bootstrap 5
- Vanilla JavaScript (DOM manipulation, event listeners, localStorage)
- Git & GitHub Pages

---

## Deployment
Deployed as a static site via **GitHub Pages**.  
To run locally: clone the repo and open `index.html`.

---

## Credits & Acknowledgements
- **Standards:** NIST SP 800-82 Rev. 3 & IEC 62443 series
- This interactive application serves as the central artefact for my Open University TM470 project: *Evaluating a User-Centric ICS Security Hub for Supporting Purdue-Model Security Decisions.*
- **Code Institute** – Milestone Project 2 (Interactive Front End Development)

*Academic Disclaimer: This is an evaluative prototype for academic purposes only. Always consult official standards and conduct site-specific risk assessments.*