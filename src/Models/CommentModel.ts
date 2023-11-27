import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    Date: String,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;