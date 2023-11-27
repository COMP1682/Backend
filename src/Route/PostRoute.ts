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
router.post("/createPost/:userId" , createPost);

/* READ */

router.get("/getUserPost/:id" ,getUserPosts);
router.get("/getPost/", getFeedPosts);

/* UPDATE */
router.patch("/likePost/:id/", likePost);
router.patch("/addComment/:id/", addComment)
router.patch("/deleteComment/:id/", deleteComment)
router.patch("/editPost/:id/", editPost)
router.delete("/deletePost/:id/", deletePost)
export default router;