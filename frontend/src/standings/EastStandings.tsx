import { useLoaderData} from "react-router-dom";
import EastStandingsRow from "./EastStandingsRow";
import "./Standings.css";

const LeagueStandings = () => {

  const standings = useLoaderData();
  const nbaStandings = standings[0];
  const eastStandings = nbaStandings.filter((team: any) => team.conference === "East");

  if (eastStandings.length === 0) {
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
        <h4>East Standings:</h4>
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Rank</th>
              <th></th>
              <th>Team</th>
              <th>Clinched</th>
              <th>Games Back</th>
              <th>Record</th>
              <th>Win %</th>
              <th>Home</th>
              <th>Road</th>
              <th>Last 10</th>
            </tr>
          </thead>
          <tbody>
            {eastStandings.map((h: any) => (
                <EastStandingsRow key={h.rank} eastStandings={h} />
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Legend: -x - Clinched playoff berth, -o - Out of Playoffs, -e - Clinched Eastern Conference, -c - Clinched Central Division, -se - Clinched Southeast Division, -a - Clinched Atlantic Division
      </p>
    </div>
  )
}

export default LeagueStandings