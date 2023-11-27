import express from "express";
import {createUser
    ,getUser
    ,getUserById
    ,updateUser
    ,deleteUser
    ,addRemoveFriend
    ,getUserFriends} from "../Controllers/userController"
import { verifyToken } from "../Middleware/auth";

const router = express.Router();

/*POST */
router.post("/createUser/", createUser);

/* READ */
router.get("/getUser/:id",verifyToken, getUserById);
router.get("/getUser/",verifyToken, getUser);
router.get("/getUserFriends/:id/", verifyToken ,getUserFriends);

/* UPDATE */
router.patch("/updateUser/:id/",verifyToken, updateUser);
router.delete("/deleteUser/:id/",verifyToken, deleteUser)
router.patch("/addRemoveFriend/:id/:friendId/",verifyToken, addRemoveFriend)
export default router;