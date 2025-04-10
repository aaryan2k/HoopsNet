import React, { useState } from "react";
import "./Prediction.css";
import trophy from "./trophy.png";

const Predictions: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true); 

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowBackground(true);
      setButtonVisible(false);
    }, 2000);
  };

  return (
    <div className={`prediction-wrapper ${showBackground ? "with-background" : ""}`}>
      <div className="button-container">
        {hovered && buttonVisible && !loading && (
          <img src={trophy} className="hover-icon" />
        )}

        {buttonVisible && (
          <button
            className="load-button"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load AI Model"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Predictions;
