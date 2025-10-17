from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import logging
import os

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

# Load model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "gradient_boost_model.pkl")

try:
    logging.info(f"Attempting to load model from: {model_path}")
    model = joblib.load(model_path)
    logging.info("Fraud detection model loaded successfully")
except Exception as e:
    logging.error(f"Error loading model: {e}")
    model = None

@app.route('/')
def index():
    return jsonify({'status': 'Flask API is running', 'message': 'Use /predict endpoint for fraud detection'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        logging.info(f"Received data: {data}")

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Extract features from the request
        # Features needed: step, amount, oldbalanceOrg, newbalanceOrig, oldbalanceDest, newbalanceDest,
        # type_CASH_IN, type_CASH_OUT, type_DEBIT, type_PAYMENT, type_TRANSFER
        
        features = [
            float(data.get('step', 0)),
            float(data.get('amount', 0)),
            float(data.get('oldbalanceOrg', 0)),
            float(data.get('newbalanceOrig', 0)),
            float(data.get('oldbalanceDest', 0)),
            float(data.get('newbalanceDest', 0)),
            int(data.get('type_CASH_IN', 0)),
            int(data.get('type_CASH_OUT', 0)),
            int(data.get('type_DEBIT', 0)),
            int(data.get('type_PAYMENT', 0)),
            int(data.get('type_TRANSFER', 0))
        ]

        # Convert to numpy array and reshape for prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features_array)[0]
        probability = model.predict_proba(features_array)[0]
        
        # Get fraud probability (class 1)
        fraud_probability = probability[1] * 100
        
        result = {
            'prediction': int(prediction),
            'fraud_probability': round(fraud_probability, 2),
            'status': 'HIGHLY FRAUDULENT' if prediction == 1 else 'LEGITIMATE'
        }

        logging.info(f"Prediction result: {result}")
        return jsonify(result)

    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
