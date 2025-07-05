import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export const isSeller = (req, res, next) => {
    // decode the token to check the role
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.role = decoded.is_seller; 
        req.id = decoded.id; 
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    if (!req.role) {
        return res.status(403).json({ message: "Access denied. Seller role required." });
    }
    next();
}

export const isAdmin = (req, res, next) => {
    // decode the token to check the role
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.role = decoded.is_admin; 
        req.id = decoded.id; 
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    if (!req.role) {
        return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    next();
}