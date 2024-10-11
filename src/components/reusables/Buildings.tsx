import React, { useState } from 'react';
import RegisterBuilding from './RegisterBuilding';  // Import the RegisterBuilding form
import BuildingEmptyState from './EmptyStateBuildings';


const BuildingManager: React.FC = () => {
  const [hasBuildings, setHasBuildings] = useState(false);  // State to toggle between views

  // Function to show the RegisterBuilding form when "Add Building" is clicked
  const handleAddBuilding = () => {
    setHasBuildings(true);  // Set state to true to show the form
  };

  return (
    <div>
      {hasBuildings ? (
        <RegisterBuilding />  // Show the RegisterBuilding component when a building is added
      ) : (
        <BuildingEmptyState onAddBuilding={handleAddBuilding} />  // Show empty state initially
      )}
    </div>
  );
};

export default BuildingManager;
