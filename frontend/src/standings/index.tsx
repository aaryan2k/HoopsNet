// import Container from 'react-bootstrap/Container'
import { useLoaderData} from "react-router-dom";
import StandingsRow from "./StandingsRow";
import "./Standings.css";

const Main = () => {

  const standings = useLoaderData();
  console.log(standings);
  const nbaStandings = standings[0];
  console.log(nbaStandings);

  if (nbaStandings.length === 0) {
    return(
        <div>
            <p>No data found</p>
        </div>
    );
  }

  return (
    <div>
      <div>
        <h1> </h1>
      </div>
      <div className="mt-2 table-responsive">
        <h4>NBA Standings:</h4>
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Conference</th>
              <th>Clinched</th>
              <th>Record</th>
              <th>Win %</th>
              <th>Home</th>
              <th>Road</th>
              <th>Last 10</th>
            </tr>
          </thead>
          <tbody>
            {nbaStandings.map((h: any) => (
                <StandingsRow key={h.index} nbaStandings={h} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Main