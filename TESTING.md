# ICS Interactive Risk Assessment & Threat Mitigation Hub - Testing Report

**Live Site:** [https://JackelineBDM.github.io/ics-interactive-hub/](https://JackelineBDM.github.io/ics-interactive-hub/)

This document provides a complete record of the testing performed on the Interactive ICS Risk Assessment Hub to ensure functionality, usability, responsiveness, and code quality.

---

## 1. Testing Approach

Testing was carried out in two phases:

* **Automated Validation:** W3C Markup Validator, W3C CSS Validator, and Google Lighthouse.
* **Manual Testing:** Systematic testing against the 8 defined User Stories, including edge cases, error handling, and cross-device responsiveness.

All testing was performed on the deployed GitHub Pages site as well as locally using VS Code Live Server.

---

## 2. Automated Testing Results

| Tool | Result | Notes | Evidence |
|------------|------------|--------------------------------------------|---------------------------|
| W3C HTML Validator | Pass | No errors or warnings | Checked successfully |
| W3C CSS Validator | Pass | No errors | Checked successfully |
| Google Lighthouse | Excellent | Performance, Accessibility, Best Practices, SEO all scored highly | Verified in DevTools |
| Browser Console | Clean | No JavaScript errors on any page | Verified across all pages |

---

## 3. Manual Testing – User Stories

| User Story | Test Description | Expected Result | Actual Result | Status | Notes |
|------------|------------------|------------------|---------------|--------|-------|
| **US1** | Complete the Risk Assessment questionnaire | Dynamic percentage score + recommendation displayed | Correct score calculation and results panel appears | **PASS** | Input validation alert works when questions are incomplete |
| **US2** | Use search and Purdue Level filter buttons on Threat Matrix | Real-time filtering + active button state | Search works instantly. Filter buttons highlight correctly | **PASS** | Empty state message displays when no matches |
| **US3** | Tick compliance controls | Progress bar updates live | Progress bar and percentage update correctly | **PASS** | Very responsive |
| **US4** | Refresh page after ticking checklist items | Progress is remembered | Checkboxes and progress bar retain state | **PASS** | Uses `localStorage` |
| **US5** | Click "Reset Checklist" button | Confirmation dialog appears, then progress clears | Confirmation works + success alert shown | **PASS** | Good defensive UX |
| **US6** | Search for a non-existent threat | "No matching threats found" message appears | Empty state row displays correctly | **PASS** | Styled for visibility |
| **US7** | Click "Save Assessment" button | Confirmation message appears | Alert confirms save action | **PASS** | Basic but functional |
| **US8** | View site on mobile / tablet | Layout remains usable and readable | Fully responsive across devices | **PASS** | Bootstrap grid handled well |

---

## 4. Responsive & Cross-Browser Testing

| Device / Browser | Result | Notes |
|------------------------|------------|-------|
| Desktop (Chrome) | Excellent | Full functionality |
| Desktop (Firefox) | Excellent | Full functionality |
| Desktop (Safari) | Excellent | Full functionality |
| Tablet (iPad) | Good | All features usable |
| Mobile (iPhone) | Good | All features usable |
| Mobile (Android) | Good | Tested via Chrome DevTools viewport simulation |

**Key responsive fixes applied:**
* Proper use of Bootstrap grid utilities (`col-*`, `d-flex`, `flex-wrap`).
* Mobile touch-friendly option button click zones.
* No horizontal layout overflows or hidden scrolling errors.

---

## 5. Bug Log & Fixes

| Bug # | Description | Severity | Fix Applied | Status |
|-------|-------------|----------|-------------|--------|
| 1 | Text on dark background was hard to read | High | Added targeted CSS properties and high-contrast silver colors for body paragraphs, subtitles, and labels. | **Fixed** |
| 2 | "Calculate Risk Score" button did nothing | High | Resolved structural event listener loops and properly target custom container nodes. | **Fixed** |
| 3 | Checklist reset button had no confirmation | Medium | Added a conditional `confirm()` UX trigger loop to protect tracking metrics from accidental data resets. | **Fixed** |
| 4 | Checklist progress lost on page refresh | Medium | Implemented JSON string parsing with `localStorage` hooks to maintain state config variables dynamically. | **Fixed** |
| 5 | Empty search state in Threat Matrix had poor visibility | Low | Created an explicit table layout template fallback row with high visibility contrast for clear negative-feedback error states. | **Fixed** |

No critical bugs remain in the final application version.

---

## 6. Final Validation

* All 8 User Stories have been tested manually and pass completely.
* The web application behaves identically across local development servers and live production servers.
* No console trace errors, memory leaks, or execution failures occur during application operations.
* The workspace environment completely meets contrast and structural accessibility expectations for plants and cybersecurity managers.

---

## 7. Conclusion

The Interactive ICS Risk Assessment & Threat Mitigation Hub has been thoroughly tested. All core interactive features function as intended, user feedback is provided at every step, and data persistence has been implemented for a better real-world experience.

The project is considered **ready for submission**.

---

**End of Testing Report**