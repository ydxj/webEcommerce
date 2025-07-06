import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Save whole payload
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (!req.user?.admin) {
        return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    next();
};

export const isSeller = (req, res, next) => {
    if (!req.user?.seller) {
        return res.status(403).json({ message: "Access denied. Seller role required." });
    }
    next();
};