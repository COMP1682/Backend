"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageChatService = exports.ShowMessagesChatService = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const ChatModel_1 = __importDefault(require("../Models/ChatModel"));
const ShowMessagesChatService = async (req, res, next) => {
    try {
        const { roomId } = req.params;
        const userId1 = roomId.split("-")[0];
        const userId2 = roomId.split("-")[1];
        const roomId2 = userId2.concat("-".concat(userId1));
        const messages = await ChatModel_1.default.find({ $or: [{ roomId: roomId }, { roomId: roomId2 }] }).sort('createdAt');
        return res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json({ message: err.messageRoom });
    }
};
exports.ShowMessagesChatService = ShowMessagesChatService;
const SendMessageChatService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { content, friendId } = req.body;
        const user = await UserModel_1.default.findById(userId);
        const fullName = user === null || user === void 0 ? void 0 : user.firstName.concat(" ".concat(user.lastName));
        const roomId = userId.concat("-".concat(friendId));
        if (!user) {
            return res.status(404).json('User not exists');
        }
        const message = new ChatModel_1.default({
            userId,
            content,
            fullName,
            roomId,
        });
        await message.save();
        const msRoom = await ChatModel_1.default.find({ roomId: roomId });
        return res.status(200).json(msRoom);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.SendMessageChatService = SendMessageChatService;
