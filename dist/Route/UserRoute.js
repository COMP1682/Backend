"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const auth_1 = require("../Middleware/auth");
const router = express_1.default.Router();
/*POST */
router.post("/createUser/", userController_1.createUser);
/* READ */
router.get("/getUser/:id", auth_1.verifyToken, userController_1.getUserById);
router.get("/getUser/", auth_1.verifyToken, userController_1.getUser);
router.get("/getUserFriends/:id/", auth_1.verifyToken, userController_1.getUserFriends);
/* UPDATE */
router.patch("/updateUser/:id/", auth_1.verifyToken, userController_1.updateUser);
router.delete("/deleteUser/:id/", auth_1.verifyToken, userController_1.deleteUser);
router.patch("/addRemoveFriend/:id/:friendId/", auth_1.verifyToken, userController_1.addRemoveFriend);
exports.default = router;
