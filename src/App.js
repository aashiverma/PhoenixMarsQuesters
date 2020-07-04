import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
       <Navbar collapseOnSelect expand="lg" className="color-navbar">
         
            <Navbar.Brand href="#home">PhoenixMarsQuesters</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" >
                 <NavDropdown title="Algorithms" id="collasible-nav-dropdown" className="algo" >
                  <NavDropdown.Item href="#action/3.2">A* Search</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Dijkstra's Algorithm</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Bidirectional Dijkstra's Algorithm</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Breadth First Search </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Bidirectional Breadth First Search </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#AddWalls" className="addw">Add Walls</Nav.Link>
                <Nav.Link href="#AddWater" className="addWa ">Add Water</Nav.Link>
                <Button variant="dark" className="vis">Visualize!</Button>{' '}
                <Button variant="dark" className="clpa">Clear Path</Button>{' '}
                
                <Nav.Link href="#clearWalls" className="clW">Clear Walls</Nav.Link>
                
                <NavDropdown title="Speed" id="collasible-nav-dropdown" className="speed">
                  <NavDropdown.Item href="#action/3.2">Slow</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Normal</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Fast</NavDropdown.Item>
                  </NavDropdown>  

              </Nav>
              <Nav >
              <Nav.Link href="#tutorial" className="butt1">Tutorial</Nav.Link>
                <Nav.Link href="#info" className="butt2 ">Info</Nav.Link>
               
                </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
