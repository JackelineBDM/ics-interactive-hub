// =============================================
// ICS Risk Assessment Hub - Main JavaScript
// Supports both Risk Calculator (index.html) and Threat Matrix (threats.html)
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ====================== RISK CALCULATOR (index.html) ======================
    if (document.getElementById('questionnaire-container')) {

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
                    </div>
                `;
            });
            
            html += '</form>';
            questionnaireContainer.innerHTML = html;

            const form = document.getElementById('risk-form');
            form.addEventListener('change', checkIfComplete);
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

                    <button onclick="saveAssessment()" class="btn btn-outline-light mt-3">
                        Save Assessment
                    </button>
                </div>
            `;
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

        // Initialize Risk Calculator
        renderQuestionnaire();
    }

    // ====================== THREAT MATRIX (threats.html) ======================
    if (document.getElementById('threat-table')) {

        const threatsData = [
            {
                id: 1,
                threat: "Ransomware",
                description: "Malicious software that encrypts critical OT systems and demands payment.",
                purdueLevel: "0-1, 2",
                impact: "High"
            },
            {
                id: 2,
                threat: "Stuxnet-style Worm",
                description: "Targeted malware that damages physical industrial equipment (PLCs).",
                purdueLevel: "0-1",
                impact: "Critical"
            },
            {
                id: 3,
                threat: "Insider Threat",
                description: "Authorised personnel misusing access to alter control logic.",
                purdueLevel: "2, 3",
                impact: "Medium"
            },
            {
                id: 4,
                threat: "Phishing & Social Engineering",
                description: "Deceptive emails leading to credential theft or malware delivery.",
                purdueLevel: "3, 4-5",
                impact: "High"
            },
            {
                id: 5,
                threat: "DDoS Attack on SCADA",
                description: "Overwhelming supervisory systems causing loss of visibility.",
                purdueLevel: "2",
                impact: "High"
            },
            {
                id: 6,
                threat: "USB Malware Propagation",
                description: "Infected removable media bypassing air-gapped systems.",
                purdueLevel: "0-1",
                impact: "Critical"
            }
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
                    <td><span class="badge bg-danger">${threat.impact}</span></td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Search functionality
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.toLowerCase().trim();
            const filtered = threatsData.filter(threat =>
                threat.threat.toLowerCase().includes(term) ||
                threat.description.toLowerCase().includes(term)
            );
            renderThreats(filtered);
        });

        // Purdue Level Filter
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const level = btn.getAttribute('data-level');
                
                if (level === 'all') {
                    renderThreats(threatsData);
                } else {
                    const filtered = threatsData.filter(threat => 
                        threat.purdueLevel.includes(level)
                    );
                    renderThreats(filtered);
                }
            });
        });

        // Initial render
        renderThreats(threatsData);
    }

    // ====================== GLOBAL INITIALIZATION ======================
    console.log('ICS Risk Hub JavaScript fully initialized');
});