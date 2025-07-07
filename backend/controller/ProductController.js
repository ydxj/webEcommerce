import { db } from "../database/db.js";

export const getProducts = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products p inner join product_images pi on p.id = pi.product_id');
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};
export const getProductByIds = async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await db.query('SELECT * FROM products p inner join product_images pi on p.id = pi.product_id WHERE p.id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }
        res.status(200).json(product[0]);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

export const getProductByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const [products] = await db.query('SELECT * FROM products p inner join product_images pi on p.id = pi.product_id WHERE p.category = ?', [category]);
        if (products.length === 0) {
            return res.status(404).json({ message: 'Aucun produit trouvé dans cette catégorie.' });
        }
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products by category:', err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

export const getProductImages = async (req, res) => {
    const { id } = req.params;
    try {
        const [images] = await db.query('SELECT * FROM product_images WHERE product_id = ?', [id]);
        res.status(200).json(images);
    } catch (err) {
        console.error('Error fetching product images:', err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

export const deleteProductImage = async (req, res) => {
    const { imageId } = req.params;
    try {
        const [result] = await db.query('DELETE FROM product_images WHERE id = ?', [imageId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Image non trouvée.' });
        }
        res.status(200).json({ message: 'Image supprimée.' });
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'image:', err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const [categories] = await db.query('SELECT id,name FROM categories');
        if (categories.length === 0) {
            return res.status(404).json({ message: 'Aucune catégorie trouvée.' });
        }
        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
}