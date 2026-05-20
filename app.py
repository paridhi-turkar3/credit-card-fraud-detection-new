from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load ML model
model = pickle.load(open("model.pkl", "rb"))


# ---------------- HOME PAGE ----------------

@app.route("/")
def landing():
    return render_template("landing.html")


# ---------------- DASHBOARD PAGE ----------------

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


# ---------------- ANALYTICS PAGE ----------------

@app.route("/analytics")
def analytics():
    return render_template("analytics.html")


# ---------------- PREDICTION API ----------------

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json["features"]

        features = np.array([data])

        prediction = model.predict(features)

        probability = model.predict_proba(features)[0][1]

        risk_score = round(probability * 100, 2)

        result = (
            "Fraudulent Transaction 🚨"
            if prediction[0] == 1
            else "Safe Transaction ✅"
        )

        return jsonify({

            "prediction": result,

            "risk_score": risk_score

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        })


# ---------------- RUN APP ----------------

if __name__ == "__main__":
    app.run(debug=True)