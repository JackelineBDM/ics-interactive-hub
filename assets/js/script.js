// =============================================
// ICS Risk Assessment Hub - FIXED VALIDATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('questionnaire-container')) {

        const questions = [ /* same 8 questions as before */ ];

        const questionnaireContainer = document.getElementById('questionnaire-container');
        const resultsPlaceholder = document.getElementById('results-placeholder');
        const resultsContent = document.getElementById('results-content');
        const submitBtn = document.getElementById('submit-assessment');

        // Render questions
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

        function countAnswered() {
            return document.querySelectorAll('input[type="radio"]:checked').length;
        }

        // MAIN BUTTON CLICK - STRONG VALIDATION
        submitBtn.addEventListener('click', () => {
            const answered = countAnswered();

            if (answered < questions.length) {
                const missing = questions.length - answered;
                alert(`⚠️ You have not answered all questions!\n\nYou still need to answer ${missing} more question(s).\n\nPlease complete the full questionnaire before calculating.`);
                return;
            }

            // If all answered → calculate and show result
            const scoreData = calculateScore();
            renderResults(scoreData);
        });

        function calculateScore() {
            // ... same calculation code as before ...
            let totalScore = 0;
            const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

            questions.forEach(q => {
                const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
                if (selected && selected.value === "yes") totalScore += q.points;
            });

            const percentage = Math.round((totalScore / maxScore) * 100);
            
            let riskLevel = 'HIGH RISK', riskColor = 'danger', recommendation = 'Significant gaps detected. Immediate action required on zoning, conduits and access controls.';

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
                <div class="text-center">
                    <h2 class="display-1 fw-bold text-${scoreData.riskColor}">${scoreData.percentage}%</h2>
                    <h4 class="text-${scoreData.riskColor}">${scoreData.riskLevel}</h4>
                    <div class="alert alert-${scoreData.riskColor} mt-3">
                        <strong>Recommendation:</strong><br>${scoreData.recommendation}
                    </div>
                    <button onclick="saveAssessment()" class="btn btn-outline-light">💾 Save Assessment</button>
                </div>`;
        }

        window.saveAssessment = () => alert("Assessment saved!");

        // Initialize
        renderQuestionnaire();
        submitBtn.disabled = false;   // Button always clickable
    }

    console.log('✅ ICS Risk Hub - Validation Fixed');
});