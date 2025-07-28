import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function MyNavbar() {
    return (
     <>
      <Navbar data-bs-theme="dark" className="h-100">
        <Container>
          <Navbar.Brand as={NavLink} to="/" end>
            EasyTaskManager<span style={{ fontSize: "0.7rem", verticalAlign: "super" }}>™</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={({ isActive }) => isActive ? "text-white" : "text-secondary"}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/tasks" className={({ isActive }) => isActive ? "text-white" : "text-secondary"}>Tasks</Nav.Link>
            <Nav.Link as={NavLink} to="/new" className={({ isActive }) => isActive ? "text-white" : "text-secondary" }>New</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
    </>
    );
}

export default MyNavbar;
