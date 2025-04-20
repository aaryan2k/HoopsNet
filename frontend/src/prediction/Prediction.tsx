import React, { useState } from "react";
import "./Prediction.css";
import trophy from "./trophy.png";
import west_bracket from "./west_bracket.png";
import east_bracket from "./east_bracket.png";
import thunder from "./Thunder.png";
import * as Papa from "papaparse";
import rawOddsCSV from "./odds/final_prob.csv?raw";


const Predictions: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [csvData, setCsvData] = useState<string[][]>([]);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowBackground(true);
      setButtonVisible(false);
    }, 2000);
  };

  const openModal = () => {
    const parsed = Papa.parse<string[]>(rawOddsCSV, { skipEmptyLines: true });
    console.log(parsed.data); 
    setCsvData(parsed.data);
    setShowModal(true);
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

      {showBackground && <img src={west_bracket} className="bracket-image-west" alt="Bracket" />}
      {showBackground && <img src={east_bracket} className="bracket-image-east" alt="Bracket" />}
      {showBackground && <img src={thunder} className="thunder-image" alt="Thunder" />}

      {showBackground && (
        <button className="breakdown-button" onClick={openModal}>
          See Full Probability Breakdown
        </button>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Full Probability Breakdown</h2>
            <div className="table-scroll">
              <table>
                <tbody>
                  {csvData.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Predictions;

