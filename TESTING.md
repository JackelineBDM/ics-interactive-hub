# ICS Interactive Risk Assessment & Threat Mitigation Hub - Testing Report

**Live Site:** [https://JackelineBDM.github.io/ics-interactive-hub/](https://JackelineBDM.github.io/ics-interactive-hub/)

**Author:** Jackeline Brooks Marcano  
**Student ID:** E3413858  
**Project Type:** Milestone Project 2 – Interactive Frontend Development  
**Submission Goal:** Distinction

---

## 1. Introduction

This document provides a comprehensive record of the testing performed on the **Interactive ICS Risk Assessment & Threat Mitigation Hub**. The application is a three-page interactive tool designed to help plant managers and OT professionals evaluate Industrial Control System security using the Purdue Model, NIST SP 800-82, and IEC 62443 standards.

The objective of testing was to verify functionality, usability, responsiveness, accessibility, performance, and overall code quality.

---

## 2. Testing Methodology

Testing was conducted in two phases:

- **Automated Testing**: W3C validators, Google Lighthouse audits, and browser console analysis.
- **Manual Testing**: Systematic testing of all 8 User Stories using Given-When-Then criteria, edge cases, error handling, and cross-device/browser verification.

All testing was performed on both the local development environment and the live GitHub Pages site.

---

## 3. Automated Testing Results

### 3.1 Code Validation

| Tool                    | Result     | Notes                                      |
|-------------------------|------------|--------------------------------------------|
| W3C HTML Validator      | **Pass**   | No errors or warnings                      |
| W3C CSS Validator       | **Pass**   | No errors                                  |
| Browser Console         | **Clean**  | No JavaScript errors on any page           |

### 3.2 Google Lighthouse Audit (Final Results – 27 June 2026)

| Page                  | Performance | Accessibility | Best Practices | SEO  | CLS     | Status      |
|-----------------------|-------------|---------------|----------------|------|---------|-------------|
| **index.html**        | **100**     | **100**       | 96             | 100  | 0.028   | Excellent   |
| **threats.html**      | **99**      | 95            | 96             | 100  | 0.003   | Very Good   |
| **compliance.html**   | **95**      | **100**       | 96             | 100  | 0.139   | Very Good   |

**Performance Reflection**  
High Performance scores were achieved after implementing targeted CLS mitigation strategies (reserving vertical space for dynamic content). Minor deductions in Best Practices are due to the lack of security headers, which is a known limitation of static deployments on GitHub Pages.

---

## 4. Manual Testing – User Stories

All 8 User Stories were tested using **Given-When-Then** acceptance criteria. All passed.

| #  | User Story                                                                 | Test Steps                                              | Expected Result                              | Actual Result                          | Status |
|----|----------------------------------------------------------------------------|---------------------------------------------------------|----------------------------------------------|----------------------------------------|--------|
| 1  | Calculate risk score using Purdue Model questionnaire                      | Complete all questions and click "Calculate Risk Score" | Risk percentage + recommendation displayed   | Correctly displays score and recommendation | PASS   |
| 2  | Filter threats by Purdue Level                                             | Click filter buttons                                    | Only relevant threats shown                  | Filtering works correctly              | PASS   |
| 3  | Search the Threat Matrix                                                   | Type in search field                                    | Matching threats displayed in real time      | Search functions correctly             | PASS   |
| 4  | Track compliance progress in real time                                     | Check/uncheck controls                                  | Progress bar updates instantly               | Progress bar works correctly           | PASS   |
| 5  | Persist checklist data across page reloads                                 | Check items → refresh page                              | Checked items remain                         | Data persists via localStorage         | PASS   |
| 6  | Confirm before resetting checklist                                         | Click "Reset Checklist"                                 | Confirmation dialog appears before clearing  | Works with confirmation prompt         | PASS   |
| 7  | Responsive design across devices                                           | View on mobile, tablet and desktop                      | Layout adapts correctly                      | Fully responsive on all tested devices | PASS   |
| 8  | Clear navigation between all pages                                         | Click all navbar links                                  | Pages load without errors                    | Navigation is smooth and reliable      | PASS   |

---

## 5. Bug Log

| # | Issue                                              | Severity | Resolution                                                                 | Status |
|---|----------------------------------------------------|----------|----------------------------------------------------------------------------|--------|
| 1 | Footer missing on `threats.html`                   | Medium   | Added complete footer section to the page                                  | Fixed  |
| 2 | Threat descriptions disappearing after filtering   | Medium   | Rewrote `renderThreats()` function with stable event handling              | Fixed  |
| 3 | High CLS on Risk Assessment results panel          | Medium   | Reserved vertical space using `min-height` on results card                 | Fixed  |
| 4 | Search/Filter incorrectly showing "No results"     | Medium   | Fixed filtering logic and initial render behaviour                         | Fixed  |

---

## 6. Evidence – Screenshots

All screenshots were taken from the **live deployed site**.

| # | Screenshot                        | Description                                              | File Name                    |
|---|-----------------------------------|----------------------------------------------------------|------------------------------|
| 1 | Risk Assessment with Results      | Shows calculated risk score and recommendation           | `risk-results.png`           |
| 2 | Threat Matrix with Active Filter  | Purdue Level 0-1 filter applied                          | `threat-matrix-filter.png`   |
| 3 | SL2 Compliance Checklist          | Progress bar showing completed controls                  | `checklist-progress.png`     |
| 4 | Mobile Responsive View            | Risk Assessment page viewed on mobile viewport           | `mobile-view.png`            |

---

## 7. Cross-Device and Browser Testing

| Environment            | Result | Notes                              |
|------------------------|--------|------------------------------------|
| Desktop (Chrome)       | Pass   | Full functionality                 |
| Desktop (Firefox)      | Pass   | Full functionality                 |
| Desktop (Safari)       | Pass   | Full functionality                 |
| Mobile (iPhone SE)     | Pass   | Fully responsive                   |
| Tablet (iPad)          | Pass   | Fully responsive                   |

---

## 8. Conclusion

The Interactive ICS Risk Assessment & Threat Mitigation Hub has been thoroughly tested through both automated and manual procedures. All core interactive features function as intended, user feedback is provided at every step, and data persistence has been successfully implemented using `localStorage`.

The project demonstrates strong frontend development skills, clean code structure, professional industrial-themed design, and meets the requirements for **Distinction**.

**Project Status: Ready for Distinction Submission**

---

**End of Testing Report**