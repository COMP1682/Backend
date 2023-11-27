import { RequestHandler } from "express";

import Post from "../Models/PostModel";
import User from "../Models/UserModel";
import Comment from "../Models/CommentModel";

export const createPost: RequestHandler = async (req, res, next) => {
    try {
      const {userId} = req.params;
      const { description, picturePath } = JSON.parse(req.body);
      const user = await User.findById(userId);
      console.log("userId",userId);
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
        userPicturePath: user?.picturePath,
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
      const post = await Post.find().sort({_id:-1});
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
      const checkPost = await Post.findById({_id:id});
      if(userId != checkPost?.userId)
      {
        res.status(400).json({ message:"Wrong user"});
      }
      else
      {
      const comment = await Comment.deleteMany({postId:id});
      const post = await Post.findByIdAndDelete({_id:id,userId:userId});
      res.status(200).json(post);
      }
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
        const {userId, comment} = JSON.parse(req.body);
        const user = await User.findById(userId);
        const post = await Post.findById(id);
        const fullName  = user?.firstName.concat(" ".concat(user?.lastName));
        if(post == null)
        {
            return res.status(404).json({message : "post is not found"})
        }
        
        const newComment = new Comment({
          userId,
          userName:fullName,
          postId:id,
          comment:comment,
          Date:new Date().toLocaleDateString(),
        });
        await newComment.save();

        const updateComment = newComment;

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
        const checkComment = await Comment.findById(id);
        if(checkComment == null)
        {
            return res.status(404).json({message: "comment is not found"})
        }
        const post = await Post.findById(checkComment.postId);
        if(post == null)
        {
            return res.status(404).json({message: "post is not found"})
        }
        const comment = await Comment.findByIdAndDelete({_id:id});
        post.comments = post.comments.filter((id) => id != checkComment._id)

        await post.save();
        return res.status(200).json({ message: "user deleted successfully!" });
        }   catch (error: any) {
         return res.status(500).json({ message: error.message });
        }
  };