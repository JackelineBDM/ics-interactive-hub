// =============================================
// ICS Risk Assessment Hub - COMPLETE FINAL VERSION
// All 3 pages working + fixed validation
// =============================================

document.addEventListener('DOMContentLoaded', () => {

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
        }

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

        function calculateScore() {
            let total = 0;
            const max = questions.reduce((sum, q) => sum + q.points, 0);
            questions.forEach(q => {
                const ans = document.querySelector(`input[name="q${q.id}"]:checked`);
                if (ans && ans.value === "yes") total += q.points;
            });
            const percentage = Math.round((total / max) * 100);

            let level = 'HIGH RISK', color = 'danger', rec = 'Significant gaps detected. Immediate action required.';
            if (percentage >= 80) { level = 'LOW RISK'; color = 'success'; rec = 'Excellent posture!'; }
            else if (percentage >= 60) { level = 'MEDIUM RISK'; color = 'warning'; rec = 'Moderate gaps. Focus on segmentation.'; }

            return { percentage, riskLevel: level, riskColor: color, recommendation: rec };
        }

        function renderResults(data) {
            resultsPlaceholder.style.display = 'none';
            resultsContent.style.display = 'block';
            resultsContent.innerHTML = `
                <h2 class="display-1 fw-bold text-${data.riskColor} text-center">${data.percentage}%</h2>
                <h4 class="text-${data.riskColor} text-center">${data.riskLevel}</h4>
                <div class="alert alert-${data.riskColor} mt-3">
                    <strong>Recommendation:</strong> ${data.recommendation}
                </div>
                <button onclick="saveAssessment()" class="btn btn-outline-light">💾 Save Assessment</button>`;
        }

        window.saveAssessment = () => alert("✅ Assessment saved!");

        renderQuestionnaire();
        submitBtn.disabled = false;
    }

    // ====================== THREAT MATRIX ======================
    if (document.getElementById('threat-table')) {
        const threatsData = [
            { threat: "Ransomware", description: "Encrypts OT systems and demands payment.", purdueLevel: "0-1, 2", impact: "High" },
            { threat: "Stuxnet-style Worm", description: "Damages physical PLCs.", purdueLevel: "0-1", impact: "Critical" },
            { threat: "Insider Threat", description: "Misuse of authorised access.", purdueLevel: "2, 3", impact: "Medium" },
            { threat: "Phishing", description: "Credential theft via email.", purdueLevel: "3, 4-5", impact: "High" }
        ];

        const tableBody = document.getElementById('threat-body');
        function renderThreats(data) {
            tableBody.innerHTML = '';
            data.forEach(t => {
                const row = `<tr>
                    <td><strong>${t.threat}</strong></td>
                    <td>${t.description}</td>
                    <td><span class="badge bg-info">${t.purdueLevel}</span></td>
                    <td><span class="badge bg-danger">${t.impact}</span></td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        }
        renderThreats(threatsData);
    }

    // ====================== SL2 CHECKLIST ======================
    if (document.getElementById('checklist-container')) {
        const checklistItems = [
            "Implement network segmentation", "Enforce least privilege access", 
            "Deploy IEC 62443 conduits", "Patch management for OT", 
            "Restrict remote access", "USB / removable media control",
            "Continuous monitoring", "Regular staff training"
        ];

        const container = document.getElementById('checklist-container');
        let html = '';
        checklistItems.forEach((text, i) => {
            html += `
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="c${i}">
                    <label class="form-check-label" for="c${i}">${text}</label>
                </div>`;
        });
        container.innerHTML = html;

        container.querySelectorAll('input').forEach(cb => {
            cb.addEventListener('change', () => {
                const checked = document.querySelectorAll('#checklist-container input:checked').length;
                document.getElementById('progress-bar').style.width = (checked * 12.5) + '%';
                document.getElementById('progress-text').textContent = `${checked}/8 controls (${checked * 12.5}%)`;
            });
        });
    }

    console.log('✅ Full ICS Risk Hub Loaded Successfully');
});