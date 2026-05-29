// =============================================
// ICS Risk Assessment Hub - Main JavaScript
// Supports Risk Calculator, Threat Matrix, and SL2 Checklist
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
                    <div class="mb-4">
                        <p class="fw-semibold mb-2">${index + 1}. ${q.text}</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="q${q.id}" value="yes" id="q${q.id}yes">
                            <label class="form-check-label" for="q${q.id}yes">Yes</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="q${q.id}" value="no" id="q${q.id}no">
                            <label class="form-check-label" for="q${q.id}no">No</label>
                        </div>
                    </div>`;
            });
            html += '</form>';
            questionnaireContainer.innerHTML = html;

            document.getElementById('risk-form').addEventListener('change', checkIfComplete);
        }

        function checkIfComplete() {
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            submitBtn.disabled = answered !== questions.length;
        }

        function calculateScore() {
            let totalScore = 0;
            const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

            questions.forEach(q => {
                const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
                if (selected && selected.value === "yes") {
                    totalScore += q.points;
                }
            });

            const percentage = Math.round((totalScore / maxScore) * 100);
            
            let riskLevel = '', riskColor = '', recommendation = '';

            if (percentage >= 80) {
                riskLevel = 'LOW RISK';
                riskColor = 'success';
                recommendation = 'Excellent SL2 posture. Maintain current controls and continue regular reviews.';
            } else if (percentage >= 60) {
                riskLevel = 'MEDIUM RISK';
                riskColor = 'warning';
                recommendation = 'Moderate risk identified. Prioritise segmentation and access control improvements.';
            } else {
                riskLevel = 'HIGH RISK';
                riskColor = 'danger';
                recommendation = 'Significant gaps detected. Immediate action required on zoning, conduits and access controls.';
            }

            return { percentage, riskLevel, riskColor, recommendation };
        }

        function renderResults(scoreData) {
            resultsPlaceholder.style.display = 'none';
            resultsContent.style.display = 'block';

            resultsContent.innerHTML = `
                <div class="text-center">
                    <h2 class="display-1 fw-bold text-${scoreData.riskColor}">${scoreData.percentage}%</h2>
                    <h4 class="text-${scoreData.riskColor} mb-4">${scoreData.riskLevel}</h4>
                    <div class="alert alert-${scoreData.riskColor} border-0">
                        <strong>Recommendation:</strong> ${scoreData.recommendation}
                    </div>
                    <button onclick="saveAssessment()" class="btn btn-outline-light mt-3">Save Assessment</button>
                </div>`;
        }

        window.saveAssessment = function() {
            const scoreData = calculateScore();
            const assessment = {
                date: new Date().toISOString(),
                score: scoreData.percentage,
                riskLevel: scoreData.riskLevel
            };
            localStorage.setItem('icsRiskAssessment', JSON.stringify(assessment));
            alert('Assessment saved successfully!');
        };

        submitBtn.addEventListener('click', () => {
            const scoreData = calculateScore();
            renderResults(scoreData);
        });

        renderQuestionnaire();
    }

    // ====================== THREAT MATRIX (threats.html) ======================
    if (document.getElementById('threat-table')) {

        const threatsData = [
            { id: 1, threat: "Ransomware", description: "Malicious software that encrypts critical OT systems and demands payment.", purdueLevel: "0-1, 2", impact: "High" },
            { id: 2, threat: "Stuxnet-style Worm", description: "Targeted malware that damages physical industrial equipment (PLCs).", purdueLevel: "0-1", impact: "Critical" },
            { id: 3, threat: "Insider Threat", description: "Authorised personnel misusing access to alter control logic.", purdueLevel: "2, 3", impact: "Medium" },
            { id: 4, threat: "Phishing & Social Engineering", description: "Deceptive emails leading to credential theft or malware delivery.", purdueLevel: "3, 4-5", impact: "High" },
            { id: 5, threat: "DDoS Attack on SCADA", description: "Overwhelming supervisory systems causing loss of visibility.", purdueLevel: "2", impact: "High" },
            { id: 6, threat: "USB Malware Propagation", description: "Infected removable media bypassing air-gapped systems.", purdueLevel: "0-1", impact: "Critical" }
        ];

        const tableBody = document.getElementById('threat-body');
        const searchInput = document.getElementById('threat-search');
        const filterButtons = document.querySelectorAll('[data-level]');

        function renderThreats(filteredThreats) {
            tableBody.innerHTML = '';
            filteredThreats.forEach(threat => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${threat.threat}</strong></td>
                    <td>${threat.description}</td>
                    <td><span class="badge bg-warning text-dark">${threat.purdueLevel}</span></td>
                    <td><span class="badge bg-danger">${threat.impact}</span></td>`;
                tableBody.appendChild(row);
            });
        }

        searchInput.addEventListener('input', () => {
            const term = searchInput.value.toLowerCase().trim();
            const filtered = threatsData.filter(t => 
                t.threat.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)
            );
            renderThreats(filtered);
        });

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const level = btn.getAttribute('data-level');
                const filtered = level === 'all' ? threatsData : threatsData.filter(t => t.purdueLevel.includes(level));
                renderThreats(filtered);
            });
        });

        renderThreats(threatsData);
    }

    // ====================== SL2 COMPLIANCE CHECKLIST (compliance.html) ======================
    if (document.getElementById('checklist-container')) {

        const checklistItems = [
            { id: 1, text: "Implement network segmentation between Purdue Levels", completed: false },
            { id: 2, text: "Enforce strict access control and least privilege", completed: false },
            { id: 3, text: "Deploy firewalls and conduits per IEC 62443", completed: false },
            { id: 4, text: "Establish patch management process for OT systems", completed: false },
            { id: 5, text: "Restrict remote access to ICS/OT networks", completed: false },
            { id: 6, text: "Enforce removable media (USB) controls", completed: false },
            { id: 7, text: "Implement continuous network monitoring", completed: false },
            { id: 8, text: "Provide regular ICS cybersecurity awareness training", completed: false }
        ];

        const checklistContainer = document.getElementById('checklist-container');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');

        function renderChecklist() {
            let html = '';
            checklistItems.forEach(item => {
                html += `
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="item-${item.id}" ${item.completed ? 'checked' : ''}>
                        <label class="form-check-label" for="item-${item.id}">${item.text}</label>
                    </div>`;
            });
            checklistContainer.innerHTML = html;

            checklistContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', updateProgress);
            });
        }

        function updateProgress() {
            const checkedCount = document.querySelectorAll('#checklist-container input[type="checkbox"]:checked').length;
            const total = checklistItems.length;
            const percentage = Math.round((checkedCount / total) * 100);

            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${checkedCount}/${total} controls (${percentage}%)`;

            checklistItems.forEach(item => {
                item.completed = document.getElementById(`item-${item.id}`).checked;
            });
            localStorage.setItem('sl2Checklist', JSON.stringify(checklistItems));
        }

        function loadSavedProgress() {
            const saved = localStorage.getItem('sl2Checklist');
            if (saved) {
                const savedData = JSON.parse(saved);
                savedData.forEach(savedItem => {
                    const item = checklistItems.find(i => i.id === savedItem.id);
                    if (item) item.completed = savedItem.completed;
                });
            }
        }

        loadSavedProgress();
        renderChecklist();
        updateProgress();
    }

    // ====================== RESET CHECKLIST FUNCTION ======================
    window.resetChecklist = function() {
        if (confirm('Are you sure you want to reset the entire checklist?')) {
            localStorage.removeItem('sl2Checklist');
            location.reload();
        }
    };

    // ====================== GLOBAL INITIALIZATION ======================
    console.log('ICS Risk Hub JavaScript fully initialized');
            // Force button to be enabled for better testing
        submitBtn.disabled = false;
        
});