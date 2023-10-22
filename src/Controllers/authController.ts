import { RequestHandler } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../Models/UserModel"

export const login : RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user == null) return res.status(400).json({ msg: "User does not exist. " });

        if(user.password != null)
        {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        }
        const key = process.env.JWT_TOKEN || "881834456304"
        const token = jwt.sign(user.firstName , key);
        delete user.password;
        res.status(200).json({ token, user });
      } catch (err : any) {
        res.status(500).json({ error: err.message });
      }
  };