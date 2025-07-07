import { useRef, useEffect, useState } from "react";
import { Navbar, Container, Form, FormControl, Button, Nav } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import gsap from "gsap";
import "./header.css"; 

function Header() {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const Categories = axios.get("http://localhost:5000/api/categories");
      setCategories(Categories.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);


  return (
    <Navbar
      expand="lg"
      className="px-4 sticky-top"
      style={{
        backgroundColor: "white",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Container fluid>
        <Navbar.Brand className="fw-bold fs-4 text-dark" href="/">
          Zerhouni
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Form className="d-flex mx-3 flex-grow-1">
            <Button variant="primary" className="me-2">Categories</Button>
            <FormControl type="search" placeholder="Vitamins" />
          </Form>
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link href="/orders" className="text-dark">Orders</Nav.Link>
            <Nav.Link href="/favorites" className="text-dark d-flex align-items-center gap-1">
              Favorites <FaHeart color="#ff4d4f" />
            </Nav.Link>
            <Nav.Link href="/cart" className="text-dark d-flex align-items-center gap-1">
              Cart <FaShoppingCart />
            </Nav.Link>
            <Button variant="outline-primary" href="/login">Sign In</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
