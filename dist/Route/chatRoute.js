"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../Controllers/chatController");
const auth_1 = require("../Middleware/auth");
const router = express_1.default.Router();
router.get('/:roomId', auth_1.verifyToken, chatController_1.ShowMessagesChatService);
router.post('/:userId', auth_1.verifyToken, chatController_1.SendMessageChatService);
exports.default = router;
