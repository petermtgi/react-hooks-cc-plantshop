import React, { useState, useEffect } from 'react';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  // Fetch plants on initial render
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({
        ...formData,
        price: formData.price.toString()
      })
    })
      .then(res => res.json())
      .then(newPlant => {
        setPlants([...plants, newPlant]);
        setFormData({
          name: "",
          image: "",
          price: ""
        });
      });
  };

  // Toggle sold out status
  const toggleSoldOut = (id) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    ));
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Plantsy Admin</h1>
      
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type a name to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="search-input"
        />
      </div>
      
      {/* Plant Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
        />
        <button type="submit">Add Plant</button>
      </form>
      
      {/* Plant List */}
      <div className="plant-list">
        {filteredPlants.map(plant => (
          <div 
            key={plant.id} 
            className={`plant-card ${plant.soldOut ? "sold-out" : ""}`}
            data-testid="plant-item"
          >
            <img src={plant.image} alt={plant.name} />
            <h4>{plant.name}</h4>
            <p>Price: {plant.price}</p> {/* Removed $ sign */}
            <button onClick={() => toggleSoldOut(plant.id)}>
              {plant.soldOut ? "Out of Stock" : "In Stock"} {/* Changed text */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;