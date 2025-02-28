import "./Home.css"
import Carousel from 'react-bootstrap/Carousel';
import carousel1 from './carousel1.jpg';
import carousel2 from './carousel2.jpg';
import carousel3 from './carousel3.jpg';
import carousel4 from './carousel4.jpg';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

const Main = () => {
  return (
    <Container className="p-5">
      <Carousel className="slide mb-5" >
          <Carousel.Item className='carousel-item'>
              <img
              className="d-block w-100"
              src={carousel1}
              alt="First slide"
              />
              <Carousel.Caption>
              <h1>Welcome to HoopsNet</h1>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className='carousel-item'>
              <img
              className="d-block w-100"
              src={carousel2}
              alt="Second slide"
              />
              <Carousel.Caption className="text-end">
              <h1>Standings</h1>
              <NavLink to="/standings" className={"btn btn-lg btn-warning"} role={"button"}>Season Standings</NavLink>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className='carousel-item'>
              <img
              className="d-block w-100"
              src={carousel3}
              alt="Third slide"
              />
              <Carousel.Caption className="text-start">
              <h1>Stats</h1>
              <NavLink to="/stats" className={"btn btn-lg btn-success"} role={"button"}>Player Stats</NavLink>
              </Carousel.Caption>
          </Carousel.Item>
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
  );
}

export default Main