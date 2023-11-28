import { RequestHandler } from "express";
import User from "../Models/UserModel";
import ChatModel from '../Models/ChatModel';


  export const ShowMessagesChatService : RequestHandler = async (req, res,next) =>{
    const {roomId} = req.params;
    const messages = await ChatModel.find({roomId}).sort('createdAt');

    return res.status(200).json(messages);
  }

  export const SendMessageChatService : RequestHandler = async (req, res,next) => {
    try{
    const {userId} = req.params;
    const {content,friendId} = JSON.parse(req.body);
    const user = await User.findById(userId);

    const roomId = userId.concat("".concat(friendId));
    if (!user) {
      return res.status(404).json('User not exists');
    }

    const message = new ChatModel({
      userId,
      content,
      roomId,
    });

    await message.save();

    const messageRoom = await ChatModel.find({roomId:roomId});
    return res.status(200).json(message);
}
catch(err : any) {
    res.status(500).json({ message: err.message })
}
}