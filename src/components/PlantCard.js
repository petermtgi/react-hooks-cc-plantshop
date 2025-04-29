import React from "react";

function PlantCard({ plant, toggleSoldOut }) {
  return (
    <div className={`plant-card ${plant.soldOut ? "sold-out" : ""}`}>
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button onClick={() => toggleSoldOut(plant.id)}>
        {plant.soldOut ? "Sold Out!" : "In Stock"}
      </button>
    </div>
  );
}

export default PlantCard;