import Image from "react-bootstrap/Image";

interface WestStandings {
  rank: number
  city: string;
  name: string;
  clinchIndicator: string;
  gamesBack: string;
  record: string;
  winPct: string;
  home: string;
  road: string;
  lastTen: string;
}

const EastStandingsRow = ({westStandings}: {westStandings: WestStandings}) => {
  const icon = `/icons/${westStandings.name}.png`;  
  return (
    <tr>
        <td>{westStandings.rank}</td>
            <td>
                { <Image src={icon} width="45" height="45"/> }
            </td>
        <td>{westStandings.city + " " + westStandings.name}</td>
        <td>{westStandings.clinchIndicator}</td>
        <td>{westStandings.gamesBack}</td>
        <td>{westStandings.record}</td>
        <td>{westStandings.winPct}</td>
        <td>{westStandings.home}</td>
        <td>{westStandings.road}</td>
        <td>{westStandings.lastTen}</td>
    </tr>
  )
}

export default EastStandingsRow