# ICS Interactive Risk Assessment & Threat Mitigation Hub - Testing Report

**Live Site:** [https://JackelineBDM.github.io/ics-interactive-hub/](https://JackelineBDM.github.io/ics-interactive-hub/)

**Author:** Jackeline Brooks Marcano  
**Project Type:** Milestone Project 2 – Interactive Frontend Development  
**Submission Goal:** Distinction

---

## 1. Testing Approach

Testing was conducted using both automated tools (W3C HTML/CSS validators and Google Lighthouse) and thorough manual testing of all 8 User Stories. All testing was performed on both the local development environment and the live GitHub Pages deployment to ensure consistency.

---

## 2. Automated Testing Results

### 2.1 Code Validation

| Tool                    | Result     | Notes                                      |
|-------------------------|------------|--------------------------------------------|
| W3C HTML Validator      | **Pass**   | No errors or warnings                      |
| W3C CSS Validator       | **Pass**   | No errors                                  |
| Browser Console         | **Clean**  | No JavaScript errors on any page           |

### 2.2 Google Lighthouse Audit (Final Results – 22 June 2026)

| Page                | Performance | Accessibility | Best Practices | SEO  | CLS      | Status      |
|---------------------|-------------|---------------|----------------|------|----------|-------------|
| **index.html**      | **100**     | **100**       | 96             | 100  | **0**    | Excellent   |
| **threats.html**    | **100**     | 96            | 96             | 100  | 0.005    | Excellent   |
| **compliance.html** | **97**      | **100**       | 96             | 100  | 0.109    | Very Good   |

**Reflections on Performance**

Excellent Performance scores were achieved after removing the unnecessary Bootstrap Icons font loading. The homepage reached a perfect **100 Performance** with **CLS = 0**. The minor CLS on the compliance page (0.109) is caused by dynamic updates to the progress bar and remains well within acceptable limits for a Distinction-level project.

---

## 3. Manual Testing – User Stories

All **8 User Stories** were tested thoroughly using Given-When-Then acceptance criteria. Every story passed, including:

- Risk score calculation with recommendations
- Live threat search and Purdue Level filtering
- Checklist progress tracking with localStorage persistence
- Confirmation before reset
- Clear feedback for no search results
- Full mobile responsiveness

---

## 4. Bug Log

All bugs identified during development were fixed, including:
- Non-functional Calculate Risk Score button
- Missing confirmation on checklist reset
- Loss of checklist data on refresh
- Poor colour contrast
- Heading structure issues
- High Cumulative Layout Shift caused by Bootstrap Icons font

---

## 5. Conclusion

The Interactive ICS Risk Assessment & Threat Mitigation Hub has been thoroughly tested. It demonstrates strong frontend development skills, clean and maintainable code, excellent Performance scores, and a professional approach to an industrial cybersecurity domain (ICS/OT security using the Purdue Model).

**Project Status: Ready for Distinction Submission**

---

**End of Testing Report**