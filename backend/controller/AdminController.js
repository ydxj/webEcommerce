import { db } from '../database/db.js';

export const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found.' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, is_admin, is_seller, is_buyer } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE users SET name = ?, email = ?, is_admin = ?, is_seller = ?, is_buyer = ? WHERE id = ?',
            [name, email, is_admin, is_seller, is_buyer, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM produits');
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found.' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await db.query('SELECT * FROM produits WHERE id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM produits WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nom, description, prix, quantite, categorie } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE produits SET nom = ?, description = ?, prix = ?, quantite = ?, categorie = ? WHERE id = ?',
            [nom, description, prix, quantite, categorie, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const getAllOrders = async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM orders');
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found.' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const [order] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
        if (order.length === 0) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json(order[0]);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const getOrderItems = async (req, res) => {
    const { id } = req.params;
    try {
        const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [id]);
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this order.' });
        }
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching order items:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json({ message: 'Order updated successfully.' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
