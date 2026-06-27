# ICS Interactive Risk Assessment & Threat Mitigation Hub - Testing Report

**Live Site:** [https://JackelineBDM.github.io/ics-interactive-hub/](https://JackelineBDM.github.io/ics-interactive-hub/)

**Author:** Jackeline Brooks Marcano  
**Project Type:** Milestone Project 2 – Interactive Frontend Development  
**Submission Goal:** Distinction

---

## 1. Testing Approach

Testing was conducted in two phases:

- **Automated Testing**: W3C HTML Validator, W3C CSS Validator, and Google Lighthouse audits on all three pages.
- **Manual Testing**: Systematic testing of all 8 User Stories, including edge cases, error handling, data persistence using `localStorage`, responsiveness, accessibility, and cross-browser compatibility.

All testing was performed on the live GitHub Pages site and locally using VS Code Live Server.

---

## 2. Automated Testing Results

### 2.1 Code Validation

| Tool                    | Result     | Notes                                      | Evidence     |
|-------------------------|------------|--------------------------------------------|--------------|
| W3C HTML Validator      | **Pass**   | No errors or warnings                      | Verified     |
| W3C CSS Validator       | **Pass**   | No errors                                  | Verified     |
| Browser Console         | **Clean**  | No JavaScript errors on any page           | Verified     |

### 2.2 Google Lighthouse Audit (Final Results – 27 June 2026)

| Page                  | Performance | Accessibility | Best Practices | SEO  | CLS      | Status        |
|-----------------------|-------------|---------------|----------------|------|----------|---------------|
| **index.html**        | **100**     | 100           | 96             | 100  | **0**    | **Excellent** |
| **threats.html**      | **97**      | 96            | 96             | 100  | **0.005**| **Very Good** |
| **compliance.html**   | **97**      | 100           | 96             | 100  | 0        | **Very Good** |

**Key Achievement**: The Cumulative Layout Shift (CLS) on `threats.html` was successfully reduced from 0.565 to **0.005** through targeted CSS improvements.

---

## 3. Manual Testing – User Stories

All 8 User Stories were tested using **Given-When-Then** acceptance criteria. The site meets the needs of plant managers and OT professionals as defined in the project scope.

| User Story | Description                                      | Status   | Evidence |
|------------|--------------------------------------------------|----------|----------|
| US1        | Calculate risk score using Purdue Model questionnaire | **Pass** | Dynamic scoring and recommendations work correctly |
| US2        | Filter and search threats in Live Threat Matrix     | **Pass** | Search bar and level filters function as expected |
| US3        | Track SL2 compliance with persistent progress       | **Pass** | Checklist + progress bar + localStorage persistence |
| US4        | Fully responsive design across devices              | **Pass** | Tested on mobile, tablet and desktop breakpoints |
| US5        | Clear navigation between all pages                  | **Pass** | Consistent navbar across all three pages |
| US6        | Professional industrial dark theme with good contrast | **Pass** | Custom CSS variables and high Accessibility scores |
| US7        | Data persistence without backend                    | **Pass** | Checklist state survives page refresh |
| US8        | Accessible and usable for non-technical users       | **Pass** | High Accessibility scores + semantic HTML structure |

---

## 4. Bug Log & Notable Fixes

| # | Bug Description | Severity | Root Cause | Fix Applied | Status |
|---|------------------|----------|------------|-------------|--------|
| 1 | High Cumulative Layout Shift (CLS = 0.565) on `threats.html` | High | Dynamic table content loading without reserved space | Added targeted `min-height` + `contain: layout style` CSS rules | **Fixed** |
| 2 | "Reset Checklist" button had no confirmation | Medium | Button executed immediately | Added `confirm()` dialog + success alert + `localStorage` clearance | **Fixed** |
| 3 | Text was difficult to read on dark background | Medium | High-contrast white text | Refined CSS custom properties with softer, more readable tones | **Fixed** |
| 4 | Risk Calculator would not calculate unless all questions were answered | Medium | Missing form validation | Added validation check + user-friendly alert | **Fixed** |
| 5 | Lighthouse heading order warnings | Low | Incorrect heading hierarchy | Restructured headings to follow logical semantic order | **Fixed** |
| 6 | Excessive vertical spacing in Threat Matrix table | Medium | Overly broad `min-height` rules from previous fix | Removed aggressive rules and applied precise, scoped CSS | **Fixed** |

No critical bugs remain in the final version.

---

## 5. Performance & Accessibility Reflections

**Performance**  
The project uses Bootstrap 5 via CDN for consistency and rapid development. To optimise performance, `preconnect` hints, `font-display: swap`, and targeted `min-height` rules were implemented. The homepage achieved a perfect **100 Performance** score with **0 CLS**.

**Accessibility**  
Significant attention was given to colour contrast, ARIA labels (especially on the progress bar), semantic HTML, and keyboard navigation. All pages score between 96–100 in Accessibility.

**Known Limitations**  
Minor render-blocking resources from Bootstrap CDN and browser extensions are visible in Lighthouse. These are common in static GitHub Pages deployments and do not affect the core functionality or user experience.

---

## 6. Screenshots

The following screenshots provide visual evidence of the key interactive features working correctly:

| Screenshot | Description | File |
|------------|-------------|------|
| Risk Results Panel | Risk Assessment page showing calculated risk score and recommendation | `screenshots/risk-results.png` |
| Live Threat Matrix Filter | Threat Matrix with active Purdue Level filter applied | `screenshots/threat-matrix-filter.png` |
| SL2 Compliance Progress | Compliance Checklist showing progress tracking | `screenshots/checklist-progress.png` |
| Mobile Responsive View | Risk Assessment page viewed on mobile device | `screenshots/mobile-view.png` |

---

## 7. Conclusion

The Interactive ICS Risk Assessment & Threat Mitigation Hub has been thoroughly tested through both automated and manual procedures. All core interactive features function reliably, user feedback is provided at every step, and data persistence has been implemented using `localStorage`.

The project meets all mandatory requirements for **Milestone Project 2** and demonstrates the characteristics expected at **Distinction** level, including:

- Clear rationale for a real-world industrial application
- Strong interactive functionality using custom JavaScript
- High-quality documentation and version control
- Comprehensive testing with documented bug resolution

**Project Status: Ready for Distinction Submission**

---

**End of Testing Report**