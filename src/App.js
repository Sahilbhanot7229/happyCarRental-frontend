import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/cars`)
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Car Rental</h1>
      <ul>
        {cars.map(car => (
          <li key={car._id}>
            {car.make} {car.model} ({car.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
