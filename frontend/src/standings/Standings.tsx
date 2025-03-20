import "./Standings.css"
import LeagueStandings from './LeagueStandings'
import EastStandings from './EastStandings'
import WestStandings from './WestStandings'
import { Tabs, Tab } from 'react-bootstrap';

const Standings = () => {

  return (
    <div className="container">
                <Tabs
                    defaultActiveKey="league"
                    id="standings-tab"
                    className="mb-3"
                >
                <Tab eventKey="league" title="League">
                    <LeagueStandings />
                </Tab>
                <Tab eventKey="east" title="East">
                   <EastStandings />
                </Tab>
                <Tab eventKey="west" title="West">
                   <WestStandings />
                </Tab>
                </Tabs>
            </div>
  )
}

export default Standings