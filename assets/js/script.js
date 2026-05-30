// =============================================
// ICS Risk Assessment Hub - COMPLETE & FIXED
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

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const answered = document.querySelectorAll('input[type="radio"]:checked').length;

                if (answered < questions.length) {
                    const remaining = questions.length - answered;
                    alert(`❌ Please complete all questions!\n\nYou have answered ${answered} out of 8.\nPlease answer the remaining ${remaining} question(s).`);
                    return;
                }

                const scoreData = calculateScore();
                renderResults(scoreData);
            });
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

        window.saveAssessment = () => alert("✅ Assessment saved!");

        renderQuestionnaire();
        if (submitBtn) submitBtn.disabled = false;
    }

    // ====================== THREAT MATRIX (SEARCH & CLICK FILTERS) ======================
    if (document.getElementById('threat-table') || document.getElementById('threat-body')) {
        const threatsData = [
            { threat: "Ransomware", description: "Malicious software that encrypts critical OT systems and demands payment.", purdueLevel: "0-1, 2", impact: "High", badgeColor: "danger" },
            { threat: "Stuxnet-style Worm", description: "Targeted malware that damages physical industrial equipment (PLCs).", purdueLevel: "0-1", impact: "Critical", badgeColor: "danger" },
            { threat: "Insider Threat", description: "Authorised personnel misusing access to alter control logic.", purdueLevel: "2, 3", impact: "Medium", badgeColor: "warning" },
            { threat: "Phishing & Social Engineering", description: "Deceptive emails leading to credential theft or malware delivery.", purdueLevel: "3, 4-5", impact: "High", badgeColor: "danger" },
            { threat: "DDoS Attack on SCADA", description: "Overwhelming supervisory systems causing loss of visibility.", purdueLevel: "2", impact: "High", badgeColor: "danger" },
            { threat: "USB Malware Propagation", description: "Infected removable media bypassing air-gapped systems.", purdueLevel: "0-1", impact: "Critical", badgeColor: "danger" }
        ];

        const tableBody = document.getElementById('threat-body');
        const searchInput = document.querySelector('input[type="search"]') || document.getElementById('threat-search') || document.querySelector('.form-control');
        const filterButtons = document.querySelectorAll('.btn-group .btn, .filter-btn, [data-level], .btn-outline-warning');

        let currentFilter = 'All Levels';
        let searchQuery = '';

        function renderThreats() {
            if (!tableBody) return;
            tableBody.innerHTML = '';

            const filteredData = threatsData.filter(t => {
                let matchesLevel = false;
                if (currentFilter === 'All Levels' || currentFilter === 'all') {
                    matchesLevel = true;
                } else {
                    const cleanLevel = currentFilter.replace('Level ', '').trim();
                    matchesLevel = t.purdueLevel.includes(cleanLevel);
                }

                const matchesSearch = t.threat.toLowerCase().includes(searchQuery) || 
                                      t.description.toLowerCase().includes(searchQuery);

                return matchesLevel && matchesSearch;
            });

            if (filteredData.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No matching threats found.</td></tr>`;
                return;
            }

            filteredData.forEach(t => {
                const row = `<tr>
                    <td><strong>${t.threat}</strong></td>
                    <td>${t.description}</td>
                    <td><span class="badge bg-warning text-dark fw-bold">${t.purdueLevel}</span></td>
                    <td><span class="badge bg-${t.badgeColor}">${t.impact}</span></td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase();
                renderThreats();
            });
        }

        if (filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.textContent.trim();
                    renderThreats();
                });
            });
        }

        renderThreats();
    }

    // ====================== SL2 CHECKLIST (FIXED RESET) ======================
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
                <div class="form-check mb-3 p-3 rounded style-checklist-row">
                    <input class="form-check-input ms-1" type="checkbox" id="c${i}">
                    <label class="form-check-label ms-2 text-white" for="c${i}">${text}</label>
                </div>`;
        });
        container.innerHTML = html;

        const updateProgress = () => {
            const totalControls = checklistItems.length;
            const checked = container.querySelectorAll('input:checked').length;
            const pct = (checked / totalControls) * 100;
            
            const progressBar = document.getElementById('progress-bar') || document.querySelector('.progress-bar');
            const progressText = document.getElementById('progress-text') || document.querySelector('.progress-text-element');
            
            if (progressBar) progressBar.style.width = pct + '%';
            if (progressText) {
                progressText.textContent = `${checked}/${totalControls} controls (${Math.round(pct)}%)`;
            }
        };

        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', updateProgress);
        });

        const resetAction = (e) => {
            if (e) e.preventDefault();
            container.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            updateProgress();
        };

        const resetBtn = document.getElementById('reset-checklist');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetAction);
        }

        window.resetChecklist = resetAction;
    }

    console.log('✅ Full ICS Risk Hub Synchronized perfectly.');
});