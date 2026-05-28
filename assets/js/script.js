// =============================================
// ICS Risk Assessment Hub - Main JavaScript
// Milestone Project 2 + TM470
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // ====================== DATA ======================
    const questions = [
        {
            id: 1,
            text: "Is the Purdue Level 0-1 (Process/Field devices) network segmented from Level 2 (Supervisory) systems?",
            points: 10
        },
        {
            id: 2,
            text: "Is remote access to ICS/OT systems strictly controlled and monitored?",
            points: 10
        },
        {
            id: 3,
            text: "Are firewalls and conduits implemented between Purdue zones according to IEC 62443?",
            points: 10
        },
        {
            id: 4,
            text: "Do you have a patch management program for OT/ICS systems?",
            points: 8
        },
        {
            id: 5,
            text: "Is there strict access control (least privilege) for engineers and contractors?",
            points: 10
        },
        {
            id: 6,
            text: "Are USB and removable media policies enforced on OT systems?",
            points: 8
        },
        {
            id: 7,
            text: "Is network monitoring and anomaly detection in place for Purdue Level 0-2?",
            points: 9
        },
        {
            id: 8,
            text: "Have staff received recent training on ICS cybersecurity awareness?",
            points: 7
        }
    ];

    let userAnswers = {};

    // ====================== DOM ELEMENTS ======================
    const questionnaireContainer = document.getElementById('questionnaire-container');
    const resultsPlaceholder = document.getElementById('results-placeholder');
    const resultsContent = document.getElementById('results-content');
    const submitBtn = document.getElementById('submit-assessment');

    // ====================== RENDER QUESTIONNAIRE ======================
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
                </div>
            `;
        });
        
        html += '</form>';
        questionnaireContainer.innerHTML = html;

        // Enable submit button when all questions are answered
        const form = document.getElementById('risk-form');
        form.addEventListener('change', checkIfComplete);
    }

    function checkIfComplete() {
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        submitBtn.disabled = answered !== questions.length;
    }

    // ====================== CALCULATE SCORE ======================
    function calculateScore() {
        let totalScore = 0;
        let maxScore = questions.reduce((sum, q) => sum + q.points, 0);

        questions.forEach(q => {
            const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
            if (selected && selected.value === "yes") {
                totalScore += q.points;
            }
        });

        const percentage = Math.round((totalScore / maxScore) * 100);
        
        let riskLevel = '';
        let riskColor = '';
        let recommendation = '';

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

        return { percentage, riskLevel, riskColor, recommendation, totalScore, maxScore };
    }

    // ====================== RENDER RESULTS ======================
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

                <button onclick="saveAssessment()" class="btn btn-outline-light mt-3">
                    💾 Save Assessment
                </button>
            </div>
        `;
    }

    // ====================== SAVE TO LOCALSTORAGE ======================
    window.saveAssessment = function() {
        const scoreData = calculateScore();
        const assessment = {
            date: new Date().toISOString(),
            score: scoreData.percentage,
            riskLevel: scoreData.riskLevel,
            answers: userAnswers
        };
        
        localStorage.setItem('icsRiskAssessment', JSON.stringify(assessment));
        alert('✅ Assessment saved successfully!');
    };

    // ====================== SUBMIT HANDLER ======================
    submitBtn.addEventListener('click', () => {
        const scoreData = calculateScore();
        renderResults(scoreData);
    });

    // ====================== DARK MODE TOGGLE ======================
    function toggleDarkMode() {
        document.documentElement.classList.toggle('light-mode');
        const isLight = document.documentElement.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Load saved theme
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-mode');
        }
    }

    // ====================== INITIALIZE ======================
    function init() {
        renderQuestionnaire();
        loadTheme();
        
        // Optional: Add dark mode toggle button to navbar in future
        console.log('%c🚀 ICS Risk Assessment JS initialized successfully', 'color: #ffcb05; font-weight: bold');
    }

    init();
});