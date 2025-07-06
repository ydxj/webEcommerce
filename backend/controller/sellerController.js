import { db } from '../database/db.js'

export const getProduits = async (req, res) => {
    // seller id commes from middleware
    const sellerId = req.id; 
    try {
        // Fetch products from the database for the seller
        const [produits] = await db.query('SELECT * FROM products WHERE seller_id = ?', [sellerId]);
        if (produits.length === 0) {
            return res.status(404).json({ message: 'Aucun produit trouvé.' });
        }
        res.status(200).json(produits);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
}

export const getProduitById = async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch product by ID from the database
        const [produit] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        if (produit.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }
        res.status(200).json(produit[0]);
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
}

// Ajouter un produit
export const AjouterProduits = async (req, res) => {
    const { name, description, price, stock, category, seller_id } = req.body;
  const files = req.files;

  if (!name || !description || !price || !stock || !category || !seller_id) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    // 1. Insert product
    const [productResult] = await db.query(
      `INSERT INTO products (name, description, price, stock, category, seller_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, price, stock, category, seller_id]
    );

    const productId = productResult.insertId;

    // 2. Insert images if available
    if (files && files.length > 0) {
      const imagePromises = files.map(file => {
        const imageUrl = `/uploads/${file.filename}`;
        return db.query(
          'INSERT INTO product_images (product_id, image_url, alt_text) VALUES (?, ?, ?)',
          [productId, imageUrl, file.originalname]
        );
      });

      await Promise.all(imagePromises);
    }

    res.status(201).json({ message: 'Produit ajouté avec succès.', productId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const ModifierProduits = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ? WHERE id = ?',
            [name, description, price, stock, category, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        res.status(200).json({ message: 'Produit modifié avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la modification du produit:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

export const SupprimerProduits = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete product from the database
        const result = await db.query('DELETE FROM products WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        res.status(200).json({ message: 'Produit supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
}