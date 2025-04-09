import React, { useState } from "react";
import "./Prediction.css"; // Make sure this line exists
import trophy from "./trophy.png"; // Ensure the image is imported

const Predictions: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="prediction-wrapper">
      <div className="button-container">
        {hovered && (
          <img
            src={trophy}
            className="hover-icon"
          />
        )}
        <button
          className="load-button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Load AI Model
        </button>
      </div>
    </div>
  );
};

export default Predictions;
