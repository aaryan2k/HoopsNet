import { useLoaderData} from "react-router-dom";
import WestStandingsRow from "./WestStandingsRow";
import "./Standings.css";

const LeagueStandings = () => {

  const standings = useLoaderData();
  const nbaStandings = standings[0];
  const westStandings = nbaStandings.filter((team: any) => team.conference === "West");

  if (westStandings.length === 0) {
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
        <h4>West Standings:</h4>
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
            {westStandings.map((h: any) => (
                <WestStandingsRow key={h.rank} westStandings={h} />
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Legend: -x - Clinched playoff berth, -o - Out of Playoffs, -c - Clinched Central Division, -nw - Clinched Northwest Division, 
        -sw - Clinched Southwest Division, -p - Clinched Pacific Division, -se - Clinched Southeast Division, -a - Clinched Atlantic Division
      </p>
    </div>
  )
}

export default LeagueStandings