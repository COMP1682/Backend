import mongoose, { Document, Schema } from 'mongoose';

const ChatSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    fullName:String,
    roomId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("chat", ChatSchema);
export default chat;