"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../Controllers/postController");
const auth_1 = require("../Middleware/auth");
const router = express_1.default.Router();
/*POST */
router.post("/createPost/:userId", auth_1.verifyToken, postController_1.createPost);
/* READ */
router.get("/getUserPost/:id", auth_1.verifyToken, postController_1.getUserPosts);
router.get("/getPost/", postController_1.getFeedPosts);
router.get("/getComments/:postId", auth_1.verifyToken, postController_1.getComments);
/* UPDATE */
router.patch("/likePost/:id/", auth_1.verifyToken, postController_1.likePost);
router.post("/addComment/:id/", auth_1.verifyToken, postController_1.addComment);
router.delete("/deleteComment/:deleteCommentId/", auth_1.verifyToken, postController_1.deleteComment);
router.patch("/editPost/:id/", auth_1.verifyToken, postController_1.editPost);
router.delete("/deletePost/:id/", auth_1.verifyToken, postController_1.deletePost);
exports.default = router;
