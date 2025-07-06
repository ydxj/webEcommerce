import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { login, register } from './controller/authController.js';
import { AjouterProduits, getProduitById, getProduits, ModifierProduits, SupprimerProduits } from './controller/sellerController.js';
import { isAuth, isSeller, isAdmin } from './middleware/userAuth.js';
import { 
    getAllUsers, 
    getUserById, 
    deleteUser, 
    updateUser, 
    deleteOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    getOrderItems
} from './controller/AdminController.js';
import { upload } from './uploads.js';


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

dotenv.config();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/api/auth/login', login);
app.post('/api/auth/register', register);

// Ajouter les lien de seller
app.get('/api/seller/produits', isAuth, isSeller, getProduits);
app.get('/api/seller/produits/:id', isAuth, isSeller, getProduitById);
app.post('/api/seller/produits', isAuth, isSeller,upload.array('images', 5),AjouterProduits);
app.put('/api/seller/produits/:id', isAuth, isSeller,upload.array('images', 5), ModifierProduits);
app.delete('/api/seller/produits/:id', isAuth, isSeller, SupprimerProduits);


/**
 * Admin Routes
 */

// Admin routes for managing users
app.get('/api/admin/users', isAuth, isAdmin, getAllUsers);
app.get('/api/admin/users/:id', isAuth, isAdmin, getUserById);
app.delete('/api/admin/users/:id', isAuth, isAdmin, deleteUser);
app.put('/api/admin/users/:id', isAuth, isAdmin, updateUser);
// Admin routes for managing orders 
app.get('/api/admin/orders', isAuth, isAdmin, getAllOrders);
app.get('/api/admin/orders/:id', isAuth, isAdmin, getOrderById);
app.delete('/api/admin/orders/:id', isAuth, isAdmin, deleteOrder);
app.put('/api/admin/orders/:id', isAuth, isAdmin, updateOrder);
app.get('/api/admin/orders/:id/items', isAuth, isAdmin, getOrderItems);
// Admin routes for managing products
app.get('/api/admin/products', isAuth, isAdmin, getAllProducts);
app.get('/api/admin/products/:id', isAuth, isAdmin, getProductById);
app.delete('/api/admin/products/:id', isAuth, isAdmin, deleteProduct);
app.put('/api/admin/products/:id', isAuth, isAdmin, updateProduct);



app.listen( process.env.PORT ,()=>{
    console.log(`Back-end running on https://localhost:${process.env.PORT}`)
});