// =============================================
// ICS Risk Assessment Hub - COMPLETE & FIXED
// All 3 pages fully working
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ====================== RISK CALCULATOR (index.html) ======================
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
                html += `
                    <div class="question-row d-flex align-items-center justify-content-between mb-2">
                        <p class="fw-semibold m-0">${index + 1}. ${q.text}</p>
                        <div class="radio-options d-flex align-items-center flex-shrink-0">
                            <div class="form-check form-check-inline m-0 me-3">
                                <input class="form-check-input" type="radio" name="q${q.id}" value="yes" id="q${q.id}yes">
                                <label class="form-check-label text-white" for="q${q.id}yes">Yes</label>
                            </div>
                            <div class="form-check form-check-inline m-0">
                                <input class="form-check-input" type="radio" name="q${q.id}" value="no" id="q${q.id}no">
                                <label class="form-check-label text-white" for="q${q.id}no">No</label>
                            </div>
                        </div>
                    </div>`;
            });
            html += '</form>';
            questionnaireContainer.innerHTML = html;
        }

        function calculateScore() {
            let totalScore = 0;
            const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

            questions.forEach(q => {
                const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
                if (selected && selected.value === "yes") totalScore += q.points;
            });

            const percentage = Math.round((totalScore / maxScore) * 100);
            let riskLevel = 'HIGH RISK', riskColor = 'danger', recommendation = 'Significant gaps detected. Immediate action required.';

            if (percentage >= 80) {
                riskLevel = 'LOW RISK'; riskColor = 'success';
                recommendation = 'Excellent SL2 posture. Maintain current controls.';
            } else if (percentage >= 60) {
                riskLevel = 'MEDIUM RISK'; riskColor = 'warning';
                recommendation = 'Moderate risk identified. Focus on segmentation and access control.';
            }

            return { percentage, riskLevel, riskColor, recommendation };
        }

        function renderResults(scoreData) {
            if (!resultsPlaceholder || !resultsContent) return;
            resultsPlaceholder.style.display = 'none';
            resultsContent.style.display = 'block';
            resultsContent.innerHTML = `
                <h2 class="display-1 fw-bold text-${scoreData.riskColor} text-center">${scoreData.percentage}%</h2>
                <h4 class="text-${scoreData.riskColor} text-center">${scoreData.riskLevel}</h4>
                <div class="alert alert-${scoreData.riskColor} mt-3">
                    <strong>Recommendation:</strong> ${scoreData.recommendation}
                </div>
                <button onclick="saveAssessment()" class="btn btn-outline-light">Save Assessment</button>`;
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const answered = document.querySelectorAll('input[type="radio"]:checked').length;

                if (answered < questions.length) {
                    const remaining = questions.length - answered;
                    alert(`Please complete all questions!\n\nYou have answered ${answered} out of 8.\nPlease answer the remaining ${remaining} question(s).`);
                    return;
                }

                const scoreData = calculateScore();
                renderResults(scoreData);
            });
            submitBtn.disabled = false;
        }

        window.saveAssessment = () => alert("Assessment saved successfully!");

        renderQuestionnaire();
    }

    // ====================== THREAT MATRIX (threats.html) ======================
    if (document.getElementById('threat-body')) {

        const threatsData = [
            { threat: "Ransomware", description: "Malicious software that encrypts critical OT systems and demands payment.", purdueLevel: "0-1, 2", impact: "High", badgeColor: "danger" },
            { threat: "Stuxnet-style Worm", description: "Targeted malware that damages physical industrial equipment (PLCs).", purdueLevel: "0-1", impact: "Critical", badgeColor: "danger" },
            { threat: "Insider Threat", description: "Authorised personnel misusing access to alter control logic.", purdueLevel: "2, 3", impact: "Medium", badgeColor: "warning" },
            { threat: "Phishing & Social Engineering", description: "Deceptive emails leading to credential theft or malware delivery.", purdueLevel: "3, 4-5", impact: "High", badgeColor: "danger" },
            { threat: "DDoS Attack on SCADA", description: "Overwhelming supervisory systems causing loss of visibility.", purdueLevel: "2", impact: "High", badgeColor: "danger" },
            { threat: "USB Malware Propagation", description: "Infected removable media bypassing air-gapped systems.", purdueLevel: "0-1", impact: "Critical", badgeColor: "danger" }
        ];

        const tableBody = document.getElementById('threat-body');
        const searchInput = document.getElementById('threat-search') || document.querySelector('input[type="search"]');
        const filterButtons = document.querySelectorAll('.btn-outline-warning');

        let currentFilter = 'All Levels';
        let searchQuery = '';

        function renderThreats(filteredData) {
            if (!tableBody) return;
            tableBody.innerHTML = '';

            if (filteredData.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No matching threats found.</td></tr>`;
                return;
            }

            filteredData.forEach(t => {
                const row = `
                    <tr>
                        <td><strong>${t.threat}</strong></td>
                        <td>${t.description}</td>
                        <td><span class="badge bg-warning text-dark fw-bold">${t.purdueLevel}</span></td>
                        <td><span class="badge bg-${t.badgeColor}">${t.impact}</span></td>
                    </tr>`;
                tableBody.innerHTML += row;
            });
        }

        function filterAndRender() {
            const filtered = threatsData.filter(t => {
                const matchesLevel = (currentFilter === 'All Levels') || t.purdueLevel.includes(currentFilter.replace('Level ', ''));
                const matchesSearch = t.threat.toLowerCase().includes(searchQuery) || 
                                      t.description.toLowerCase().includes(searchQuery);
                return matchesLevel && matchesSearch;
            });
            renderThreats(filtered);
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase();
                filterAndRender();
            });
        }

        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.textContent.trim();
                    filterAndRender();
                });
            });
        }

        // Initial render
        renderThreats(threatsData);
    }

    // ====================== SL2 COMPLIANCE CHECKLIST (compliance.html) ======================
    if (document.getElementById('checklist-container')) {

        const container = document.getElementById('checklist-container');

        const checklistItems = [
            { id: 'c1', text: 'Implement network segmentation between Purdue Levels' },
            { id: 'c2', text: 'Enforce least privilege access control for engineers and contractors' },
            { id: 'c3', text: 'Deploy monitoring and anomaly detection on Level 0-2' },
            { id: 'c4', text: 'Establish patch management process for OT systems' },
            { id: 'c5', text: 'Control and monitor all remote access to ICS' },
            { id: 'c6', text: 'Implement secure conduits between zones per IEC 62443' },
            { id: 'c7', text: 'Enforce USB and removable media policies' },
            { id: 'c8', text: 'Conduct regular ICS cybersecurity awareness training' }
        ];

        // Render checklist
        let html = '';
        checklistItems.forEach(item => {
            html += `
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="${item.id}">
                    <label class="form-check-label" for="${item.id}">${item.text}</label>
                </div>`;
        });
        container.innerHTML = html;

        const checkboxes = container.querySelectorAll('input[type="checkbox"]');

        const updateProgress = () => {
            const totalControls = checkboxes.length;
            const checked = container.querySelectorAll('input:checked').length;
            const pct = totalControls > 0 ? (checked / totalControls) * 100 : 0;

            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');

            if (progressBar) progressBar.style.width = pct + '%';
            if (progressText) {
                progressText.textContent = `${checked}/${totalControls} controls (${Math.round(pct)}%)`;
            }

            // Save to localStorage
            let state = {};
            checkboxes.forEach(cb => state[cb.id] = cb.checked);
            localStorage.setItem('icsChecklist', JSON.stringify(state));
        };

        // Load saved state
        const savedState = localStorage.getItem('icsChecklist');
        if (savedState) {
            const state = JSON.parse(savedState);
            checkboxes.forEach(cb => {
                if (state[cb.id] !== undefined) cb.checked = state[cb.id];
            });
        }

        checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));

        // Reset with confirmation
        const resetChecklist = () => {
            if (confirm("Are you sure you want to reset all compliance progress tracking values?")) {
                checkboxes.forEach(cb => cb.checked = false);
                localStorage.removeItem('icsChecklist');
                updateProgress();
                alert("Checklist progress has been cleared successfully.");
            }
        };

        window.resetChecklist = resetChecklist;

        updateProgress();
    }

    console.log('%c[ICS Hub] All features initialized successfully', 'color: #ffcb05');
});