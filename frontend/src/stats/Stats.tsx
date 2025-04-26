import "./Stats.css"
import Container from "react-bootstrap/Container";
import StatsSelect from "./StatsSelect";

const Stats = () => {

  return (
    <div>
        <div className="jumbotron jumbotron-results py-5">
                <Container className="container-fluid">
                    <h1 className="display-4 fw-bold text-white text-start">Stats</h1>
                </Container>
            </div>
            <h1 className="text-2xl font-bold">Select NBA Stat</h1>
            <StatsSelect />
    </div>
  )
}

export default Stats