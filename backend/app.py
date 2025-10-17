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

# Debug: List files in the directory
try:
    files_in_dir = os.listdir(BASE_DIR)
    logging.info(f"Files in BASE_DIR ({BASE_DIR}): {files_in_dir}")
    logging.info(f"Model file exists: {os.path.exists(model_path)}")
    if os.path.exists(model_path):
        file_size = os.path.getsize(model_path)
        logging.info(f"Model file size: {file_size} bytes ({file_size / (1024*1024):.2f} MB)")
except Exception as e:
    logging.error(f"Error checking directory: {e}")

try:
    logging.info(f"Attempting to load model from: {model_path}")
    model = joblib.load(model_path)
    logging.info("Fraud detection model loaded successfully")
except Exception as e:
    logging.error(f"Error loading model: {e}")
    logging.error(f"Current working directory: {os.getcwd()}")
    logging.error(f"__file__ location: {__file__}")
    model = None

@app.route('/')
def index():
    model_status = 'loaded' if model is not None else 'not loaded'
    return jsonify({
        'status': 'Flask API is running',
        'message': 'Use /predict endpoint for fraud detection',
        'model_status': model_status,
        'model_path': model_path,
        'base_dir': BASE_DIR
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint to verify model is loaded"""
    try:
        files_in_dir = os.listdir(BASE_DIR)
        return jsonify({
            'status': 'healthy' if model is not None else 'unhealthy',
            'model_loaded': model is not None,
            'model_path': model_path,
            'model_exists': os.path.exists(model_path),
            'base_dir': BASE_DIR,
            'files_in_directory': files_in_dir
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if model is loaded
        if model is None:
            logging.error("Model is not loaded. Cannot make predictions.")
            return jsonify({
                'error': 'Model not loaded. Please check server logs.',
                'details': 'The ML model file may be missing from the deployment.'
            }), 503

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