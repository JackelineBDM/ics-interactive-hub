document.addEventListener('DOMContentLoaded', () => {

    // ==================== RISK ASSESSMENT PAGE ====================
    if (document.getElementById('questionnaire-container')) {
        const container = document.getElementById('questionnaire-container');
        const resultsPlaceholder = document.getElementById('results-placeholder');
        const resultsContent = document.getElementById('results-content');
        const submitBtn = document.getElementById('submit-assessment');

        const questions = [
            "Is the Purdue Level 0-1 network segmented from Level 2?",
            "Is remote access to ICS/OT systems strictly controlled?",
            "Are firewalls and conduits implemented per IEC 62443?",
            "Do you have a patch management program for OT systems?",
            "Is there strict access control for engineers/contractors?",
            "Are USB and removable media policies enforced?",
            "Is network monitoring in place for Purdue Level 0-2?",
            "Have staff received recent ICS cybersecurity training?"
        ];

        let html = '';
        questions.forEach((q, i) => {
            html += `
                <div class="mb-3">
                    <p><strong>${i+1}. ${q}</strong></p>
                    <label class="me-3"><input type="radio" name="q${i}" value="yes"> Yes</label>
                    <label><input type="radio" name="q${i}" value="no"> No</label>
                </div>`;
        });
        container.innerHTML = html;

        submitBtn.addEventListener('click', () => {
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            if (answered < 8) {
                alert(`❌ Please answer ALL 8 questions!\nYou have only answered ${answered} questions.`);
                return;
            }
            resultsPlaceholder.style.display = 'none';
            resultsContent.style.display = 'block';
            resultsContent.innerHTML = `<h3 class="text-success text-center">Risk Score Generated!</h3><p>Results appear here based on your answers.</p>`;
        });

        submitBtn.disabled = false;
        console.log("✅ Risk Assessment loaded");
    }

    // ==================== THREAT MATRIX PAGE ====================
    if (document.getElementById('threat-body')) {
        const tableBody = document.getElementById('threat-body');
        tableBody.innerHTML = `
            <tr><td>Ransomware</td><td>Malicious software that encrypts critical OT systems</td><td>0-1,2</td><td>High</td></tr>
            <tr><td>Stuxnet-style Worm</td><td>Targeted malware that damages PLCs</td><td>0-1</td><td>Critical</td></tr>
            <tr><td>Insider Threat</td><td>Misuse of authorised access</td><td>2,3</td><td>Medium</td></tr>
            <tr><td>Phishing & Social Engineering</td><td>Credential theft via email</td><td>3,4-5</td><td>High</td></tr>
        `;
        console.log("✅ Threat Matrix loaded with data");
    }

    // ==================== SL2 CHECKLIST PAGE ====================
    if (document.getElementById('checklist-container')) {
        const container = document.getElementById('checklist-container');
        const items = [
            "Network Segmentation", "Least Privilege Access", "IEC 62443 Conduits", 
            "OT Patch Management", "Remote Access Control", "USB Policy", 
            "Continuous Monitoring", "Staff Cybersecurity Training"
        ];

        let html = '';
        items.forEach((item, i) => {
            html += `
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="chk${i}">
                    <label class="form-check-label" for="chk${i}">${item}</label>
                </div>`;
        });
        container.innerHTML = html;

        console.log("✅ SL2 Checklist loaded with 8 items");
    }

    console.log("🚀 All pages should now be working");
});
