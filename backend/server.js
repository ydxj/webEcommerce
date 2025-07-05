import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { login, register } from './controller/authController.js';
import { AjouterProduits, getProduitById, getProduits, ModifierProduits, SupprimerProduits } from './controller/sellerController.js';
import { isAuth, isSeller, isAdmin } from './middleware/userAuth.js';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

dotenv.config();

app.use(express.json());

app.post('/api/auth/login', login);
app.post('/api/auth/register', register);

// Ajouter les lien de seller
app.get('/api/seller/produits', isAuth, isSeller, getProduits);
app.get('/api/seller/produits/:id', isAuth, isSeller, getProduitById);
app.post('/api/seller/produits', isAuth, isSeller, AjouterProduits);
app.put('/api/seller/produits/:id', isAuth, isSeller, ModifierProduits);
app.delete('/api/seller/produits/:id', isAuth, isSeller, SupprimerProduits);


// Ajouter les lien d'admin
app.get('/api/admin/products', isAuth, isAdmin, (req, res) => {
    // Logique pour récupérer les produits
    res.status(200).json({ message: 'Liste des produits' });
});
app.get('/api/admin/users', isAuth, isAdmin, (req, res) => {
    // Logique pour récupérer les utilisateurs
    res.status(200).json({ message: 'Liste des utilisateurs' });
});


app.listen( process.env.PORT ,()=>{
    console.log(`Back-end running on https://localhost:${process.env.PORT}`)
});