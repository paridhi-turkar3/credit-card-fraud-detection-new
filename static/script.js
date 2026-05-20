let totalTransactions = 0;

let fraudCount = 0;

let safeCount = 0;

let totalRisk = 0;
function generateFeatures(){

    const amount =
    parseFloat(document.getElementById("amount").value);

    const hour =
    parseFloat(document.getElementById("hour").value);

    const merchant =
    document.getElementById("merchant").value;

    const device =
    document.getElementById("device").value;

    const frequency =
    document.getElementById("frequency").value;

    let features = new Array(31).fill(0);

    // TIME
    features[0] = hour * 100;

    // SAFE CONDITIONS
    if(amount < 500){

        features[1] = 1.2;
        features[2] = 0.5;
        features[3] = 0.8;
    }

    // HIGH AMOUNT
    if(amount > 5000){

        features[4] = -20;
        features[5] = 18;
        features[6] = -25;
        features[7] = 22;
    }

    // NIGHT TRANSACTION
    if(hour >= 0 && hour <= 5){

        features[8] = -15;
        features[9] = 14;
    }

    // UNUSUAL FREQUENCY
    if(frequency === "Unusual"){

        features[10] = -18;
        features[11] = 20;
        features[12] = -16;
    }

    // ATM DEVICE
    if(device === "ATM"){

        features[13] = -12;
        features[14] = 10;
    }

    // ELECTRONICS
    if(merchant === "Electronics"){

        features[15] = 25;
        features[16] = -20;
    }

    // SHOPPING SAFE
    if(merchant === "Shopping"){

        features[17] = 2;
        features[18] = 1;
    }

    // MOBILE SAFE
    if(device === "Mobile"){

        features[19] = 1;
        features[20] = 2;
    }

    // EXTRA AI FEATURES
    features[21] = amount / 1000;

    features[22] = hour / 24;

    features[23] =
    frequency === "Unusual" ? -5 : 3;

    features[24] =
    merchant === "Electronics" ? -8 : 4;

    features[25] =
    device === "ATM" ? -10 : 5;

    features[26] = Math.random();

    features[27] = Math.random() * 2;

    features[28] = Math.random() * -2;

    features[29] =
    amount > 3000 ? -12 : 6;

    // AMOUNT
    features[30] = amount;

    return features;
}



async function predictFraud(){

    const resultText =
    document.getElementById("result-text");

    const resultImage =
    document.getElementById("result-image");

    const riskBar =
    document.getElementById("risk-bar");

    const badge =
    document.getElementById("badge");

    // LOADING
    resultText.innerHTML = `

    <div class="loader"></div>

    <p>AI analyzing transaction...</p>

    `;

    resultImage.style.display = "none";

    const features = generateFeatures();

    try{

        const response = await fetch("/predict",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                features:features
            })

        });

        const data = await response.json();

        // UPDATE COUNTERS

totalTransactions++;

totalRisk += parseFloat(data.risk_score);

if(data.prediction.includes("Fraud")){

    fraudCount++;

    alert(
       "🚨 WARNING!\n\nSuspicious transaction detected."
    );
}

else{

    safeCount++;
}

document.getElementById("total-transactions")
.innerHTML = totalTransactions;

document.getElementById("safe-count")
.innerHTML = safeCount;

document.getElementById("fraud-count")
.innerHTML = fraudCount;

document.getElementById("risk-average")
.innerHTML =
(totalRisk / totalTransactions).toFixed(2) + "%";

        // SHOW IMAGE
        resultImage.style.display = "block";

        // FRAUD IMAGE
        if(data.prediction.includes("Fraud")){

            resultImage.src =
            "/static/images/fraud.png";
        }

        // SAFE IMAGE
        else{

            resultImage.src =
            "/static/images/safe.png";
        }

        // RESULT
        resultText.innerHTML = `

        <h2>${data.prediction}</h2>

        <p>
        AI Risk Score:
        ${data.risk_score}%
        </p>

        `;

        // RISK BAR
        riskBar.style.width =
        `${data.risk_score}%`;

        // HIGH RISK
        if(data.risk_score > 70){

            badge.innerHTML =
            "🔴 HIGH RISK";

            badge.style.background =
            "#ef4444";

            riskBar.style.background =
            "#ef4444";
        }

        // MEDIUM RISK
        else if(data.risk_score > 40){

            badge.innerHTML =
            "🟡 MEDIUM RISK";

            badge.style.background =
            "#facc15";

            riskBar.style.background =
            "#facc15";
        }

        // LOW RISK
        else{

            badge.innerHTML =
            "🟢 LOW RISK";

            badge.style.background =
            "#22c55e";

            riskBar.style.background =
            "#22c55e";
        }

        // HISTORY TABLE
        const historyBody =
        document.getElementById("history-body");

        historyBody.innerHTML += `

<tr>

<td>₹${document.getElementById("amount").value}</td>

<td>${document.getElementById("merchant").value}</td>

<td>${document.getElementById("device").value}</td>

<td>${data.prediction}</td>

<td>${data.risk_score}%</td>

</tr>
`;
    }

    catch(error){

        resultImage.style.display = "none";

        resultText.innerHTML = `

        <h2>Server Error ❌</h2>

        `;

        console.log(error);
    }
}



// SAFE DEMO
function loadSafeDemo(){

    document.getElementById("amount").value = 120;

    document.getElementById("hour").value = 14;

    document.getElementById("merchant").value =
    "Shopping";

    document.getElementById("device").value =
    "Mobile";

    document.getElementById("frequency").value =
    "Normal";
}



// FRAUD DEMO
function loadFraudDemo(){

    document.getElementById("amount").value = 15000;

    document.getElementById("hour").value = 2;

    document.getElementById("merchant").value =
    "Electronics";

    document.getElementById("device").value =
    "ATM";

    document.getElementById("frequency").value =
    "Unusual";
}

