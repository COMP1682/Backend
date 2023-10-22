import express from "express";
import {createPost
    ,getFeedPosts
    ,getUserPosts
    ,likePost
    ,addComment
    ,deleteComment
    ,editPost
    ,deletePost} from "../Controllers/postController"

const router = express.Router();

/*POST */
router.post("/createPost/", createPost);

/* READ */

router.get("/getUser/:id", getUserPosts);
router.get("/getUser/", getFeedPosts);

/* UPDATE */
router.patch("/likePost/:id/", likePost);
router.patch("/addComment/:id/",addComment)
router.patch("/deleteComment/:id/",deleteComment)
router.patch("/editPost/:id/",editPost)
router.delete("/deletePost/:id/",deletePost)
export default router;