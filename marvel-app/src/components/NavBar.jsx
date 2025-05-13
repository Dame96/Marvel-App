// src/components/NavBar.jsx

import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3 mb-4">
            <Navbar.Brand href="/">Marvel Characters</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/characters">Characters</Nav.Link>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                        <NavDropdown.Item as={NavLink} to="/createyourown">Create Your Own</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;  