import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { login, register } from './controller/authController.js';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

dotenv.config();

app.use(express.json());

app.post('/api/auth/login', login);
app.post('/api/auth/register', register);


app.listen( process.env.PORT ,()=>{
    console.log(`Back-end running on https://localhost:${process.env.PORT}`)
});