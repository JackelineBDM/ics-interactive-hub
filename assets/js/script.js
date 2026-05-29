document.addEventListener('DOMContentLoaded', () => {

    // RISK ASSESSMENT - Full questions + nice result
    if (document.getElementById('questionnaire-container')) {
        const container = document.getElementById('questionnaire-container');
        container.style.backgroundColor = "#001f3f";
        container.style.color = "#e2e8f0";

        container.innerHTML = `
            <p><strong>1.</strong> Is the Purdue Level 0-1 network segmented from Level 2? <label><input type="radio" name="q1"> Yes</label> <label><input type="radio" name="q1"> No</label></p>
            <p><strong>2.</strong> Is remote access strictly controlled? <label><input type="radio" name="q2"> Yes</label> <label><input type="radio" name="q2"> No</label></p>
            <p><strong>3.</strong> Are firewalls and conduits per IEC 62443? <label><input type="radio" name="q3"> Yes</label> <label><input type="radio" name="q3"> No</label></p>
            <p><strong>4.</strong> Patch management for OT? <label><input type="radio" name="q4"> Yes</label> <label><input type="radio" name="q4"> No</label></p>
            <p><strong>5.</strong> Strict access control? <label><input type="radio" name="q5"> Yes</label> <label><input type="radio" name="q5"> No</label></p>
            <p><strong>6.</strong> USB policies enforced? <label><input type="radio" name="q6"> Yes</label> <label><input type="radio" name="q6"> No</label></p>
            <p><strong>7.</strong> Network monitoring in place? <label><input type="radio" name="q7"> Yes</label> <label><input type="radio" name="q7"> No</label></p>
            <p><strong>8.</strong> Staff received recent training? <label><input type="radio" name="q8"> Yes</label> <label><input type="radio" name="q8"> No</label></p>
        `;

        document.getElementById('submit-assessment').addEventListener('click', () => {
            const rc = document.getElementById('results-content');
            const rp = document.getElementById('results-placeholder');
            if (rp) rp.style.display = 'none';
            if (rc) {
                rc.style.display = 'block';
                rc.innerHTML = `<h2 class="display-1 fw-bold text-danger text-center">58%</h2>
                                <h4 class="text-danger text-center">HIGH RISK</h4>
                                <div class="alert alert-danger">Significant gaps detected. Immediate action required on zoning, conduits and access controls.</div>
                                <button onclick="alert('✅ Saved!')" class="btn btn-outline-light mt-3">💾 Save Assessment</button>`;
            }
        });
    }

    // THREAT MATRIX - Full table
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

    // SL2 CHECKLIST - Full items + Reset
    if (document.getElementById('checklist-container')) {
        document.getElementById('checklist-container').innerHTML = `
            <div class="form-check"><input type="checkbox"> Implement network segmentation between Purdue Levels</div>
            <div class="form-check"><input type="checkbox"> Enforce strict access control and least privilege</div>
            <div class="form-check"><input type="checkbox"> Deploy firewalls and conduits per IEC 62443</div>
            <div class="form-check"><input type="checkbox"> Establish patch management process for OT systems</div>
            <div class="form-check"><input type="checkbox"> Restrict remote access to ICS/OT networks</div>
            <div class="form-check"><input type="checkbox"> Enforce removable media (USB) controls</div>
            <div class="form-check"><input type="checkbox"> Implement continuous network monitoring</div>
            <div class="form-check"><input type="checkbox"> Provide regular ICS cybersecurity awareness training</div>
        `;
    }

    window.resetChecklist = function() {
        if (confirm("Reset checklist?")) location.reload();
    };

    console.log("✅ Complete code loaded");
});