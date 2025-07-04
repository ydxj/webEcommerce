import { useEffect, useRef } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import gsap from "gsap";

function Header() {
  const headerRef = useRef();

  // useEffect(() => {
  //   const el = headerRef.current;
  //   console.log("Header mounted");
  //   if (el) {
  //     el.style.visibility = 'visible'; 
  //     gsap.from(el, {
  //       y: -80,
  //       opacity: 0,
  //       duration: 0.8,
  //       ease: "power3.out"
  //     });
  //   }
  // }, []);


  return (
    <Navbar ref={headerRef} expand="lg" bg="light" variant="light" className="shadow-sm py-3 sticky-top">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-primary fs-4">
          🛒 ShopNow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
          <Nav>
            <Nav.Link href="/cart" className="position-relative">
              <FaShoppingCart size={20} />
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                2
              </Badge>
            </Nav.Link>
            <Nav.Link href="/account">
              <FaUser size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
