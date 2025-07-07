import { useRef, useEffect } from "react";
import { Navbar, Container, Form, FormControl, Button, Nav } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import gsap from "gsap";

function Header() {
  const headerRef = useRef();

  /*useEffect(() => {
    const el = headerRef.current;
    if (el) {
      el.style.visibility = 'visible';
      gsap.from(el, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  }, []);*/

  return (
    <Navbar
      ref={headerRef}
      expand="lg"
      className="px-4 sticky-top"
      style={{
        backgroundColor: "white",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Container fluid>
        <Navbar.Brand className="fw-bold fs-4 text-dark" href="/">
          YOUR MARKET
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
