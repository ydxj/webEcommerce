import { db } from "../database/db.js"; // or "../db.js" depending on your structure

// ✅ Get buyer details
export const getBuyerDetails = async (req, res) => {
  const buyerId = req.id;

  try {
    const [buyerRows] = await db.query("SELECT * FROM users WHERE id = ?", [buyerId]);

    if (buyerRows.length === 0) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    const { password, ...buyerDetails } = buyerRows[0];
    return res.status(200).json(buyerDetails);
  } catch (error) {
    console.error("Error fetching buyer details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Add to cart (based on carts & cart_items schema)
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const buyerId = req.id;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    // 1. Ensure buyer has a cart
    const [existingCartRows] = await db.query("SELECT id FROM carts WHERE buyer_id = ?", [buyerId]);

    let cartId;

    if (existingCartRows.length > 0) {
      cartId = existingCartRows[0].id;
    } else {
      const [cartInsertResult] = await db.query("INSERT INTO carts (buyer_id) VALUES (?)", [buyerId]);
      cartId = cartInsertResult.insertId;
    }

    // 2. Check if item already in cart
    const [existingItemRows] = await db.query(
      "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, productId]
    );

    if (existingItemRows.length > 0) {
      // Update quantity
      await db.query(
        "UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?",
        [quantity, cartId, productId]
      );
    } else {
      // Insert new item
      await db.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cartId, productId, quantity]
      );
    }

    return res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Get cart items
export const getCartItems = async (req, res) => {
    const buyerId = req.id;
    
    try {
        // Get the cart for the buyer
        const [cartRows] = await db.query("SELECT id FROM carts WHERE buyer_id = ?", [buyerId]);
    
        if (cartRows.length === 0) {
            return res.status(404).json({ message: "Cart not found" });
        }
    
        const cartId = cartRows[0].id;
    
        // Get items in the cart
        const [cartItems] = await db.query(
        `SELECT ci.id, p.name, p.price, ci.quantity 
         FROM cart_items ci 
         JOIN products p ON ci.product_id = p.id 
         WHERE ci.cart_id = ?`,
        [cartId]
        );
    
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
    const { itemId } = req.body; // itemId is the ID of the cart_item
    const buyerId = req.id;
    
    if (!itemId) {
        return res.status(400).json({ message: "Item ID is required" });
    }
    
    try {
        // Check if the item exists in the cart
        const [itemRows] = await db.query("SELECT * FROM cart_items WHERE id = ?", [itemId]);
    
        if (itemRows.length === 0) {
        return res.status(404).json({ message: "Item not found in cart" });
        }
    
        // Remove the item from the cart
        await db.query("DELETE FROM cart_items WHERE id = ?", [itemId]);
    
        return res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
// ✅ Checkout (create order)
export const checkout = async (req, res) => {
    const buyerId = req.id;
    
    try {
        // Get the cart for the buyer
        const [cartRows] = await db.query("SELECT id FROM carts WHERE buyer_id = ?", [buyerId]);
    
        if (cartRows.length === 0) {
        return res.status(404).json({ message: "Cart not found" });
        }
    
        const cartId = cartRows[0].id;
    
        // Get items in the cart
        const [cartItems] = await db.query(
        `SELECT ci.id, p.id AS product_id, p.price, ci.quantity 
         FROM cart_items ci 
         JOIN products p ON ci.product_id = p.id 
         WHERE ci.cart_id = ?`,
        [cartId]
        );
    
        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
    
        // Calculate total price
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
        // Create order
        const [orderInsertResult] = await db.query(
        "INSERT INTO orders (buyer_id, total_price) VALUES (?, ?)",
        [buyerId, totalPrice]
        );
        
        const orderId = orderInsertResult.insertId;
    
        // Insert order items
        for (const item of cartItems) {
        await db.query(
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
            [orderId, item.product_id, item.quantity, item.price]
        );
        }
    
        // Clear the cart
        await db.query("DELETE FROM cart_items WHERE cart_id = ?", [cartId]);
    
        return res.status(200).json({ message: "Order placed successfully", orderId });
    } catch (error) {
        console.error("Error during checkout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

