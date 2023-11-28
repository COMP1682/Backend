import { RequestHandler } from "express";
import User from "../Models/UserModel";
import ChatModel from '../Models/ChatModel';


  export const ShowMessagesChatService : RequestHandler = async (req, res,next) =>{
    try{
    const {roomId} = req.params;
    const userId1 = roomId.split("-")[0];
    const userId2 = roomId.split("-")[1]
    const roomId2 =  userId2.concat("-".concat(userId1));
    const messages = await ChatModel.find({roomId:{$regex:roomId,roomId2}}).sort('createdAt');

    return res.status(200).json(messages);
    }
    catch(err : any) {
        res.status(500).json({ message: err.messageRoom })
    }
  }

  export const SendMessageChatService : RequestHandler = async (req, res,next) => {
    try{
    const {userId} = req.params;
    const {content,friendId} = req.body;
    const user = await User.findById(userId);

    const roomId = userId.concat("-".concat(friendId));
    if (!user) {
      return res.status(404).json('User not exists');
    }

    const message = new ChatModel({
      userId,
      content,
      roomId,
    });

    await message.save();

    const msRoom = await ChatModel.find({roomId:roomId});

    return res.status(200).json(msRoom);
}
catch(err : any) {
    res.status(500).json({ message: err.message })
}
}