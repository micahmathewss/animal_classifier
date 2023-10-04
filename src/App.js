import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    hair: false,
    feathers: false,
    eggs: false,
    milk: false,
    airborne: false,
    aquatic: false,
    predator: false,
    toothed: false,
    backbone: false,
  });
  const [prediction, setPrediction] = useState('');

  const handleInputChange = (event) => {
    const { id, checked } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://animal-class-classifier-35dd4f534778.herokuapp.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ features: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction);
      });
  };

  return (
    <div className="outer-container">
      <h1>Animal Class Predictor</h1>
      <p>Welcome to the Animal Class Predictor! This model has been developed by scraping data and features from thousands of animals to provide accurate predictions of an animal's class. The model boasts an impressive accuracy rate of over 90%, excelling at classifying common animal classes.</p>
      <p>My name is Micah, and I'm an undergraduate student who has always been passionate about the intersection of biology and technology. I'm excited to demonstrate how these fields can come together to create innovative products.</p>
      <div className="predict">
        <h2>Predict Animal Class</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Hair: <input type="checkbox" id="hair" checked={formData.hair} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Feathers: <input type="checkbox" id="feathers" checked={formData.feathers} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Eggs: <input type="checkbox" id="eggs" checked={formData.eggs} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Milk: <input type="checkbox" id="milk" checked={formData.milk} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Airborne: <input type="checkbox" id="airborne" checked={formData.airborne} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Aquatic: <input type="checkbox" id="aquatic" checked={formData.aquatic} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Predator: <input type="checkbox" id="predator" checked={formData.predator} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Toothed: <input type="checkbox" id="toothed" checked={formData.toothed} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Backbone: <input type="checkbox" id="backbone" checked={formData.backbone} onChange={handleInputChange} />
          </label>
          <br />
          <button type="submit">Predict</button>
        </form>
        <p>{prediction && `Prediction: ${prediction}`}</p>
      </div>
    </div>
  );
}

export default App;

