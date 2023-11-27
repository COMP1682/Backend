"use strict";
// import { RequestHandler } from "express";
// import User from "../Models/UserModel";
// import ChatModel from '../Models/ChatModel';
// import io from 'socket.io';
//   export const ShowMessagesChatService : RequestHandler = async (req, res,next) =>{
//     const messages = await ChatModel.find().sort('createdAt');
//     return res.status(200).json(messages);
//   }
//   export const SendMessageChatService : RequestHandler = async (req, res,next) => {
//     const {userId} = req.params;
//     const {content} = req.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json('User not exists');
//     }
//     const message = new ChatModel({
//       userId,
//       content,
//     });
//     await message.save();
//     io.emit('message', message);
//     return res.status(200).json(message);
//   }
