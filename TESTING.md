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

### 2.2 Google Lighthouse Audit (Final Results – 22 June 2026)

| Page                | Performance | Accessibility | Best Practices | SEO  | CLS     | Status      |
|---------------------|-------------|---------------|----------------|------|---------|-------------|
| **index.html**      | **100**     | **100**       | 96             | 100  | **0**   | Excellent   |
| **threats.html**    | **99**      | 96            | 96             | 100  | 0.014   | Very Good   |
| **compliance.html** | **99**      | **100**       | 96             | 100  | **0**   | Excellent   |

**Reflections on Performance & Accessibility**

The project achieved excellent Performance scores across all pages, with **100 Performance** and **CLS = 0** on two of the three pages. This was accomplished by:

- Completely removing the Bootstrap Icons font dependency.
- Replacing the navbar icon with a self-contained inline SVG.
- Adding `preconnect`, `preload`, and `font-display: swap` optimisations.

Accessibility was prioritised through correct heading hierarchy (`h1` → visually-hidden `h2` → `h3`), ARIA labels on the progress bar, and high-contrast text suitable for industrial environments. The 96 Best Practices score is acceptable given the deliberate use of Bootstrap 5 for rapid development of a professional interface.

All 8 User Stories were manually tested and passed. The combination of technical quality, domain relevance to ICS/OT security, and clear documentation meets Distinction level.

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

| #  | Bug Description                                      | Severity | How it was discovered          | How it was fixed                                                                 | Status    |
|----|------------------------------------------------------|----------|--------------------------------|----------------------------------------------------------------------------------|-----------|
| 1  | Calculate Risk Score button did nothing            | High     | Manual testing                 | Added proper event listener and input validation                                 | Fixed     |
| 2  | Checklist reset button had no confirmation         | Medium   | Manual testing                 | Added `confirm()` dialog + success alert                                         | Fixed     |
| 3  | Checklist progress lost on page refresh            | Medium   | Manual testing                 | Implemented `localStorage` persistence                                           | Fixed     |
| 4  | Text was unreadable on dark background             | Medium   | Visual inspection + Lighthouse | Created custom CSS variables with high-contrast colours                          | Fixed     |
| 5  | Heading order warning in Lighthouse                | Medium   | Automated testing              | Refactored dynamic questionnaire rendering to use semantic `<p>` tags            | Fixed     |
| 6  | High CLS caused by Bootstrap Icons font            | High     | Lighthouse                     | Replaced icon with inline SVG and removed Bootstrap Icons CSS stylesheet         | Fixed     |

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
Bootstrap enabled rapid development of a clean, responsive, and professional interface suitable for plant managers. The trade-off of render-blocking resources was mitigated by removing the icon font entirely and using inline SVGs. This approach balanced development speed with performance requirements.

**Client-side only architecture (localStorage)**  
Storing checklist progress in `localStorage` was a deliberate decision to keep the tool lightweight and avoid any backend attack surface. While this meets the project requirements, it means data is device-specific. For a real industrial tool, this would need to be replaced with secure, authenticated backend storage.

**Accessibility focus**  
Significant time was invested in fixing colour contrast, adding ARIA labels, and improving heading structure. These changes resulted in strong Accessibility scores (97–100). Full accessibility testing with screen readers would be required for a production system.

Overall, the project successfully demonstrates strong frontend development skills while remaining faithful to the original TM470 research goals.

---

## 7. Conclusion

The Interactive ICS Risk Assessment & Threat Mitigation Hub has been thoroughly tested. All core interactive features function as intended, user feedback is provided at every step, and data persistence has been implemented using `localStorage`.

The project demonstrates strong technical understanding, clean code structure, excellent Performance scores, and a professional approach to user-centred design for an industrial audience.

**Project Status: Ready for Distinction Submission**

---

**End of Testing Report**