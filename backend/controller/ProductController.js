import { db } from "../database/db";

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
