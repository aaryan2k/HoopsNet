import "./Home.css"
import Carousel from 'react-bootstrap/Carousel';
import carousel1 from './mamba.jpg';
import carousel2 from './carousel2.jpg';
import carousel3 from './jordan.jpg';
import carousel4 from './carousel4.jpg';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Main = () => {
  return (
    <div className="home-page">
      <Container fluid className="p-0">
        <Carousel className="slide mb-5" >
          <Carousel.Item>
            <Row className="h-100 align-items-center m-0">
              {/* LEFT SIDE: centered text */}
              <Col md={6} className="d-flex flex-column justify-content-center ps-5">
                <h1 className="text-white">Welcome to HoopsNet</h1>
                <p className="text-light">Click below to view current NBA standings.</p>
                <NavLink to="/standings" className="btn btn-lg btn-warning mt-3">
                  See Standings
                </NavLink>
              </Col>

              {/* RIGHT SIDE: image */}
              <Col md={6} className="p-0">
                <img src={carousel1} alt="First slide" className="img-fluid" />
              </Col>
            </Row>
          </Carousel.Item>
            {/* <Carousel.Item className='carousel-item'>
                <img
                className="d-block w-100"
                src={carousel2}
                alt="Second slide"
                />
                <Carousel.Caption className="text-end">
                <h1>Standings</h1>
                <NavLink to="/standings" className={"btn btn-lg btn-warning"} role={"button"}>Season Standings</NavLink>
                </Carousel.Caption>
            </Carousel.Item> */}
            <Carousel.Item>
            <Row className="h-100 align-items-center m-0">
              {/* LEFT SIDE: centered text */}
              <Col md={6} className="d-flex flex-column justify-content-center ps-5">
                <h1 className="text-white">Welcome to HoopsNet</h1>
                <p className="text-light">Click below to view current player statistics.</p>
                <NavLink to="/stats" className="btn btn-lg btn-warning mt-3 myRedLink">
                  Player Stats
                </NavLink>
              </Col>

              {/* RIGHT SIDE: image */}
              <Col md={6} className="p-0">
                <img src={carousel3} alt="Second slide" className="" />
              </Col>
            </Row>
          </Carousel.Item>
            {/* <Carousel.Item className='carousel-item'>
                <img
                className="d-block w-100"
                src={carousel3}
                alt="Third slide"
                />
                <Carousel.Caption className="text-start">
                <h1>Stats</h1>
                <NavLink to="/stats" className={"btn btn-lg btn-success"} role={"button"}>Player Stats</NavLink>
                </Carousel.Caption>
            </Carousel.Item> */}
            <Carousel.Item className='carousel-item'>
                <img
                className="d-block w-100"
                src={carousel4}
                alt="Third slide"
                />
                <Carousel.Caption className="text-end">
                <h1>Prediction</h1>
                <NavLink to="/prediction" className={"btn btn-lg btn-primary"} role={"button"}>AI Prediction</NavLink>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
}

export default Main