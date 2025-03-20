import Image from "react-bootstrap/Image";

interface NBAStandings {
  index: number
  city: string;
  name: string;
  conference: string;
  clinchIndicator: string;
  record: string;
  winPct: string;
  home: string;
  road: string;
  lastTen: string;
}

const StandingsRow = ({nbaStandings}: {nbaStandings: NBAStandings}) => {
  const icon = `/icons/${nbaStandings.name}.png`;  
  return (
    <tr>
        <td>{nbaStandings.index}</td>
            <td>
                { <Image src={icon} width="45" height="45"/> }
            </td>
        <td>{nbaStandings.city + " " + nbaStandings.name}</td>
        <td>{nbaStandings.conference}</td>
        <td>{nbaStandings.clinchIndicator}</td>
        <td>{nbaStandings.record}</td>
        <td>{nbaStandings.winPct}</td>
        <td>{nbaStandings.home}</td>
        <td>{nbaStandings.road}</td>
        <td>{nbaStandings.lastTen}</td>
    </tr>
  )
}

export default StandingsRow