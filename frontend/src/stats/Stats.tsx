import "./Stats.css"
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const navigate = useNavigate();
  const handleStatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stat = e.target.value;
    if (stat) navigate(`/stats/${stat}`);
  };

  return (
    <div>
        <div className="jumbotron jumbotron-results py-5">
                <Container className="container-fluid">
                    <h1 className="display-4 fw-bold text-white text-start">Results</h1>
                </Container>
            </div>
            <h1 className="text-2xl font-bold">Select NBA Stat</h1>
            <select onChange={handleStatChange} className="p-2 border rounded" defaultValue="">
                <option value="" disabled hidden>-- Select a stat --</option>
                <option value="PTS">Points</option>
                <option value="REB">Rebounds</option>
                <option value="AST">Assists</option>
                <option value="STL">Steals</option>
                <option value="BLK">Blocks</option>
                <option value="TOV">Turnovers</option>
                <option value="FG_PCT">Field Goal %</option>
                <option value="FG3_PCT">3 Point %</option>
                <option value="FT_PCT">Free Throw %</option>
            </select>
    </div>
  )
}

export default Stats