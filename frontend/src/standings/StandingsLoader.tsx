import axios from "axios";

const StandingsLoader = async () => {
  let nbaStandingsUrl = "http://localhost:8000/nba-standings";
  const standings = await Promise.all([
    axios.get(nbaStandingsUrl).then((response) => response.data),
  ]);
  return standings;
};

export default StandingsLoader;
