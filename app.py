         
from flask import Flask, request, jsonify
import pickle
import numpy as np
app = Flask(__name__)

# Load pre-trained model for health prediction
with open('model/health_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def home():
    return "HealthSync API is running."

@app.route('/predict_health', methods=['POST'])
def predict_health():
    data = request.get_json()
    heart_rate = data['heart_rate']
    blood_pressure = data['blood_pressure']
    glucose_level = data['glucose_level']
    activity_level = data['activity_level']
    # Predict health risk based on data
    features = np.array([[heart_rate, blood_pressure, glucose_level, activity_level]])
    risk = model.predict(features)
    return jsonify({'health_risk': risk[0]})

@app.route('/health_tips', methods=['GET'])
def health_tips():
    # Placeholder for health tips
    tips = [
        "Keep your heart rate at a healthy level.",
        "Monitor your blood pressure regularly.",
        "Maintain a balanced diet to regulate glucose levels."
    ]
    return jsonify({'tips': tips})

 if __name__ == '__main__':
    app.run(debug=True)
