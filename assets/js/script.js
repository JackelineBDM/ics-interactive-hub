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
                    <fieldset class="question-row mb-4 p-3 border border-warning rounded bg-dark">
                        <legend class="fw-semibold mb-3 text-white fs-6">${index + 1}. ${q.text}</legend>
                        
                        <div class="d-flex gap-4">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${q.id}" value="yes" id="q${q.id}yes">
                                <label class="form-check-label text-white" for="q${q.id}yes">Yes</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${q.id}" value="no" id="q${q.id}no">
                                <label class="form-check-label text-white" for="q${q.id}no">No</label>
                            </div>
                        </div>
                    </fieldset>`;
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
            
            let colorClass = (scoreData.riskColor === 'success') ? 'text-success' : 
                            (scoreData.riskColor === 'warning') ? 'text-warning' : 'text-danger';

            resultsContent.innerHTML = `
                <div class="text-center">
                    <h1 class="display-1 fw-bold ${colorClass}" style="font-size: 5rem;">${scoreData.percentage}%</h1>
                    <h3 class="fw-bold ${colorClass}">${scoreData.riskLevel}</h3>
                    <div class="alert alert-${scoreData.riskColor} mt-3">
                        <strong>Recommendation:</strong> ${scoreData.recommendation}
                    </div>
                    <button onclick="saveAssessment()" class="btn btn-outline-light mt-2">Save Assessment</button>
                </div>
            `;
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

        // Fix #3: Genuine export file download instead of fake alert
        window.saveAssessment = () => {
            const scoreData = calculateScore();
            const reportContent = `ICS RISK ASSESSMENT REPORT\n--------------------\nScore: ${scoreData.percentage}%\nRisk Level: ${scoreData.riskLevel}\nRecommendation: ${scoreData.recommendation}\nDate: ${new Date().toLocaleDateString()}`;
            
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ics-assessment-report.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

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

        const threatBody = document.getElementById('threat-body');
        const searchInput = document.getElementById('threat-search');
        const filterButtons = document.querySelectorAll('.btn-outline-warning');

        function renderThreats(filteredThreats) {
            threatBody.innerHTML = '';

            if (filteredThreats.length === 0) {
                threatBody.innerHTML = `
                    <tr>
                        <td colspan="4" class="text-center text-muted py-4">
                            No matching threats found.
                        </td>
                    </tr>
                `;
                return;
            }

            filteredThreats.forEach(threat => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${threat.threat}</strong></td>
                    <td>${threat.description}</td>
                    <td><span class="badge bg-secondary">${threat.purdueLevel}</span></td>
                    <td><span class="badge bg-${threat.badgeColor}">${threat.impact}</span></td>
                `;
                threatBody.appendChild(row);
            });
        }

        // Fix #4: Unified filter logic supporting search term + Purdue level simultaneously
        function applyUnifiedFilters() {
            const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
            const activeBtn = document.querySelector('.btn-outline-warning.active');
            const level = activeBtn ? activeBtn.getAttribute('data-level') : 'all';

            const filtered = threatsData.filter(t => {
                const matchesSearch = t.threat.toLowerCase().includes(term) || t.description.toLowerCase().includes(term);
                const matchesLevel = (level === 'all' || t.purdueLevel.includes(level));
                return matchesSearch && matchesLevel;
            });

            renderThreats(filtered);
        }

        renderThreats(threatsData);

        if (searchInput) {
            searchInput.addEventListener('input', applyUnifiedFilters);
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyUnifiedFilters();
            });
        });
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

            // Fix #2: Save to localStorage safely inside try/catch
            let state = {};
            checkboxes.forEach(cb => state[cb.id] = cb.checked);
            try {
                localStorage.setItem('icsChecklist', JSON.stringify(state));
            } catch (e) {
                console.warn('LocalStorage save failed:', e);
            }
        };

        // Fix #2: Load saved state safely inside try/catch
        try {
            const savedState = localStorage.getItem('icsChecklist');
            if (savedState) {
                const state = JSON.parse(savedState);
                checkboxes.forEach(cb => {
                    if (state[cb.id] !== undefined) cb.checked = state[cb.id];
                });
            }
        } catch (e) {
            console.warn('LocalStorage data could not be parsed:', e);
            localStorage.removeItem('icsChecklist');
        }

        checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));

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