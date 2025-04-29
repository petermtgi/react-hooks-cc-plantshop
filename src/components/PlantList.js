import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, toggleSoldOut }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <li key={plant.id} data-testid="plant-item">
          <PlantCard plant={plant} toggleSoldOut={toggleSoldOut} />
        </li>
      ))}
    </ul>
  );
}

export default PlantList;
