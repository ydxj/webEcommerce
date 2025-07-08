import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import gsap from "gsap";
import BuyerMenu from "../layout/BuyerLayout";

function CartPage() {
  const cardRef = useRef(null);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    // TODO: Replace with actual cart fetch from backend
    setCartItems([
      {
        id: 1,
        product_id: 101,
        name: "Vitamin C Gummies",
        image_url: "https://i.imgur.com/lYjRplz.png",
        price: 19.99,
        quantity: 2,
      },
      {
        id: 2,
        product_id: 102,
        name: "Omega 3 Softgels",
        image_url: "https://i.imgur.com/BGrXJS4.png",
        price: 14.49,
        quantity: 1,
      },
    ]);
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    // TODO: Call backend to delete item
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
    <BuyerMenu />
    <Container className="my-5" ref={cardRef}>
      <h3 className="mb-4 fw-bold">My Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card className="mb-3 shadow-sm rounded-4" key={item.id}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col xs={9} md={4}>
                    <h6 className="mb-1">{item.name}</h6>
                    <div className="text-muted small">${item.price.toFixed(2)}</div>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                    />
                  </Col>
                  <Col xs={4} md={2}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Col>
                  <Col xs={2} md={1}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <Card className="mt-4 shadow-sm rounded-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h5 className="m-0 fw-bold">Total:</h5>
              <h5 className="m-0 text-primary">${totalPrice.toFixed(2)}</h5>
            </Card.Body>
          </Card>

          <div className="text-end mt-3">
            <Button variant="success" className="px-4">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
    </>
  );
}

export default CartPage;
