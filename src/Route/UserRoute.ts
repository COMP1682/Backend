import express from "express";
import {createUser
    ,getUser
    ,getUserById
    ,updateUser
    ,deleteUser
    ,addRemoveFriend
    ,getUserFriends} from "../Controllers/userController"

const router = express.Router();

/*POST */
router.post("/createUser/", createUser);

/* READ */
router.get("/getUser/:id", getUserById);
router.get("/getUser/", getUser);
router.get("/getUserFriends/:id/", getUserFriends);

/* UPDATE */
router.patch("/updateUser/:id/", updateUser);
router.delete("/deleteUser/:id/",deleteUser)
router.patch("/addRemoveFriend/:id/:friendId/",addRemoveFriend)
export default router;