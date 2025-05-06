import axios from 'axios';

const StatsLoader = async({ params }: any) => {
  const { stat } = params;
  let nbaStatsUrl = `http://localhost:8000/nba-stats?stat=${stat}`;
  const stats = await Promise.all([
    axios.get(nbaStatsUrl).then(response => response.data)
  ]);
  return stats;
}

export default StatsLoader;