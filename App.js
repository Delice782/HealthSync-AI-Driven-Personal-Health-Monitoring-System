    
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [healthRisk, setHealthRisk] = useState("");
  const [healthTips, setHealthTips] = useState([]);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/predict_health", {
      heart_rate: heartRate,
      blood_pressure: bloodPressure,
      glucose_level: glucoseLevel,
      activity_level: activityLevel,
    });
    setHealthRisk(response.data.health_risk);
  };

  const getHealthTips = async () => {
    const response = await axios.get("http://localhost:5000/health_tips");
    setHealthTips(response.data.tips);
  };

  return (
    <div>
      <h1>HealthSync: Personal Health Monitoring</h1>
      <input type="number" onChange={(e) => setHeartRate(e.target.value)} placeholder="Heart Rate" />
      <input type="number" onChange={(e) => setBloodPressure(e.target.value)} placeholder="Blood Pressure" />
      <input type="number" onChange={(e) => setGlucoseLevel(e.target.value)} placeholder="Glucose Level" />
      <input type="number" onChange={(e) => setActivityLevel(e.target.value)} placeholder="Activity Level" />
      
      <button onClick={handleSubmit}>Predict Health Risk</button>
      <p>Health Risk: {healthRisk}</p>

      <button onClick={getHealthTips}>Get Health Tips</button>
      <ul>
        {healthTips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
