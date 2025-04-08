import axios from 'axios';

const StatsLoader = async({ params }: any) => {
  const { value } = params;
  let nbaStatsUrl = `http://localhost:8000/nba-stats?stat=${value}`;
  const stats = await Promise.all([
    axios.get(nbaStatsUrl).then(response => response.data)
  ]);
  return stats;
}

export default StatsLoader;