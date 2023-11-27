import express from "express";
import {createPost
    ,getFeedPosts
    ,getUserPosts
    ,likePost
    ,addComment
    ,deleteComment
    ,editPost
    ,deletePost} from "../Controllers/postController"
import { verifyToken } from "../Middleware/auth";

const router = express.Router();

/*POST */
router.post("/createPost/:userId",verifyToken , createPost);

/* READ */

router.get("/getUserPost/:id",verifyToken ,getUserPosts);
router.get("/getPost/", getFeedPosts);

/* UPDATE */
router.patch("/likePost/:id/", verifyToken, likePost);
router.post("/addComment/:id/",verifyToken, addComment)
router.patch("/deleteComment/:id/",verifyToken, deleteComment)
router.patch("/editPost/:id/",verifyToken, editPost)
router.delete("/deletePost/:id/",verifyToken, deletePost)
export default router;