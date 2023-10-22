import express from "express";
import {login} from "../Controllers/authController"

const router = express.Router();

/*POST */
router.post("/login/", login);

export default router;