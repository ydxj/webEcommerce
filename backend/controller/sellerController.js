import { db } from '../database/db.js'

export const getProduits = async (req, res) => {
    // seller id commes from middleware
    const sellerId = req.id; 
    try {
        // Fetch products from the database for the seller
        const [produits] = await db.query('SELECT * FROM produits WHERE seller_id = ?', [sellerId]);
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
        const [produit] = await db.query('SELECT * FROM produits WHERE id = ?', [id]);
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
    try {
        const { nom, description, prix, quantite, categorie } = req.body;
    
        // Validate input
        if (!nom || !description || !prix || !quantite || !categorie) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }
    
        // Insert product into the database
        const result = await db.query(
        'INSERT INTO produits (nom, description, prix, quantite, categorie) VALUES (?, ?, ?, ?, ?)',
        [nom, description, prix, quantite, categorie]
        );
    
        res.status(201).json({ message: 'Produit ajouté avec succès.', productId: result.insertId });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
}

export const ModifierProduits = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, prix, quantite, categorie } = req.body;

        // Validate input
        if (!nom || !description || !prix || !quantite || !categorie) {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }

        // Update product in the database
        const result = await db.query(
            'UPDATE produits SET nom = ?, description = ?, prix = ?, quantite = ?, categorie = ? WHERE id = ?',
            [nom, description, prix, quantite, categorie, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        res.status(200).json({ message: 'Produit modifié avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la modification du produit:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
}

export const SupprimerProduits = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete product from the database
        const result = await db.query('DELETE FROM produits WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        res.status(200).json({ message: 'Produit supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
}