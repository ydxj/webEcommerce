import { db } from "../database/db";

export const getBuyerDetails = async (req, res) => {
    const buyerId = req.id;
    try {
        const [buyer] = await db.query('SELECT * FROM users WHERE id = ?', [buyerId]);
        if (buyer.length === 0) {
            return res.status(404).json({ message: 'Buyer not found' });
        }
        const { password, ...buyerDetails } = buyer[0];
        return res.status(200).json(buyerDetails);
    } catch (error) {
        console.error('Error fetching buyer details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const addToCart = async (req, res) => {
    const {productId, quantity} = req.body;
    const buyerId = req.id;
    try {
        const [existingCart] = await db.query('SELECT * FROM cart WHERE buyer_id = ? AND product_id = ?', [buyerId, productId]);
        if (existingCart.length > 0) {
            // Update existing cart item
            await db.query('UPDATE cart SET quantity = quantity + ? WHERE buyer_id = ? AND product_id = ?', [quantity, buyerId, productId]);
        } else {
            // Add new item to cart
            await db.query('INSERT INTO cart (buyer_id, product_id, quantity) VALUES (?, ?, ?)', [buyerId, productId, quantity]);
        }
        return res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
