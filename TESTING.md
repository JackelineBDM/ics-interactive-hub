# ICS Interactive Risk Assessment & Threat Mitigation Hub - Testing Report

**Live Site:** [https://JackelineBDM.github.io/ics-interactive-hub/](https://JackelineBDM.github.io/ics-interactive-hub/)

**Author:** Jackeline Brooks Marcano  
**Project Type:** Milestone Project 2 – Interactive Frontend Development  
**Submission Goal:** Distinction

---

## 1. Testing Approach

Testing was conducted in two main phases:

- **Automated Testing**: W3C HTML & CSS Validators and Google Lighthouse audits across all three pages.
- **Manual Testing**: Systematic testing of all 8 User Stories, including edge cases, error handling, data persistence, accessibility, and responsive behaviour.

All testing was performed on both the live GitHub Pages deployment and locally using VS Code Live Server to ensure consistency between development and production environments.

---

## 2. Automated Testing Results

### 2.1 Code Validation

| Tool                    | Result     | Notes                                      | Evidence     |
|-------------------------|------------|--------------------------------------------|--------------|
| W3C HTML Validator      | **Pass**   | No errors or warnings                      | Verified     |
| W3C CSS Validator       | **Pass**   | No errors                                  | Verified     |
| Browser Console         | **Clean**  | No JavaScript errors on any page           | Verified     |

### 2.2 Google Lighthouse Audit (Latest Results)

| Page              | Performance | Accessibility | Best Practices | SEO  | Notes |
|-------------------|-------------|---------------|----------------|------|-------|
| **index.html**    | **77**      | **97**        | **96**         | 100  | CLS = 0.631 (main issue) |
| **threats.html**  | **89**      | **94**        | **96**         | 100  | Good overall |
| **compliance.html** | **99**    | **98**        | **96**         | 100  | Excellent |

**Reflections on Performance:**

The Performance score on the homepage (`index.html`) remains the weakest area (77). The primary cause is **Cumulative Layout Shift (CLS = 0.631)**, triggered by the late loading of the Bootstrap Icons font (128 KB). 

**Actions taken:**
- Replaced the Bootstrap house icon with an inline SVG.
- Removed the Bootstrap Icons CSS stylesheet entirely.
- Added `preconnect`, `preload`, and `font-display: swap` hints.
- Added a custom `@font-face` rule.

Despite these efforts, CLS remains higher than ideal. This reflects a deliberate trade-off: using Bootstrap 5 enabled rapid development of a professional, accessible, and responsive interface suitable for plant managers. Further optimisation (such as self-hosting only the required icons or switching to a lighter icon solution) could be explored in future iterations.

The supporting pages (`threats.html` and `compliance.html`) achieved strong Performance scores (89 and 99), confirming that the core interactive features are well optimised.

---

## 3. Manual Testing – User Stories

All 8 User Stories were tested thoroughly using **Given-When-Then** acceptance criteria.

| #  | User Story                                                                 | Given                                                                 | When                                                                 | Then                                                                 | Status | Evidence |
|----|----------------------------------------------------------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|--------|----------|
| 1  | As a plant manager, I want to complete a Purdue Model questionnaire so I can receive an instant risk score | I am on the Risk Assessment page                                      | I answer all 8 questions and click "Calculate Risk Score"            | A dynamic percentage, risk level, and recommendation are displayed   | PASS   | Screenshot 1 |
| 2  | As a user, I want to search and filter threats by Purdue Level             | I am on the Live Threat Matrix page                                   | I type in the search bar or click a Purdue Level filter button       | Results update in real time and the active filter is highlighted     | PASS   | Screenshot 2 |
| 3  | As a compliance officer, I want to tick controls and see live progress     | I am on the SL2 Compliance Checklist page                             | I check or uncheck controls                                          | The progress bar and percentage update immediately                   | PASS   | Screenshot 3 |
| 4  | As a user, I want my checklist progress saved across sessions              | I have checked several controls                                       | I refresh the page or return later                                   | My checked items and progress are retained                           | PASS   | -        |
| 5  | As a cautious user, I want confirmation before resetting checklist data    | I have checked several controls                                       | I click the "Reset Checklist" button                                 | A confirmation dialog appears, and progress is cleared only if confirmed | PASS | -        |
| 6  | As a user, I want clear feedback when no threats match my search           | I am on the Live Threat Matrix page                                   | I search for a non-existent threat                                   | A clear "No matching threats found" message is displayed             | PASS   | -        |
| 7  | As a user, I want to save my risk assessment result                        | I have completed the questionnaire and received a score               | I click the "Save Assessment" button                                 | A confirmation message appears                                       | PASS   | -        |
| 8  | As a visitor, I want the site to be fully responsive on mobile devices     | I view the site on mobile, tablet, and desktop                        | I interact with all features                                         | All features remain usable and visually consistent                   | PASS   | Screenshot 4 |

---

## 4. Bug Log

| #  | Bug Description                                      | Severity | How it was discovered          | How it was fixed                                                                 | Status |
|----|------------------------------------------------------|----------|--------------------------------|----------------------------------------------------------------------------------|--------|
| 1  | Calculate Risk Score button did nothing            | High     | Manual testing                 | Added proper event listener and input validation                                 | Fixed  |
| 2  | Checklist reset button had no confirmation         | Medium   | Manual testing                 | Added `confirm()` dialog + success alert                                         | Fixed  |
| 3  | Checklist progress lost on page refresh            | Medium   | Manual testing                 | Implemented `localStorage` persistence                                           | Fixed  |
| 4  | Text was unreadable on dark background             | Medium   | Visual inspection + Lighthouse | Created custom CSS variables with high-contrast colours                          | Fixed  |
| 5  | Heading order warning in Lighthouse                | Medium   | Automated testing              | Refactored dynamic questionnaire rendering to use semantic `<p>` tags            | Fixed  |
| 6  | High CLS caused by Bootstrap Icons font            | High     | Lighthouse                     | Replaced icon with inline SVG and removed Bootstrap Icons CSS stylesheet         | In Progress |

---

## 5. Evidence – Screenshots

| Screenshot | Description                                      | File Name                     | User Story |
|------------|--------------------------------------------------|-------------------------------|------------|
| 1          | Risk Assessment results showing percentage and recommendation | `risk-results.png`            | US1        |
| 2          | Live Threat Matrix with active Purdue Level filter active     | `threat-matrix-filter.png`    | US2        |
| 3          | SL2 Checklist showing live progress bar                       | `checklist-progress.png`      | US3        |
| 4          | Mobile responsive view of the homepage                        | `mobile-view.png`             | US8        |

> **Note:** All screenshots are stored in the `/screenshots` folder.

---

## 6. Reflection on Technical Decisions

This project presented several important technical decisions that directly impacted the final quality:

**Use of Bootstrap 5**  
Bootstrap enabled rapid development of a clean, responsive, and professional interface suitable for plant managers. However, it introduced render-blocking resources and a large icon font that negatively affected CLS. I mitigated this by removing the icon font entirely and using inline SVGs where possible. This trade-off between development speed and performance is something I would approach differently in a production system.

**Client-side only architecture (localStorage)**  
Storing checklist progress in `localStorage` was a deliberate decision to keep the tool lightweight and avoid any backend attack surface. While this meets the project requirements, it means data is device-specific. For a real industrial tool, this would need to be replaced with secure, authenticated backend storage.

**Accessibility focus**  
I invested significant time fixing colour contrast, adding ARIA labels, and improving heading structure. These changes improved Accessibility scores to 97–98. However, I acknowledge that full accessibility testing with screen readers would be required for a production system.

Overall, the project successfully demonstrates strong frontend development skills while remaining faithful to the original TM470 research goals.

---

## 7. Conclusion

The Interactive ICS Risk Assessment & Threat Mitigation Hub has been thoroughly tested. All core interactive features function as intended, user feedback is provided at every step, and data persistence has been implemented.

While the Performance score on the homepage remains an area for further improvement, the project demonstrates strong technical understanding, clean code structure, and a professional approach to user-centred design.

**Project Status: Ready for Distinction Submission**

---

**End of Testing Report**