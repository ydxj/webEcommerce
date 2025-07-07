import { useEffect, useState } from "react";
import { Navbar, Container, Form, FormControl, Button, Nav, Dropdown } from "react-bootstrap";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Redirect to a route like /category/:id
    navigate(`/category/${categoryId}`);
  };

  return (
    <Navbar
      expand="lg"
      className="px-4 sticky-top"
      style={{
        backgroundColor: "white",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container fluid>
        <Navbar.Brand className="fw-bold fs-4 text-dark" href="/">
          Zerhouni
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Form className="d-flex mx-3 flex-grow-1">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="primary" id="dropdown-categories">
                Categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Dropdown.Item
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>Loading...</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
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
