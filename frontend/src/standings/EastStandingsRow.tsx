import Image from "react-bootstrap/Image";

interface EastStandings {
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

const EastStandingsRow = ({eastStandings}: {eastStandings: EastStandings}) => {
  const icon = `/icons/${eastStandings.name}.png`;  
  return (
    <tr>
        <td>{eastStandings.rank}</td>
            <td>
                { <Image src={icon} width="45" height="45"/> }
            </td>
        <td>{eastStandings.city + " " + eastStandings.name}</td>
        <td>{eastStandings.clinchIndicator}</td>
        <td>{eastStandings.gamesBack}</td>
        <td>{eastStandings.record}</td>
        <td>{eastStandings.winPct}</td>
        <td>{eastStandings.home}</td>
        <td>{eastStandings.road}</td>
        <td>{eastStandings.lastTen}</td>
    </tr>
  )
}

export default EastStandingsRow