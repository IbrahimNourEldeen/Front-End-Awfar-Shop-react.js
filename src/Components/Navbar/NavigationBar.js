import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./nav.css";
import { useSelector } from "react-redux";
import Search from "../../Components/Search/Search";

const NavigationBar = ({ onSearch }) => {
  const { customer, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Navbar collapseOnSelect expand="lg" className="nav-bar rounded-bottom-2">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold brand">
          <img
            src="./logo.jpg"
            alt="Logo"
            className="icon rounded-circle"
          />
          Awfar Markit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-center">
            <Search onSearch={onSearch} />
          </div>
          <Nav className="ms-auto">
            <NavLink
              to={(!isAuthenticated && "/signup") || "/userAccount"}
              className="nav-link fw-bold d-flex align-items-center"
              activeClassName="active-link"
            >
              <i
                className="fa-solid fa-circle-user mainColor me-1"
                aria-hidden="true"
              ></i>
              {!isAuthenticated && "Account"}
              {customer?.fullName}
            </NavLink>
            <NavLink
              to="/cart"
              className="nav-link fw-bold d-flex align-items-center"
              activeClassName="active-link"
            >
              <i
                className="fa-solid fa-cart-flatbed fs-4 cart-link me-1"
                aria-hidden="true"
              ></i>
              Cart
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
