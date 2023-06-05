import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect, useContext } from "react";
//import context helper
import { UserContext } from "../util/contexts/UserContext";
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [loginUser, setLoginUser] = useState<{ userName: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");

    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      setLoginUser(parsedUser);
    }
  }, [setUser]);
  setUser(loginUser);

  const Logout = () => {
    localStorage.removeItem("loginUser");
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="navbar"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand href="#">
              {!user || user.userName !== "admin"
                ? "Applicant"
                : "Administrator"}
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">
                {!user || user.userName !== "admin"
                  ? "List of Jobs"
                  : "List of Applicants"}
              </Nav.Link>
            </Nav>
            <Navbar.Brand
              href="#"
              style={{
                marginRight: "40%",
              }}
            >
              <span className="admin-text">Empower Jobs</span>
            </Navbar.Brand>
            <Nav>
              <Nav.Link href="/register">Register</Nav.Link>

              {!loginUser ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <Nav.Link href="/login" onClick={Logout}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
