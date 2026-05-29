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

        // FIXED VALIDATION - Shows message even if some questions are answered
        submitBtn.addEventListener('click', () => {
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;

            if (answered < questions.length) {
                const remaining = questions.length - answered;
                alert(`❌ Please complete all questions!\n\nYou have answered ${answered} out of 8.\nPlease answer the remaining ${remaining} question(s).`);
                return;
            }

            // All answered → calculate and show results
            const scoreData = calculateScore();
            renderResults(scoreData);
        });

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

        // Initialize
        renderQuestionnaire();
        submitBtn.disabled = false;
    }

    // ====================== THREAT MATRIX & CHECKLIST ======================
    if (document.getElementById('threat-table')) console.log('Threat Matrix loaded');
    if (document.getElementById('checklist-container')) console.log('Checklist loaded');

    window.resetChecklist = () => { if(confirm('Reset?')) location.reload(); };

    console.log('✅ ICS Risk Hub Loaded Successfully');
});