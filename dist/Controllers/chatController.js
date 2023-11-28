"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageChatService = exports.ShowMessagesChatService = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const ChatModel_1 = __importDefault(require("../Models/ChatModel"));
const ShowMessagesChatService = async (req, res, next) => {
    const messages = await ChatModel_1.default.find().sort('createdAt');
    return res.status(200).json(messages);
};
exports.ShowMessagesChatService = ShowMessagesChatService;
const SendMessageChatService = async (req, res, next) => {
    const { userId } = req.params;
    const { content } = req.body;
    const user = await UserModel_1.default.findById(userId);
    if (!user) {
        return res.status(404).json('User not exists');
    }
    const message = new ChatModel_1.default({
        userId,
        content,
    });
    await message.save();
    return res.status(200).json(message);
};
exports.SendMessageChatService = SendMessageChatService;
