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
router.post("/createPost/",verifyToken , createPost);

/* READ */

router.get("/getUser/:id",verifyToken ,getUserPosts);
router.get("/getUser/", getFeedPosts);

/* UPDATE */
router.patch("/likePost/:id/", verifyToken, likePost);
router.patch("/addComment/:id/",verifyToken, addComment)
router.patch("/deleteComment/:id/",verifyToken, deleteComment)
router.patch("/editPost/:id/",verifyToken, editPost)
router.delete("/deletePost/:id/",verifyToken, deletePost)
export default router;