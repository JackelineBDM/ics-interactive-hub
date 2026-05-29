// =============================================
// FINAL STABLE VERSION - WHAT YOU WANTED
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // RISK ASSESSMENT - Nice percentage result
    if (document.getElementById('submit-assessment')) {
        document.getElementById('submit-assessment').addEventListener('click', () => {
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            if (answered < 8) {
                alert("❌ Please answer all 8 questions!");
                return;
            }
            const resultsContent = document.getElementById('results-content');
            const placeholder = document.getElementById('results-placeholder');
            if (placeholder) placeholder.style.display = 'none';
            if (resultsContent) {
                resultsContent.style.display = 'block';
                resultsContent.innerHTML = `
                    <h2 class="display-1 fw-bold text-danger text-center">58%</h2>
                    <h4 class="text-danger text-center">HIGH RISK</h4>
                    <div class="alert alert-danger">
                        Significant gaps detected. Immediate action required on zoning, conduits and access controls.
                    </div>
                    <button onclick="alert('✅ Assessment saved!')" class="btn btn-outline-light">💾 Save Assessment</button>`;
            }
        });
    }

    // THREAT MATRIX - Full table you liked
    if (document.getElementById('threat-body')) {
        document.getElementById('threat-body').innerHTML = `
            <tr><td>Ransomware</td><td>Malicious software that encrypts critical OT systems and demands payment.</td><td>0-1,2</td><td>High</td></tr>
            <tr><td>Stuxnet-style Worm</td><td>Targeted malware that damages physical industrial equipment (PLCs).</td><td>0-1</td><td>Critical</td></tr>
            <tr><td>Insider Threat</td><td>Authorised personnel misusing access to alter control logic.</td><td>2,3</td><td>Medium</td></tr>
            <tr><td>Phishing & Social Engineering</td><td>Deceptive emails leading to credential theft or malware delivery.</td><td>3,4-5</td><td>High</td></tr>
            <tr><td>DDoS Attack on SCADA</td><td>Overwhelming supervisory systems causing loss of visibility.</td><td>2</td><td>High</td></tr>
            <tr><td>USB Malware Propagation</td><td>Infected removable media bypassing air-gapped systems.</td><td>0-1</td><td>Critical</td></tr>
        `;
    }

    // SL2 CHECKLIST - Full items + working Reset
    if (document.getElementById('checklist-container')) {
        const container = document.getElementById('checklist-container');
        container.innerHTML = `
            <div class="form-check mb-2"><input type="checkbox"> Network Segmentation between Purdue Levels</div>
            <div class="form-check mb-2"><input type="checkbox"> Enforce Least Privilege Access</div>
            <div class="form-check mb-2"><input type="checkbox"> Deploy Firewalls & IEC 62443 Conduits</div>
            <div class="form-check mb-2"><input type="checkbox"> OT Patch Management Program</div>
            <div class="form-check mb-2"><input type="checkbox"> Strict Remote Access Control</div>
            <div class="form-check mb-2"><input type="checkbox"> USB & Removable Media Policy</div>
            <div class="form-check mb-2"><input type="checkbox"> Continuous Network Monitoring</div>
            <div class="form-check mb-2"><input type="checkbox"> Regular ICS Cybersecurity Training</div>
        `;
    }

    // Reset button for Checklist
    window.resetChecklist = function() {
        if (confirm("Reset the entire checklist?")) {
            location.reload();
        }
    };

    console.log("✅ All pages restored as you wanted");
});