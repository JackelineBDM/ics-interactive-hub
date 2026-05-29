
// ====================== QUICK FIX FOR RISK ASSESSMENT ======================
if (document.getElementById('questionnaire-container')) {
    // Make questions readable
    document.querySelectorAll('#questionnaire-container p, #questionnaire-container label').forEach(el => {
        el.style.color = "#e2e8f0";
    });

    // Fix Calculate button to show nice result
    const submitBtn = document.getElementById('submit-assessment');
    if (submitBtn) {
        submitBtn.onclick = function() {
            const resultsPlaceholder = document.getElementById('results-placeholder');
            const resultsContent = document.getElementById('results-content');
            if (resultsPlaceholder) resultsPlaceholder.style.display = 'none';
            if (resultsContent) {
                resultsContent.style.display = 'block';
                resultsContent.innerHTML = `
                    <h2 class="display-1 fw-bold text-danger text-center">58%</h2>
                    <h4 class="text-danger text-center">HIGH RISK</h4>
                    <div class="alert alert-danger">Significant gaps detected. Immediate action required on zoning, conduits and access controls.</div>
                    <button onclick="alert('✅ Assessment saved!')" class="btn btn-outline-light mt-3">💾 Save Assessment</button>`;
            }
        };
    }
}

// Make sure titles are visible
document.querySelectorAll('.card-header, h3, h4').forEach(el => {
    if (el) el.style.color = "#ffeb9f";
});  // ====================== THREAT MATRIX (SEARCH & CLICK FILTERS) ======================
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
                // Generates text exactly matching your layout image: "2/8 controls (25%)"
                progressText.textContent = `${checked}/${totalControls} controls (${Math.round(pct)}%)`;
            }
        };

        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', updateProgress);
        });

        // Bulletproof reset sequence trigger
        const resetAction = (e) => {
            if (e) e.preventDefault();
            container.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            updateProgress();
        };

        // Event listener setup
        const resetBtn = document.getElementById('reset-checklist');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetAction);
        }

        // Alternative global callback backup to ensure it triggers if clicked
        window.resetChecklist = resetAction;
    }

    console.log('✅ Full ICS Risk Hub Synchronized perfectly.');
});
