import { RequestHandler } from "express";

import Post from "../Models/PostModel";
import User from "../Models/UserModel";
import { time, timeStamp } from "console";

export const createPost: RequestHandler = async (req, res, next) => {
    try {
      const { userId, description, picturePath } = req.body;
      const user = await User.findById(userId);
      if(user == null)
      {
        return res.status(200).json({message: "User Not Found"});
      }
      const newPost = new Post({
        userId,
        firstName:user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user?.picture,
        picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err : any) {
      res.status(409).json({ message: err.message });
    }
  };

  export const getFeedPosts : RequestHandler = async (req, res, next) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (err : any) {
      res.status(404).json({ message: err.message });
    }
  };

  export const getUserPosts : RequestHandler = async (req, res,next) => {
    try {
      const { userId } = req.params;
      const post = await Post.find({ userId });
      res.status(200).json(post);
    } catch (err : any) {
      res.status(404).json({ message: err.message });
    }
  };

  export const editPost : RequestHandler = async (req, res,next) => {
    try {
      const { id } = req.params;
      const {data , userId} = req.body;
      const post = await Post.findByIdAndUpdate({_id:id,userId:userId} , data, { new: true });
      res.status(200).json(post);
    } catch (err : any) {
      res.status(404).json({ message: err.message });
    }
  };
  export const deletePost : RequestHandler = async (req, res,next) => {
    try {
      const { id } = req.params;
      const {data , userId} = req.body;
      const post = await Post.findByIdAndDelete({_id:id,userId:userId});
      res.status(200).json(post);
    } catch (err : any) {
      res.status(404).json({ message: err.message });
    }
  };

  export const likePost : RequestHandler = async (req, res,next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Post.findById(id);
      if(post == null)
      {
        return res.status(404).json({message : "post is not found"})
      }
      const isLiked = post.likes?.get(userId);
  
      if (isLiked) {
        post.likes?.delete(userId);
      } else {
        post.likes?.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post?.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err : any) {
      res.status(404).json({ message: err.message });
    }
  };

  export const addComment : RequestHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {userId, comment} = req.body;

        const post = await Post.findById(id);
        if(post == null)
        {
            return res.status(404).json({message : "post is not found"})
        }
        const updateComment = [userId,comment,Date.now.toString()]

        post.comments.push(updateComment);

        await post.save();
        res.status(200).json({message : "Comment is upload successfully"})
    } catch(err : any)
    {
        res.status(500).json({message: err.message});
    }
  }

  export const deleteComment: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {userId,timeComment} = req.body;
        const post = await Post.findById(id);
        if(post == null)
        {
            return res.status(404).json({message: "post is not found"})
        }
        post.comments = post.comments.filter((t) => t != timeComment && id != userId )

        await post.save();
        return res.status(200).json({ message: "user deleted successfully!" });
        }   catch (error: any) {
         return res.status(500).json({ message: error.message });
        }
  };