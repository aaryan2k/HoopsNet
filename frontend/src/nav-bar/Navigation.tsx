import "./Navigation.css";
import { Link } from "react-router-dom";
import logo from './logo.png';
import { Navbar, Nav } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

const Navigation = () => {
    return (    
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>
          <Image src={logo} rounded width="30" height="30" className="d-inline-block align-top"/>
          HoopsNet
          </Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" defaultActiveKey="/home" as="ul">
              <Nav.Item as="li" >        
                <Nav.Link as={Link} to="/" className={"text-white"}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} eventKey="link-1" to="/standings" className={"text-white"}>Standings</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} eventKey="link-2" to="/stats" className={"text-white"}>Stats</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} eventKey="link-3" to="/prediction" className={"text-white"}>AI Prediction</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};



export default Navigation
