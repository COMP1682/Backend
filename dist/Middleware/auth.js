"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied");
        }
        if (token.startsWith("Bearer ")) {
            const jwToken = token.slice(7, token.length).trimLeft();
        }
        const key = process.env.JWT_KEY || "881834456304";
        const verified = jsonwebtoken_1.default.verify(token, key);
        if (verified)
            next();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.verifyToken = verifyToken;
