// ---------------- PIE CHART ----------------

const fraudCtx =
document.getElementById("fraudChart");

new Chart(fraudCtx, {

    type: "doughnut",

    data: {

        labels: [

            "Safe Transactions",

            "Fraud Transactions"

        ],

        datasets: [{

            data: [85, 15],

            backgroundColor: [

                "#22c55e",

                "#ef4444"
            ]
        }]
    }
});



// ---------------- BAR CHART ----------------

const riskCtx =
document.getElementById("riskChart");

new Chart(riskCtx, {

    type: "bar",

    data: {

        labels: [

            "Low Risk",

            "Medium Risk",

            "High Risk"

        ],

        datasets: [{

            label: "Transaction Count",

            data: [120, 40, 15],

            backgroundColor: [

                "#22c55e",

                "#facc15",

                "#ef4444"
            ]
        }]
    }
});



// ---------------- LINE CHART ----------------

const lineCtx =
document.getElementById("lineChart");

new Chart(lineCtx, {

    type: "line",

    data: {

        labels: [

            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"

        ],

        datasets: [{

            label: "Fraud Attempts",

            data: [2, 5, 3, 8, 4, 7, 6],

            borderColor: "#38bdf8",

            backgroundColor:
            "rgba(56,189,248,0.2)",

            tension: 0.4,

            fill: true
        }]
    }
});