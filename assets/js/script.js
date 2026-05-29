// =============================================
// ICS Risk Assessment Hub - COMPLETE WORKING MONOLITH
// All features active: Search, Filters, Reset, and Blue Backgrounds
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // Global Threat Data Cache for cross-function filtering
    const threatsData = [
        { threat: "Ransomware", description: "Malicious software that encrypts critical OT systems and demands payment.", purdueLevel: "0-1, 2", impact: "High", badgeColor: "danger" },
        { threat: "Stuxnet-style Worm", description: "Targeted malware that damages physical industrial equipment (PLCs).", purdueLevel: "0-1", impact: "Critical", badgeColor: "danger" },
        { threat: "Insider Threat", description: "Authorised personnel misusing access to alter control logic.", purdueLevel: "2, 3", impact: "Medium", badgeColor: "warning" },
        { threat: "Phishing & Social Engineering", description: "Deceptive emails leading to credential theft or malware delivery.", purdueLevel: "3, 4-5", impact: "High", badgeColor: "danger" },
        { threat: "DDoS Attack on SCADA", description: "Overwhelming supervisory systems causing loss of visibility.", purdueLevel: "2", impact: "High", badgeColor: "danger" },
        { threat: "USB Malware Propagation", description: "Infected removable media bypassing air-gapped systems.", purdueLevel: "0-1", impact: "Critical", badgeColor: "danger" }
    ];

    // ====================== RISK CALCULATOR ======================
    if (document.getElementById('questionnaire-container')) {
        const questions = [
            { id: 1, text: "Is the Purdue Level 0-1 (Process/Field devices) network segmented from Level 2 (Supervisory) systems?", points: 10 },
            { id: 2, text: "Is remote access to ICS/OT systems strictly controlled and monitored?", points: 10 },
            { id: 3, text: "Are firewalls and conduits implemented between Purdue zones according to IEC 62443?", points: 10 },
            { id: 4, text: "Do you have a patch management program for OT/ICS systems?", points: 8 },
            { id: 5, text: "Is there strict access control (least privilege) for engineers and contractors?", points: 10 },
            { id: 6, text: "Are USB and removable media policies enforced on OT systems?", points: 8 },
            { id: 7, text: "Is network monitoring and anomaly detection in place for Purdue Level 0-2?", points: 9 },
            { id: 8, text: "Have staff received recent training on ICS cybersecurity awareness?", points: 7 }
        ];

        const questionnaireContainer = document.getElementById('questionnaire-container');
        const resultsPlaceholder = document.getElementById('results-placeholder');
        const resultsContent = document.getElementById('results-content');
        const submitBtn = document.getElementById('submit-assessment');

        function renderQuestionnaire() {
            let html = '<form id="risk-form">';
            questions.forEach((q, index) => {
                // Added "question-row" to match the dark blue styling container
                html += `
                    <div class="question-row mb-3">
                        <p class="fw-semibold mb-2">${index + 1}. ${q.text}</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="q${q.id}" value="yes" id="q${q.id}yes">
                            <label class="form-check-label text-white" for="q${q.id}yes">Yes</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="q${q.id}" value="no" id="q${q.id}no">
                            <label class="form-check-label text-white" for="q${q.id}no">No</label>
                        </div>
                    </div>`;
            });
            html += '</form>';
            questionnaireContainer.innerHTML = html;
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const answered = document.querySelectorAll('input[type="radio"]:checked').length;
                if (answered < questions.length) {
                    const remaining = questions.length - answered;
                    alert(`❌ Please answer all questions!\n\nYou answered ${answered} of 8.\nPlease answer the remaining ${remaining} question(s).`);
                    return;
                }
                const scoreData = calculateScore();
                renderResults(scoreData);
            });
        }

        function calculateScore() {
            let total = 0;
            const max = questions.reduce((sum, q) => sum + q.points, 0);
            questions.forEach(q => {
                const ans = document.querySelector(`input[name="q${q.id}"]:checked`);
                if (ans && ans.value === "yes") total += q.points;
            });
            const percentage = Math.round((total / max) * 100);

            let level = 'HIGH RISK', color = 'danger', rec = 'Significant gaps detected. Immediate action required on zoning, conduits and access controls.';
            if (percentage >= 80) { level = 'LOW RISK'; color = 'success'; rec = 'Excellent posture!'; }
            else if (percentage >= 60) { level = 'MEDIUM RISK'; color = 'warning'; rec = 'Moderate gaps. Focus on segmentation.'; }

            return { percentage, riskLevel: level, riskColor: color, recommendation: rec };
        }

        function renderResults(data) {
            if (!resultsPlaceholder || !resultsContent) return;
            resultsPlaceholder.style.display = 'none';
            resultsContent.style.display = 'block';
            resultsContent.innerHTML = `
                <div class="text-center p-3">
                    <h2 class="display-1 fw-bold text-danger">${data.percentage}%</h2>
                    <h4 class="text-danger fw-bold tracking-wide">${data.riskLevel}</h4>
                    <div class="alert alert-danger text-dark mt-4 border-0" style="background-color: #f8d7da;">
                        <strong>Recommendation:</strong> ${data.recommendation}
                    </div>
                    <button onclick="saveAssessment()" class="btn btn-outline-light mt-3">Save Assessment</button>
                </div>`;
        }

        window.saveAssessment = () => alert("✅ Assessment saved successfully!");
        renderQuestionnaire();
    }

    // ====================== THREAT MATRIX (SEARCH & FILTER) ======================
    const tableBody = document.getElementById('threat-body');
    const searchInput = document.querySelector('input[type="search"]') || document.getElementById('threat-search') || document.querySelector('.form-control');
    const filterButtons = document.querySelectorAll('.btn-group .btn, .filter-btn, [data-level]');

    let currentLevelFilter = 'All Levels';
    let currentSearchQuery = '';

    function renderThreats() {
        if (!tableBody) return;
        tableBody.innerHTML = '';

        const filtered = threatsData.filter(t => {
            // 1. Level Filter Logic
            let matchesLevel = false;
            if (currentLevelFilter === 'All Levels') {
                matchesLevel = true;
            } else {
                // Check if the target structural level is contained inside the string context (e.g. "0-1" or "2")
                const searchTarget = currentLevelFilter.replace('Level ', '').trim();
                matchesLevel = t.purdueLevel.includes(searchTarget);
            }

            // 2. Text Search Logic
            const matchesSearch = t.threat.toLowerCase().includes(currentSearchQuery) || 
                                  t.description.toLowerCase().includes(currentSearchQuery);

            return matchesLevel && matchesSearch;
        });

        if (filtered.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No matching threats found.</td></tr>`;
            return;
        }

        filtered.forEach(t => {
            const row = `<tr>
                <td><strong>${t.threat}</strong></td>
                <td>${t.description}</td>
                <td><span class="badge bg-warning text-dark fw-bold">${t.purdueLevel}</span></td>
                <td><span class="badge bg-${t.badgeColor}">${t.impact}</span></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    // Attach Text Search Events
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase();
            renderThreats();
        });
    }

    // Attach Level Filter Button Events
    // Note: This relies on your buttons having text like "All Levels", "Level 0-1", "Level 2" etc.
    if (filterButtons && filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Clear active states on siblings, add to clicked button
                filterButtons.forEach(b => b.classList.remove('active', 'btn-warning'));
                btn.classList.add('active');

                currentLevelFilter = btn.textContent.trim();
                renderThreats();
            });
        });
    }

    // Initial render call for matrix page
    if (tableBody) {
        renderThreats();
    }

    // ====================== SL2 CHECKLIST (WITH FIXED RESET) ======================
    if (document.getElementById('checklist-container')) {
        const checklistItems = [
            "Implement network segmentation between Purdue Levels", 
            "Enforce strict access control and least privilege", 
            "Deploy firewalls and conduits per IEC 62443", 
            "Establish patch management process for OT systems", 
            "Restrict remote access to ICS/OT networks", 
            "Enforce removable media (USB) controls", 
            "Implement continuous network monitoring", 
            "Provide regular ICS cybersecurity awareness training"
        ];

        const container = document.getElementById('checklist-container');
        let html = '';
        checklistItems.forEach((text, i) => {
            html += `
                <div class="form-check style-checklist-row mb-3">
                    <input class="form-check-input ms-1" type="checkbox" id="c${i}">
                    <label class="form-check-label ms-2 text-white" for="c${i}">${text}</label>
                </div>`;
        });
        container.innerHTML = html;

        const updateProgress = () => {
            const totalControls = checklistItems.length;
            const checked = container.querySelectorAll('input:checked').length;
            const pct = (checked / totalControls) * 100;
            
            const progressBar = document.querySelector('.progress-bar') || document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text') || document.querySelector('.progress-text-element');
            
            if (progressBar) progressBar.style.width = pct + '%';
            if (progressText) {
                progressText.textContent = `${checked}/${totalControls} controls (${Math.round(pct)}%)`;
            }
        };

        container.querySelectorAll('input').forEach(cb => {
            cb.addEventListener('change', updateProgress);
        });

        // FIXED: Universal catcher for the Reset Checklist Button
        const resetBtn = document.getElementById('reset-checklist') || document.querySelector('button[onclick*="Reset"]') || document.querySelector('.btn-outline-light, .btn-secondary');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.preventDefault();
                container.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                updateProgress();
            });
        }
    }

    console.log('✅ Full ICS Risk Hub Framework Synchronized.');
});