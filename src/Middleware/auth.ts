import { RequestHandler } from "express";

import jwt from "jsonwebtoken";

export const verifyToken : RequestHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      const jwToken = token.slice(7, token.length).trimLeft();
    }
    const key = process.env.JWT_KEY || "881834456304"

    const verified = jwt.verify(token, key);

    if(verified)
    next();
  } catch (err : any) {
    res.status(500).json({ error: err.message });
  }
};