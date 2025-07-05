import { db } from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    const {name, email, password } = req.body;
    const EmailCheck = db.query('select * from users where email = ?', [email]);
    if (EmailCheck.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        return res.status(201).json({ success : true,message: 'User registered successfully', userId: result.insertId });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user[0].id, admin: user[0].is_admin, seller: user[0].is_seller, buyer: user[0].is_buyer }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ auth: true, token });
}

