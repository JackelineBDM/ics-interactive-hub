// =============================================
// ICS Risk Assessment Hub - Final JavaScript
// With validation message on button click
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
                    <button onclick="saveAssessment()" class="btn btn-outline-light mt-3">💾 Save Assessment</button>
                </div>`;
        }

        window.saveAssessment = function() {
            alert('Assessment saved successfully! (In real version this would use localStorage)');
        };

        // Main Button Click with Validation
        submitBtn.addEventListener('click', () => {
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            
            if (answered !== questions.length) {
                alert("⚠️ Please answer ALL questions before calculating your risk score.");
                return;
            }

            const scoreData = calculateScore();
            renderResults(scoreData);
        });

        renderQuestionnaire();
        submitBtn.disabled = false;   // Make button always active
    }

    // ====================== THREAT MATRIX & CHECKLIST (keep existing) ======================
    if (document.getElementById('threat-table')) {
        console.log('Threat Matrix loaded');
    }

    if (document.getElementById('checklist-container')) {
        console.log('Checklist loaded');
    }

    window.resetChecklist = function() {
        if (confirm('Reset checklist?')) location.reload();
    };

    console.log('✅ ICS Risk Hub fully loaded');
});